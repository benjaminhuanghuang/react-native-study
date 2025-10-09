import { View } from "react-native";

//
import Card from "../components/Car";
function Index() {
  return (
    <View>
      <Card
        price={100000}
        imageName="car"
        imageHeight={300}
        imageWidth={300}
        carName="Lambo"
        carRatings={3.5}
        carDescription="Here is some random car description"
      />
    </View>
  );
}

export default Index;
