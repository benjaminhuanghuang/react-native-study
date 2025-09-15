import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSharedContext } from "../../Context/SharedContext";
import { interpolate, useAnimatedStyle } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Sizes } from "../../StylesComponent/Constant";
import RollingText from "react-native-rolling-bar";
import { headerStyle } from "../../StylesComponent/HeadersStyle";

type Props = {};
const placeHolderText: string[] = [
  'Search "Pizza"',
  'Search "Veg Meal"',
  'Search "Burger"',
  'Search "Thai"',
];
const SearchBar = (props: Props) => {
  const { globallScrollY } = useSharedContext();
  const animTextCol = useAnimatedStyle(() => {
    const txtCol = interpolate(globallScrollY.value, [0, 70], [255, 0]);
    return {
      color: `rgb(${txtCol},${txtCol},${txtCol})`,
    };
  });
  // cont @3:35
  return (
    <View>
      <View style={[headerStyle.flexRowBetween, { padding: 10 }]}>
        <TouchableOpacity
          style={headerStyle.searchBarContainer}
          activeOpacity={0.75}
        >
          <Ionicons name="search" color={Colors.red} size={Sizes.xlg} />
          <RollingText
            defaultStyle={false}
            interval={3000}
            customStyle={headerStyle.rollingTextContainer}
          >
            {placeHolderText?.map((txt, id) => (
              <Text style={{ fontSize: 13, fontWeight: "bold" }} key={id}>
                {txt}
              </Text>
            ))}
          </RollingText>
          <Ionicons name="mic" size={Sizes.xlg} color={Colors.red} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;
