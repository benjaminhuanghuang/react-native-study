import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const GalacticCounter = () => {
  const [stars, setStars] = useState<number>(0);
  const addStar = () => setStars(stars + 1);
  const decreaseStar = () => setStars(stars - 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Galactic Counter</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Button title="Add Star" onPress={addStar} />
        <Button title="Decrease Star" onPress={decreaseStar} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    marginBottom: 20,
  },
});
export default GalacticCounter;
