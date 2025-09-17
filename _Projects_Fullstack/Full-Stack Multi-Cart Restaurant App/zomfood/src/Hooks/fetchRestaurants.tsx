import { use, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { fetchFrequentFood, frequentFoodParams } from "../TypesCheck/HomeProp";
import {
  fetchRestaurantParams,
  restaurantParams,
} from "../TypesCheck/TypeParams";
import useFetchAllFrequentFood from "./fetchFrequentFood";

const url = "http://localhost:8084/";

const useFetchRestaurant = () => {
  const [restaurant, setRestaurant] = useState<restaurantParams[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    const restaurantRoute = url + "restaurant/getAllRestaurants";

    setLoading(true);
    try {
      const response: fetchRestaurantParams = await axios.get(restaurantRoute);
      if (!response.data) {
        throw new Error("Network response was not ok");
      }
      setRestaurant(response.data.result);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return { restaurant };
};

export default useFetchRestaurant;
