import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { setDoc, doc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import EmojiPicker from "rn-emoji-keyboard";
import colors from "../../shared/Colors";
import { firestoreDb } from "../../config/FirebaseConfig";

const CreateAgent = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { user } = useUser();

  const [emoji, setEmoji] = useState("🧑‍💻");
  const [agentName, setAgentName] = useState("");
  const [instruction, setInstruction] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Create Agent",
    });
  }, [navigation]);

  const handleEmojiSelect = (event: { emoji: string }) => {
    setEmoji(event.emoji);
    setIsOpen(false);
  };

  const createNewAgent = async () => {
    if (!agentName || !instruction || !emoji) {
      Alert.alert("Alert", "Please enter all details");
      return;
    }

    const agentID = Date.now().toString();

    try {
      const agentData = {
        emoji: emoji,
        agentName: agentName,
        agentID: agentID,
        prompt: instruction,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      };

      await setDoc(doc(firestoreDb, "agents", agentID), agentData);

      setAgentName("");
      setInstruction("");

      Alert.alert("Agent created successfully", "Your agent is ready!", [
        {
          text: "OK",
          style: "cancel",
        },
        {
          text: "Try Now",
          onPress: () =>
            router.push({
              pathname: "/chat",
              params: {
                agentName: agentName,
                initialText: "",
                agentPrompt: instruction,
                agentId: agentID,
                emoji: emoji,
              },
            }),
          style: "default",
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to create agent.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.emojiSection}>
        <TouchableOpacity
          onPress={() => setIsOpen(true)}
          style={styles.emojiButton}
        >
          <Text style={styles.emojiText}>{emoji}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text>Agent/Assistant Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Agent name"
          value={agentName}
          onChangeText={setAgentName}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Instruction</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Instruction for the agent"
          multiline={true}
          numberOfLines={4}
          value={instruction}
          onChangeText={setInstruction}
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity style={styles.createButton} onPress={createNewAgent}>
        <Text style={styles.createButtonText}>Create Agent</Text>
      </TouchableOpacity>

      <EmojiPicker
        onEmojiSelected={handleEmojiSelect}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.WHITE,
  },
  emojiSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emojiButton: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: colors.LIGHT_GRAY,
    backgroundColor: colors.WHITE,
  },
  emojiText: {
    fontSize: 30,
  },
  inputGroup: {
    paddingTop: 15,
    marginBottom: 10,
  },
  input: {
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    borderRadius: 10,
    padding: 15,
    marginTop: 5,
    fontSize: 18,
  },
  multilineInput: {
    height: 200,
    paddingTop: 15,
    paddingBottom: 15,
  },
  createButton: {
    backgroundColor: colors.PRIMARY,
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
  },
  createButtonText: {
    color: colors.WHITE,
    textAlign: "center",
    fontSize: 18,
  },
});

export default CreateAgent;
