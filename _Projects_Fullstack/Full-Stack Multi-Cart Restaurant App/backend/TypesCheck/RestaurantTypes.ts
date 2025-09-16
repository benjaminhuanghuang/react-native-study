export interface coordsParams {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface restaurantProps {
  _id: string;
  name: string;
  description: string;
  imageUrl: [string];
  foodType: string;
  time: string;
  serviceCharge: number;
  rating: number;
  ratingCount: number;
  coords: coordsParams;
}
