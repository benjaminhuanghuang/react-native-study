import { View, Text, SectionList, ViewToken } from "react-native";
import React from "react";
import FrequentFoodSection from "./FrequentFoodSection";
import RestaurantSection from "./RestaurantSection";
import { secStyl } from "../../StylesComponent/SectionListStyles";
import Animated from "react-native-reanimated";
import MenuFilterTab from "./MenuFilterTab";
import { filterTableList } from "../../Data/filtertablelist";

const sectionListData = [
  {
    title: "Frequent Food",
    data: [{}],
    renderItem: () => <FrequentFoodSection />,
  },
  {
    title: "Restaurant",
    data: [{}],
    renderItem: () => <RestaurantSection />,
  },
];

const SectionListContent = () => {
  const [isRestaurantSection, setIsRestaurantSection] = React.useState(false);
  const [nearEnd, setNearEnd] = React.useState(false);
  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 80,
  };
  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    const isRestaurantSection = viewableItems.some(
      (item) => item.section.title === "Restaurant" && item.isViewable
    );
    setIsRestaurantSection(isRestaurantSection);
  };

  return (
    <SectionList
      sections={sectionListData}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={secStyl.sectionListContainer}
      renderSectionHeader={({ section }) => {
        if (section.title !== "Restaurant") {
          return null;
        }
        return (
          <Animated.View
            style={[
              isRestaurantSection || nearEnd ? secStyl.stickyHeaderBg : null,
            ]}
          >
            <MenuFilterTab filterLabel="Sort" tabList={filterTableList} />
          </Animated.View>
        );
      }}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

export default SectionListContent;
