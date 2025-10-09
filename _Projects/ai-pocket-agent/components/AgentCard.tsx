import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import colors from "@/shared/Colors";
import { useRouter } from "expo-router";

type Agent = {
  ID: number;
  name: string;
  description: string;
  image: string;
  initialText: string;
  prompt: string;
  feature: boolean;
};

type AgentCardProps = {
  agent: Agent;
};

const AgentCard = ({ agent }: AgentCardProps) => {
  const router = useRouter();

  // Function to handle card press and navigate to the chat UI
  const handlePress = () => {
    router.push({
      pathname: "/chat",
      params: {
        agentName: agent.name,
        initialText: agent.initialText,
        agentPrompt: agent.prompt,
        agentId: agent.ID,
        imageBanner: agent.image,
      },
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.contentArea}>
        <Text style={styles.nameText}>{agent.name}</Text>

        <Text style={styles.descriptionText} numberOfLines={2}>
          {agent.description}
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={agent.image ? { uri: agent.image } : undefined}
          style={styles.agentImage}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    padding: 15,
    borderRadius: 15,
    minHeight: 200,
    overflow: "hidden",
  },
  contentArea: {},
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 16,
    color: colors.GRAY,
    marginTop: 2,
  },
  imageContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    padding: 10,
  },
  agentImage: {
    width: 100,
    height: 100,
  },
});

export default AgentCard;
