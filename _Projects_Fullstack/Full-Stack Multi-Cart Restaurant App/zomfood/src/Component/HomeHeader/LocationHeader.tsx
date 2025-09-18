import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSharedContext } from "../../Context/SharedContext";
import { headerStyle } from "../../StylesComponent/HeadersStyle";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Sizes } from "../../StylesComponent/Constant";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};
// globallScrlY globallScrollY
// @2:27 customText
// @3:09 locationHeader
// @1:53 ANimated tab
const LocationHeader = () => {
  const { globalScrollY } = useSharedContext();
  const animOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(globalScrollY.value, [0, 70], [1, 0]);
    return {
      opacity,
    };
  });
  return (
    <Animated.View style={[animOpacity]}>
      <SafeAreaView>
        <View style={headerStyle.locationContainer}>
          <View style={headerStyle.locationContainer}>
            <Ionicons name="location" size={Sizes.xxl} color={Colors.red} />
            <View>
              <TouchableOpacity style={headerStyle.userNameContainer}>
                <Text style={headerStyle.userName}>riyo</Text>
                <Ionicons
                  name="chevron-down"
                  color={Colors.black}
                  size={Sizes.s}
                />
              </TouchableOpacity>
              <Text style={headerStyle.userLocationText}>north Indian</Text>
            </View>  
          </View>
          <View style={headerStyle.menuBarContainer}>
            <TouchableOpacity style={headerStyle.userNameContainer}>
              <Ionicons name="menu" color={Colors.black} size={Sizes.xxl} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

export default LocationHeader;
