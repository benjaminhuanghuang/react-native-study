import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  Platform,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

const wiindowDimensions = Dimensions.get("window");
const winHeight = wiindowDimensions.height;
const smallLogo = require("../assets/logo.png");

const Footer = () => {
  const logo = require("../assets/logo.png");
  return (
    <View style={styles.footer}>
      <Image source={smallLogo} style={styles.smallLogoStyle} />
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
  footer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d77948",
    height: 80,
    width: "100%",
    flexDirection: "row",
    ...Platform.select({
      ios: {
        paddingTop: 20,
        paddingBottom: 20,
        height: 80,
      },
    }),
  },
  smallLogoStyle: {
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

export default Footer;
