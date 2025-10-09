/*
React Native requires static image imports — meaning the path must be known at build time (not dynamically computed).
*/
export const IMAGES = {
  car: require("./assets/car.jpg"),
} as const;

export type ImageKey = keyof typeof IMAGES;
