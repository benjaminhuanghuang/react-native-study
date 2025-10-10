import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { MessageCircle, ChevronRight } from "lucide-react-native";
import colors from "../../shared/Colors";
import { FIREBASE_DB } from "../../config/FirebaseConfig";
import {
  query,
  collection,
  where,
  getDocs,
  orderBy,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";

type Message = {
  role: string;
  content: string;
};

type History = {
  agentID: number;
  agentName: string;
  agentPrompt: string;
  emoji: string;
  imageBanner: string;
  messages: Message[];
  lastModified: number;
  docID: string;
};

const History = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { user } = useUser();

  const [historyList, setHistoryList] = useState<History[]>([]);
  const [loading, setLoading] = useState(false);

  const getChartHistory = useCallback(async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    setLoading(true);
    setHistoryList([]);

    try {
      const userEmail = user.primaryEmailAddress.emailAddress;
      const q = query(
        collection(FIREBASE_DB, "charts"),
        where("userEmail", "==", userEmail),
        orderBy("lastModified", "desc")
      );

      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

      const fetchedHistory: History[] = [];
      querySnapshot.forEach((doc) => {
        fetchedHistory.push({
          ...(doc.data() as Omit<History, "docID">),
          docID: doc.id,
        } as History);
      });

      setHistoryList(fetchedHistory);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getChartHistory();
    }
  }, [user, getChartHistory]);

  const onClickHandle = (item: History) => {
    const messagesListString = JSON.stringify(item.messages);

    router.push({
      pathname: "/chat",
      params: {
        agentName: item.agentName,
        agentPrompt: item.agentPrompt,
        agentId: item.agentID,
        emoji: item.emoji,
        imageBanner: item.imageBanner,
        messagesList: messagesListString,
        chartId: item.docID,
      },
    });
  };

  const renderItem = ({ item, index }: { item: History; index: number }) => {
    const lastMessage = item.messages[item.messages.length - 1];

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => onClickHandle(item)}
      >
        <View style={styles.iconContainer}>
          {item.emoji ? (
            <Text style={styles.emojiText}>{item.emoji}</Text>
          ) : (
            <MessageCircle size={24} color={colors.BLACK} />
          )}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{item.agentName}</Text>

          <Text style={styles.lastMessageText} numberOfLines={2}>
            {lastMessage.content}
          </Text>
        </View>

        <ChevronRight size={24} color={colors.GRAY} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.fullScreen}>
      <FlatList
        data={historyList}
        renderItem={renderItem}
        keyExtractor={(item) => item.docID.toString()}
        contentContainerStyle={styles.flatListContent}
        onRefresh={getChartHistory}
        refreshing={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  flatListContent: {
    padding: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: colors.LIGHT_GRAY,
    marginBottom: 10,
    borderRadius: 10,
  },
  iconContainer: {
    padding: 5,
    marginRight: 10,
  },
  emojiText: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  lastMessageText: {
    fontSize: 16,
    color: colors.GRAY,
    marginTop: 2,
  },
});

export default History;
