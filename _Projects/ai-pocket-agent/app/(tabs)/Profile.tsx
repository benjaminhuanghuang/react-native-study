import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { useUser, useClerk } from "@clerk/clerk-expo";
import { Settings, Home, History, LogOut } from "lucide-react-native";
import colors from "../../shared/Colors";

type MenuItem = {
  id: number;
  icon: React.ComponentType<{ size: number; color: string }>;
  name: string;
  path: string;
};

const Profile = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useClerk();

  const menuList: MenuItem[] = [
    {
      id: 1,
      icon: Settings,
      name: "Create Agent",
      path: "/create-agent",
    },
    {
      id: 2,
      icon: Home,
      name: "Explore",
      path: "/tabs/explore",
    },
    {
      id: 3,
      icon: History,
      name: "My History",
      path: "/tabs/history",
    },
    {
      id: 4,
      icon: LogOut,
      name: "Logout",
      path: "logout",
    },
  ];

  useEffect(() => {
    // Assuming header setup is done in the main tab layout
  }, [navigation]);

  const onMenuClick = async (menuItem: MenuItem) => {
    if (menuItem.path === "logout") {
      await signOut();
      router.replace("/");
    } else {
      router.push(menuItem.path);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={{ uri: user?.imageUrl }} style={styles.profileImage} />
        <Text style={styles.userNameText}>{user?.fullName}</Text>
        <Text style={styles.userEmailText}>
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>

      <View style={styles.menuContainer}>
        {menuList.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => onMenuClick(item)}
          >
            <View style={styles.iconContainer}>
              <item.icon
                size={24}
                color={item.path === "logout" ? colors.RED : colors.BLACK}
              />
            </View>
            <Text
              style={[
                styles.menuNameText,
                item.path === "logout" && styles.logoutText,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  profileSection: {
    padding: 30,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.LIGHT_GRAY,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  userNameText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userEmailText: {
    fontSize: 16,
    color: colors.GRAY,
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.LIGHT_GRAY,
  },
  iconContainer: {
    width: 30,
    marginRight: 15,
    alignItems: "center",
  },
  menuNameText: {
    fontSize: 18,
  },
  logoutText: {
    color: colors.RED,
    fontWeight: "bold",
  },
});

export default Profile;
