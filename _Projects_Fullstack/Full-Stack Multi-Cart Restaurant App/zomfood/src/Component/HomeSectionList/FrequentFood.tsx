import { View, Text } from "react-native";
import React from "react";
import {
  FlatList,
  ScrollView,
} from "react-native-reanimated/lib/typescript/Animated";
import { createNavigatorFactory } from "@react-navigation/native";
import FoodCard from "./FoodCard";
import useFetchAllFrequentFood from "../../Hooks/fetchFrequentFood";
import {
  frequentFoodParams,
  renderFoodItemParams,
} from "../../TypesCheck/HomeProp";

type Props = {};

const FrequentFood = (props: Props) => {
  const { food } = useFetchAllFrequentFood();

  const renderFoodItem = ({ item }: renderFoodItemParams) => {
    return (
      <FoodCard
        foodProps={{
          _id: item._id,
          name: item.name,
          imageUrl: item.imageUrl,
          onPress: item.onPress,
        }}
        foodStyleProps={{
          width: 60,
          height: 60,
          borderRadius: 99,
          resizeMode: "contain",
        }}
      />
    );
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <FlatList
        data={food}
        renderItem={renderFoodItem}
        numColumns={Math.ceil(food.length / 2)}
        key={Math.ceil(food.length / 2).toString()}
        pagingEnabled={false}
        keyExtractor={(item: frequentFoodParams) => item._id}
      />
    </ScrollView>
  );
};

export default FrequentFood;
