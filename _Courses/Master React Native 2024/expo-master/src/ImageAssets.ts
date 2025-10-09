export const IMAGES = {
  car: require("./assets/car.jpg"),
} as const;

export type ImageKey = keyof typeof IMAGES;
