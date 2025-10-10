import React from "react";
import { FlatList, View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AgentCard from "./AgentCard";
import NonFeaturedAgentCard from "./NonFeaturedAgentCard";
import { agents } from "@/shared/AgentList";

type Agent = {
  ID: number;
  name: string;
  description: string;
  image: string;
  initialText: string;
  prompt: string;
  feature: boolean;
};

type AgentListProps = {
  isFeatured: boolean;
};

const AgentListComponent = ({ isFeatured }: AgentListProps) => {
  const router = useRouter();

  const handlePress = (item: Agent) => {
    router.push({
      pathname: "/chat",
      params: {
        agentName: item.name,
        initialText: item.initialText,
        agentPrompt: item.prompt,
        agentId: item.ID,
        imageBanner: item.image,
      },
    });
  };

  const renderAgentItem = ({ item, index }: { item: Agent; index: number }) => {
    if (item.feature === isFeatured) {
      return (
        <TouchableOpacity
          style={styles.cardWrapper}
          onPress={() => handlePress(item)}
          key={index}
        >
          {isFeatured ? (
            <AgentCard agent={item} />
          ) : (
            <NonFeaturedAgentCard agent={item} />
          )}
        </TouchableOpacity>
      );
    }
    return <View />;
  };

  return (
    <View>
      <FlatList
        data={agents as Agent[]}
        renderItem={renderAgentItem}
        keyExtractor={(item) => item.ID.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    padding: 5,
  },
});

export default AgentListComponent;
