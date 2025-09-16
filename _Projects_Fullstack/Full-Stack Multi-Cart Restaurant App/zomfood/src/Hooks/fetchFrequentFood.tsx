import { useEffect, useState } from "react";
import axios from "axios";
import { fetchFrequentFood, frequentFoodParams } from "../TypesCheck/HomeProp";

const url = "http://localhost:8084/frequent/getAllFrequentFoods";

const useFetchAllFrequentFood = () => {
  const [food, setFood] = useState<frequentFoodParams[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response: fetchFrequentFood = await axios.get(url);
      if (!response.data) {
        throw new Error("Network response was not ok");
      }
      setFood(response.data.result);
    } catch (error) {
      console.error("Error fetching frequent food:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { food };
};

export default useFetchAllFrequentFood;
