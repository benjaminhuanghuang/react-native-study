import { View, Text } from "react-native";
import React from "react";
import { starRatingStyle } from "../StylesComponent/CardStyle";
import { Ionicons } from "@expo/vector-icons";

type RatingColorParams = {
  rating: number;
};

const ratingColor = (ratingCol: number) => {
  if (ratingCol >= 4) {
    return "#1C653C";
  } else if (ratingCol >= 3) {
    return "#128145";
  } else if (ratingCol >= 2) {
    return "#1C653C";
  } else {
    return "#ccc";
  }
};

const StarRating = ({ rating }: RatingColorParams) => {
  const bgColor = ratingColor(rating);

  return (
    <View style={[starRatingStyle.container, { backgroundColor: bgColor }]}>
      <Text style={starRatingStyle.rating}>{rating || "--"}</Text>
      <Ionicons name="star" color="#fff" size={1} />
    </View>
  );
};

export default StarRating;
