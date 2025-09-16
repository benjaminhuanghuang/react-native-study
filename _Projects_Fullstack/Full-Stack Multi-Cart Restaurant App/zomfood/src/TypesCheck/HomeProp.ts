export interface frequentFoodParams {
  _id: string;
  name: string;
  imageUrl: string[];
  onPress: () => void;
}

export interface fetchFrequentFood {
  data: {
    result: frequentFoodParams[];
  };
  loading: boolean;
  error: string | null;
  fetchData: () => void;
}

export interface foodCardParams {
  foodProps: frequentFoodParams;

  foodStyleProps: {
    width?: number;
    height?: number;
    borderRadius?: number;
    resizeMode?: "cover" | "contain" | "stretch";
  };
}

export interface renderFoodItemParams {
  item: frequentFoodParams;
}
