import { View, Text, FlatList } from "react-native";
import React from "react";
import { restaurantStyle } from "../../StylesComponent/CardStyle";
import { renderRestaurantParams } from "../../TypesCheck/TypeParams";
import RestaurantCard from "../RestaurantCard";

const RestaurantSection = () => {
  const renderRestaurants = ({ item }: renderRestaurantParams) => {
    return <RestaurantCard item={item} />;
  };

  return (
    <View>
      <Text style={restaurantStyle.restaurantAddress}>
        300 Restaurants delivering to you
      </Text>
      <Text style={restaurantStyle.restaurantAddress}>FEATURED</Text>
      <FlatList
        data={[]}
        renderItem={renderRestaurants}
        keyExtractor={(item) => item?._id?.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default RestaurantSection;
