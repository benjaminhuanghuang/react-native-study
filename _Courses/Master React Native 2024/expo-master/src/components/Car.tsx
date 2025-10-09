import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { IMAGES, ImageKey } from "../ImageAssets";

type CarProps = {
  price?: number;
  imageName: ImageKey;
  imageWidth?: number;
  imageHeight?: number;
  carName?: string;
  carRatings?: number;
  carDescription?: string;
};

const Car = ({
  price,
  imageName,
  imageWidth,
  imageHeight,
  carName,
  carRatings,
  carDescription,
}: CarProps) => {
  return (
    <View>
      <Text style={styles.pill}>${price}</Text>

      <Image
        source={IMAGES[imageName]}
        style={{ width: imageWidth, height: imageHeight }}
      />
      <Text style={styles.heading}>{carName}</Text>
      <Text>{carDescription}</Text>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Learn More</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    backgroundColor: "black",
    color: "white",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
    width: 80,
    marginTop: 20,
    textAlign: "center",
  },

  heading: {
    fontSize: 20,
  },

  button: {
    backgroundColor: "black",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 20,
    textAlign: "center",
    width: 120,
  },

  buttonText: {
    color: "white",
    padding: 10,
  },
});

export default Car;
