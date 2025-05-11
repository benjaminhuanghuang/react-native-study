import AsyncStore from "@react-native-async-storage/async-storage";

const getCartSum = (items: any[]) => {
  return items.reduce((acc, item) => acc + item.price, 0);
};

const storeCart = async (cart: any) => {
  try {
    const jsonValue = JSON.stringify(cart);
    await AsyncStore.setItem("cart", jsonValue);
  } catch (e) {
    console.log(e);
  }
};
const loadCart = async () => {
  try {
    const jsonValue = await AsyncStore.getItem("cart");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log(e);
  }
};
const clearCart = async () => {
  try {
    await AsyncStore.removeItem("cart");
  } catch (e) {
    console.log(e);
  }
};

export { getCartSum, storeCart, loadCart, clearCart };
