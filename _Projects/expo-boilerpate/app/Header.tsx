import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

const Header = () => {
  const logo = require("../assets/logo.png");
  return (
    <View style={styles.header}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.menu}>Shop</Text>
      <Text style={styles.menu}>Contact</Text>
      <AntDesign style={styles.menu} name="search1" size={24} color="black" />
      <Feather
        style={styles.menu}
        name="shopping-cart"
        size={24}
        color="black"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d77948",
    height: 80,
    width: "100%",
    flexDirection: "row",
  },
  logo: {
    height: 30,
    width: 95,
    marginLeft: 10,
    marginRight: 5,
  },
  menu: {
    paddingLeft: 8,
    paddingRight: 8,
    color: "#FFFFFF",
    fontFamily: "WorkSans_Regular",
    fontWeight: "700",
  },
});

export default Header;
