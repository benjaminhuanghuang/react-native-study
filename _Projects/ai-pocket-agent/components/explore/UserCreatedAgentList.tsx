import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { ChevronRight } from "lucide-react-native";
import colors from "../../shared/Colors";
import { FIREBASE_DB } from "../../config/FirebaseConfig";
import {
  query,
  collection,
  where,
  getDocs,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";

type Agent = {
  agentName: string;
  agentID: string;
  prompt: string;
  emoji: string;
  userEmail: string;
};

const UserCreatedAgentList = () => {
  const router = useRouter();
  const { user } = useUser();
  const [agentList, setAgentList] = useState<Agent[]>([]);

  const getUserAgents = useCallback(async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    setAgentList([]);

    try {
      const userEmail = user.primaryEmailAddress.emailAddress;
      const q = query(
        collection(FIREBASE_DB, "agents"),
        where("userEmail", "==", userEmail)
      );

      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

      const fetchedAgents: Agent[] = [];
      querySnapshot.forEach((doc) => {
        fetchedAgents.push({
          ...(doc.data() as Omit<Agent, "agentID">),
          agentID: doc.id,
        } as Agent);
      });

      setAgentList(fetchedAgents);
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getUserAgents();
    }
  }, [user, getUserAgents]);

  const handlePress = (item: Agent) => {
    router.push({
      pathname: "/chat",
      params: {
        agentName: item.agentName,
        initialText: "",
        agentPrompt: item.prompt,
        agentId: item.agentID,
        emoji: item.emoji,
      },
    });
  };

  const renderItem = ({ item }: { item: Agent }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handlePress(item)}
    >
      <View style={styles.agentInfo}>
        <Text style={styles.emojiText}>{item.emoji}</Text>
        <Text style={styles.nameText}>{item.agentName}</Text>
      </View>
      <ChevronRight size={24} color={colors.GRAY} />
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={agentList}
        renderItem={renderItem}
        keyExtractor={(item) => item.agentID}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderWidth: 0.5,
    borderColor: colors.GRAY,
    borderRadius: 15,
    marginTop: 10,
    backgroundColor: colors.WHITE,
  },
  agentInfo: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  emojiText: {
    fontSize: 25,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default UserCreatedAgentList;
