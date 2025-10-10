import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import colors from "@/shared/Colors";

// Reusing the Agent type defined for AgentCard
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

const NonFeaturedAgentCard = ({ agent }: AgentCardProps) => {
  const router = useRouter();

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
      {/* Image Section (now placed at the top, not absolute) */}
      {agent.image ? (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: agent.image }}
            style={styles.agentImage}
            resizeMode="content"
          />
        </View>
      ) : null}

      {/* Content Display Area */}
      <View style={styles.contentArea}>
        <Text style={styles.nameText}>{agent.name}</Text>

        <Text style={styles.descriptionText} numberOfLines={2}>
          {agent.description}
        </Text>
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
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageContainer: {
    padding: 15,
    marginTop: 10,
  },
  agentImage: {
    width: 70,
    height: 70,
  },
  contentArea: {
    padding: 15,
    alignItems: "center",
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  descriptionText: {
    fontSize: 16,
    color: colors.GRAY,
    marginTop: 2,
    textAlign: "center",
  },
});

export default NonFeaturedAgentCard;
