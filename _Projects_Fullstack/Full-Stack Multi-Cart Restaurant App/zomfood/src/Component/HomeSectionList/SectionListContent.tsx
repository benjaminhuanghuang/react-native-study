import {
  View,
  Text,
  SectionList,
  ViewToken,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import React, { useRef } from "react";
import FrequentFoodSection from "./FrequentFoodSection";
import RestaurantSection from "./RestaurantSection";
import { secStyl } from "../../StylesComponent/SectionListStyles";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import MenuFilterTab from "./MenuFilterTab";
import { filterTableList } from "../../Data/filterTableList";
import { useSharedContext } from "../../Context/SharedContext";
import GotoTopButton from "../HomeHeader/GotoTopButton";
import { gotoTopStyles } from "../../StylesComponent/CardStyle";

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
  const { scrollY, globalScrollY, scrollToTop } = useSharedContext();
  const sectionListRef = useRef<SectionList>(null);
  const prevScrollY = useRef(0);
  const scrollToTopPreviousValue = useRef(0);
  const [isRestaurantSection, setIsRestaurantSection] = React.useState(false);
  const [nearEnd, setNearEnd] = React.useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event?.nativeEvent?.contentOffset.y;
    const isScrollingDown = currentScrollY > prevScrollY.current;

    scrollY.value = isScrollingDown
      ? withTiming(100, { duration: 300 })
      : withTiming(0, { duration: 300 });
    prevScrollY.current = currentScrollY;
    globalScrollY.value = currentScrollY;

    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;

    setNearEnd(scrollOffset + layoutHeight >= contentHeight - 500);
  };

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

  const handleScrollToTop = () => {
    gotoTop();
    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        itemIndex: 0,
        sectionIndex: 0,
        viewPosition: 0,
      });
    }
  };

  const animGotoTop = useAnimatedStyle(() => {
    const isScrollingUp =
      globalScrollY.value < scrollToTopPreviousValue.current;

    const opacity = withTiming(
      isScrollingUp && (isRestaurantSection || nearEnd) ? 1 : 0,
      { duration: 300 }
    );

    const transY = withTiming(
      isScrollingUp && (isRestaurantSection || nearEnd) ? 1 : 10,
      { duration: 300 }
    );

    scrollToTopPreviousValue.current = globalScrollY.value;

    return { opacity, transform: [{ translateY: transY }] };
  });

  const gotoTop = async () => {
    scrollY.value = withTiming(0, { duration: 300 });
    sectionListRef.current?.scrollToLocation({
      animated: true,
      itemIndex: 0,
      sectionIndex: 0,
      viewPosition: 0,
    });
  };

  return (
    <>
      <Animated.View
        style={[animGotoTop, gotoTopStyles.gotoTopButtonContainer]}
      >
        <GotoTopButton onPress={handleScrollToTop} />
      </Animated.View>
      <SectionList
        ref={sectionListRef}
        sections={sectionListData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={secStyl.sectionListContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
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
        bounces={false}
        overScrollMode="always"
        nestedScrollEnabled={false}
        stickySectionHeadersEnabled={true}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </>
  );
};

export default SectionListContent;
