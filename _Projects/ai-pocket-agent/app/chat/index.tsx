import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image,
  Pressable,
  Platform,
  Alert,
  ToastAndroid,
} from "react-native";
import { useNavigation, useLocalSearchParams, useRouter } from "expo-router";
import { Camera, Send, X, Plus } from "lucide-react-native";
import colors from "../../shared/Colors";
import { useUser } from "@clerk/clerk-expo";
import { AIChartModel } from "../../shared/GlobalApi";

import { FIREBASE_DB, FIREBASE_STORAGE } from "../../config/FirebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import * as ImagePicker from "expo-image-picker";
import * as Clipboard from "expo-clipboard";

type Message = {
  role: string;
  content: string;
};

const ChatUI = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { user } = useUser();

  const {
    agentName,
    agentPrompt,
    agentId,
    initialText,
    messagesList: messagesListString,
    emoji,
    imageBanner,
  } = useLocalSearchParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [file, setFile] = useState<string | null>(null);
  const [docId, setDocId] = useState<string | null>(null);

  const messagesListJson: Message[] | null = messagesListString
    ? JSON.parse(messagesListString as string)
    : null;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: agentName as string,
      headerRight: () => (
        <View>
          <Plus size={24} color={colors.BLACK} style={styles.settingsIcon} />
        </View>
      ),
    });

    if (initialText) {
      setInput(initialText as string);
    }
  }, [navigation, agentName, initialText]);

  useEffect(() => {
    if (messagesListJson && messagesListJson.length > 0) {
      setMessages(messagesListJson);
      // Assuming chart ID retrieval logic is handled here if messages exist
    } else if (agentPrompt) {
      const systemMessage: Message = {
        role: "system",
        content: agentPrompt as string,
      };
      setMessages([systemMessage]);
    }
  }, [messagesListString, agentPrompt]);

  const saveMessagesAsync = useCallback(
    async (currentMessages: Message[]) => {
      if (currentMessages.length > 0 && docId) {
        const chartData = {
          userEmail: user?.primaryEmailAddress?.emailAddress,
          messages: currentMessages,
          docID: docId,
          agentName: agentName,
          agentPrompt: agentPrompt,
          agentId: agentId,
          emoji: emoji,
          imageBanner: imageBanner,
          lastModified: Date.now(),
        };

        await setDoc(doc(FIREBASE_DB, "charts", docId), chartData, {
          merge: true,
        });
      }
    },
    [user, docId, agentName, agentPrompt, agentId, emoji, imageBanner]
  );

  useEffect(() => {
    if (messages.length > 0) {
      saveMessagesAsync(messages);
    }
  }, [messages, saveMessagesAsync]);

  const copyToClipboard = async (message: string) => {
    await Clipboard.setStringAsync(message);
    if (Platform.OS === "android") {
      ToastAndroid.show("Copied to clipboard", ToastAndroid.BOTTOM);
    } else {
      Alert.alert("Copied to clipboard");
    }
  };

  const uploadImageToStorage = async (fileUri: string) => {
    const response = await fetch(fileUri);
    const blob = await response.blob();

    const uniqueFileName = `${Date.now()}.png`;
    const imageRef = ref(FIREBASE_STORAGE, `AI_pocket_agent/${uniqueFileName}`);

    await uploadBytes(imageRef, blob);
    const imageURL = await getDownloadURL(imageRef);
    return imageURL;
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.5,
    });

    if (!result.canceled) {
      setFile(result.assets.uri);
    }
  };

  const onSendMessage = async () => {
    if (!input.trim() && !file) {
      return;
    }

    let currentDocId = docId;
    if (!currentDocId) {
      currentDocId = Date.now().toString();
      setDocId(currentDocId);
    }

    const newUserMessage: Message = { role: "user", content: input };
    const loadingMessage: Message = { role: "assistant", content: "loading" };

    let updatedMessages = [...messages, newUserMessage];
    setMessages([...updatedMessages, loadingMessage]);

    let imageURL = "";
    if (file) {
      imageURL = await uploadImageToStorage(file);
      newUserMessage.content += ` [Image URL: ${imageURL}]`;
    }

    setInput("");
    setFile(null);

    try {
      const result = await AIChartModel([...messages, newUserMessage]);
      const assistantResponse = result.AIResponse;

      setMessages((prevMessages) => {
        const finalMessages = prevMessages.slice(0, prevMessages.length - 1);
        return [...finalMessages, assistantResponse];
      });
    } catch (e) {
      console.error("AI API Error:", e);
      Alert.alert("Error", "Failed to get response from AI.");
      setMessages((prevMessages) =>
        prevMessages.slice(0, prevMessages.length - 1)
      );
    }
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    if (item.role === "system") return <View />;

    const isUser = item.role === "user";

    return (
      <View
        key={index}
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.assistantMessage,
        ]}
      >
        {item.content === "loading" ? (
          <ActivityIndicator size="small" color={colors.BLACK} />
        ) : (
          <>
            <Text
              style={[
                styles.messageText,
                isUser ? styles.userText : styles.assistantText,
              ]}
            >
              {item.content}
            </Text>

            {!isUser && (
              <Pressable
                onPress={() => copyToClipboard(item.content)}
                style={styles.copyButton}
              >
                <Text style={{ color: colors.GRAY }}>Copy</Text>
              </Pressable>
            )}
          </>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.fullScreen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <FlatList
        data={messages.filter((msg) => msg.role !== "system")}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        style={styles.chatArea}
      />

      <View style={styles.inputBoxOuterContainer}>
        {file && (
          <View style={styles.previewContainer}>
            <Image
              source={{ uri: file }}
              style={styles.previewImage}
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => setFile(null)}
              style={styles.closeButton}
            >
              <X size={16} color={colors.WHITE} />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={pickImageAsync}>
            <Camera size={27} color={colors.GRAY} style={{ marginRight: 10 }} />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Type a message"
            placeholderTextColor={colors.GRAY}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={onSendMessage}
          />

          <TouchableOpacity style={styles.sendButton} onPress={onSendMessage}>
            <Send size={24} color={colors.WHITE} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  chatArea: {
    flex: 1,
    padding: 10,
  },
  headerTitleText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  settingsIcon: {
    marginRight: 10,
  },
  messageContainer: {
    maxWidth: "75%",
    marginVertical: 4,
    padding: 10,
    borderRadius: 12,
    marginHorizontal: 10,
    display: "flex",
    flexDirection: "column",
  },
  userMessage: {
    backgroundColor: colors.PRIMARY,
    alignSelf: "flex-end",
    borderBottomRightRadius: 2,
  },
  assistantMessage: {
    backgroundColor: colors.LIGHT_GRAY,
    alignSelf: "flex-start",
    borderBottomLeftRadius: 2,
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: colors.WHITE,
  },
  assistantText: {
    color: colors.BLACK,
  },
  copyButton: {
    marginTop: 3,
    alignSelf: "flex-end",
  },

  inputBoxOuterContainer: {
    padding: 10,
    backgroundColor: colors.WHITE,
    borderTopWidth: 1,
    borderTopColor: colors.LIGHT_GRAY,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.LIGHT_GRAY,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: colors.PRIMARY,
    padding: 10,
    borderRadius: 99,
    marginLeft: 5,
  },

  previewContainer: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "flex-start",
    paddingLeft: 5,
  },
  previewImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 10,
  },
  closeButton: {
    position: "absolute",
    top: -5,
    left: 45,
    backgroundColor: colors.BLACK,
    borderRadius: 10,
    padding: 3,
  },
});

export default ChatUI;
