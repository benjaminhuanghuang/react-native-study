import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ListRenderItem,
  Image,
  FlatList,
} from "react-native";
import { Product, getProducts } from "../../utils/api";
import { useState, useEffect } from "react";

const Two = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProduct = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const renderProductItem: ListRenderItem<Product> = ({ item }) => {
    return (
      <TouchableOpacity style={styles.productItem} testID="product-item">
        <Image style={styles.productImage} source={{ uri: item.image }}></Image>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Button title="List Produce" onPress={loadProduct}></Button>
      <FlatList
        role="list"
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  productItem: {},
  productName: {},
  productPrice: {},
});

export default Two;
