import { View, Image, Text, Pressable } from "react-native";
import React from "react";
import { coordsParams } from "../TypesCheck/TypeParams";
import { restCardStyle } from "../StylesComponent/CardStyle";
import StarRating from "./StarRating";

type RestaurantCardProps = {
  item: {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    foodType: string;
    time: string;
    serviceCharge: number;
    rating: number;
    ratingCount: number;
    coords: coordsParams;
  };
};

const RestaurantCard = ({ item }: RestaurantCardProps) => {
  return (
    <Pressable>
      <View>
        <Image source={{ uri: item.imageUrl }} style={restCardStyle.image} />
      </View>
      <View style={restCardStyle.details}>
        <View style={restCardStyle.textContainer}>
          <View style={restCardStyle.nameTimeContainer}>
            <Text style={restCardStyle.restName} numberOfLines={1}>
              {item?.name}
            </Text>
          </View>
          <StarRating />
        </View>
      </View>
    </Pressable>
  );
};

export default RestaurantCard;
