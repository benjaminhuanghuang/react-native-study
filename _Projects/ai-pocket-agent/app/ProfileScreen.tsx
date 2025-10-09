import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { User, PlusCircle, Compass, Clock, LogOut } from "lucide-react-native";

const menuItems = [
  { title: "Create Agent", icon: <PlusCircle size={24} color="#4F8EF7" /> },
  { title: "Explore", icon: <Compass size={24} color="#4F8EF7" /> },
  { title: "My History", icon: <Clock size={24} color="#4F8EF7" /> },
  { title: "Logout", icon: <LogOut size={24} color="#FF4C4C" /> },
];

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/logo.png")} // Replace with your logo
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/75.jpg" }} // Replace with user's profile image
          style={styles.profileImage}
        />
        <Text style={styles.email}>user@example.com</Text>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            {item.icon}
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 40,
  },
  logo: {
    width: 120,
    height: 50,
    marginBottom: 30,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "#333",
  },
  menu: {
    width: "90%",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#333",
  },
});
