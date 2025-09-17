import { View, Text } from "react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated from "react-native-reanimated";
import { Colors } from "../../StylesComponent/Constant";
import TabCard from "./TabCard";

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const [dimension, setDimension] = React.useState({ width: 20, height: 100 });
  const indicatorWidth = dimension.width / state.routes.length;

  return (
    <Animated.View
      style={[
        {
          width: "100%",
          height: 70,
          position: "absolute",
          bottom: 0,
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.1,
          elevation: 5,
          shadowRadius: 11,
          shadowColor: "#000",
          zIndex: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
      ]}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            backgroundColor: Colors.red,
            top: 0,
            left: 22,
            height: 5,
            width: indicatorWidth * 2,
          },
        ]}
      />
      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        {state.routes.map((route, idx) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
          const isFocused = state.index === idx;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
          const onLongPress = () => {
            const event = navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TabCard
              key={route.name}
              onPress={onPress}
              onLongPress={onLongPress}
              isFocused={isFocused}
              routeName={route.name}
              label={label.toString()}
            />
          );
        })}
      </View>
    </Animated.View>
  );
};

export default CustomTabBar;
