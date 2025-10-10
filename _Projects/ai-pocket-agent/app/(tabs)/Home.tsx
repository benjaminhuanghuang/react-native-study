import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import colors from "@/shared/Colors";
import AgentListComponent from "../../components/home/AgentListComponent";
import CreateAgentBanner from "../../components/home/CreateAgentBanner";
import { Settings } from "lucide-react-native";

const Home = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: ({}) => (
        <Text style={styles.headerTitleText}>Pocket Agent</Text>
      ),
      headerTitleAlign: "center",
      headerLeft: ({}) => (
        <TouchableOpacity style={styles.proButtonContainer}>
          <Image
            source={require("../../assets/images/diamond.png")}
            style={styles.diamondIcon}
          />
          <Text style={styles.proButtonText}>PRO</Text>
        </TouchableOpacity>
      ),
      headerRight: ({}) => (
        <View>
          <Settings
            size={24}
            color={colors.black}
            style={styles.settingsIcon}
          />
        </View>
      ),
    });
  }, []);

  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListHeaderComponent={() => (
        <View style={styles.mainContentContainer}>
          <AgentListComponent isFeatured={true} />

          <CreateAgentBanner />

          <AgentListComponent isFeatured={false} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  headerTitleText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  proButtonContainer: {
    marginLeft: 15,
    display: "flex",
    flexDirection: "row",
    gap: 6,
    backgroundColor: colors.PRIMARY,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignItems: "center",
  },
  diamondIcon: {
    width: 20,
    height: 20,
  },
  proButtonText: {
    color: colors.WHITE,
    fontWeight: "bold",
  },
  settingsIcon: {
    marginRight: 10,
  },
  mainContentContainer: {
    padding: 15,
  },
});

export default Home;
