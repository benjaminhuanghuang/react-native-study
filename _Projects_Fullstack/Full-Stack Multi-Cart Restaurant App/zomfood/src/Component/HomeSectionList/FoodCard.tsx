import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { cardStyle } from "../../StylesComponent/CardStyle";
import { foodCardParams } from "../../TypesCheck/HomeProp";

const FoodCard = ({ foodProps, foodStyleProps }: foodCardParams) => {
  return (
    <View>
      <TouchableOpacity
        style={cardStyle.categoryContentContainer}
        key={foodProps._id}
        onPress={foodProps.onPress}
      >
        {foodProps?.imageUrl !== undefined && (
          <View style={cardStyle.imageContainer}>
            <Image
              source={{ uri: foodProps?.imageUrl[0] }}
              style={
                sty(
                  foodStyleProps.width,
                  foodStyleProps.height,
                  foodStyleProps.borderRadius
                ).imgStyleProps
              }
              resizeMode={foodStyleProps.resizeMode || "cover"}
            />
            <Text numberOfLines={2} style={cardStyle.catName}>
              {foodProps.name}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default FoodCard;
const sty = (width?: number, height?: number, radius?: number) => ({
  imgStyleProps: {
    width,
    height,
    borderRadius: radius,
  },
});
