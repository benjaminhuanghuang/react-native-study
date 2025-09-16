import { View, Text } from "react-native";
import React from "react";
import {
  FlatList,
  ScrollView,
} from "react-native-reanimated/lib/typescript/Animated";
import { createNavigatorFactory } from "@react-navigation/native";
import FoodCard from "./FoodCard";

type Props = {};

const FrequentFood = (props: Props) => {
  const renderFoodItem = () => {
    return <FoodCard />;
  };
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <FlatList
        data={createNavigatorFactory(FrequentFood)}
        renderItem={renderFoodItem}
      />
    </ScrollView>
  );   
};

export default FrequentFood;
