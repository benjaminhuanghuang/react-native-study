import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "expo-router";
import colors from "../../shared/Colors";
import CreateAgentBanner from "../../components/home/CreateAgentBanner";
import AgentListComponent from "../../components/home/AgentListComponent";
import UserCreatedAgentList from "../../components/explore/UserCreatedAgentList";

const Explore = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // This tab screen does not explicitly set options in the provided source,
    // but typically a tab screen uses header features from the root tab layout.
    // Assuming minimal setup here based on structure.
  }, []);

  return (
    <View style={styles.container}>
      {/* Option to create a new agent */}
      <CreateAgentBanner />

      {/* User created agents list */}
      <View style={styles.myAgentSection}>
        <Text style={styles.myAgentTitle}>My Agent/Assistant</Text>
        <UserCreatedAgentList />
      </View>

      {/* Featured Agents List */}
      <Text style={styles.featuredAgentTitle}>Featured Agent</Text>
      <AgentListComponent isFeatured={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.WHITE,
  },
  myAgentSection: {
    marginTop: 10,
    marginBottom: 10,
  },
  myAgentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  featuredAgentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Explore;
