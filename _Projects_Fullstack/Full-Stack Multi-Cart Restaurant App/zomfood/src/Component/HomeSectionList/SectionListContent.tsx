import { View, Text, SectionList } from "react-native";
import React from "react";
import FrequentFoodSection from "./FrequentFoodSection";
import RestaurantSection from "./RestaurantSection";

const sectionListData = [
  {
    title: "Popular Near You",
    data: [{}],
    renderItem: () => <FrequentFoodSection />,
  },
  {
    title: "Recommended",
    data: [{}],
    renderItem: () => <RestaurantSection />,
  },
];

const SectionListContent = () => {
  return (
    <SectionList
      sections={sectionListData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => item.renderItem()}
    />
  );
};

export default SectionListContent;
