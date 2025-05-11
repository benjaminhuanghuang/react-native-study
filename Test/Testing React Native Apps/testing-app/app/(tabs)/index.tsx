import { useState } from "react";
import { StyleSheet, Image, Text, TextInput, View } from "react-native";
import GalacticCounter from "../../components/GalacticCounter";

export default function TabOneScreen() {
  const [search, setSearch] = useState<string>("");

  return (
    <View style={styles.container} accessible>
      <Image
        source={{
          uri: "https://galaxies.dev/img/logos/logo--blue.png",
        }}
        style={{ width: 200, height: 100 }}
        role="img"
        accessibilityLabel="logo"
        accessible
      />

      <Text style={styles.title}>Feed</Text>
      <View style={styles.separator} testID="separator" />
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 40,
        }}
      >
        <TextInput
          placeholder="Search"
          value={search}
          onChangeText={(text) => setSearch(text)}
          style={{
            padding: 10,
            backgroundColor: "#fff",
            flex: 1,
          }}
        />
      </View>
      {search !== "" && (
        <Text style={{ fontSize: 16, marginTop: 20 }}>Search for {search}</Text>
      )}
      <GalacticCounter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  separator: {
    marginVertical: 30,
    height: 2,
    width: "80%",
    backgroundColor: "#000",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
