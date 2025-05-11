import { getCartSum } from "../../utils/cart";
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe("Cart", () => {
  test("getCartSum", () => {
    const items = [
      { id: 1, name: "Item 1", price: 10 },
      { id: 2, name: "Item 2", price: 20 },
      { id: 3, name: "Item 3", price: 30 },
    ];
    const sum = getCartSum(items);
    expect(sum).toBe(60);
  });
});
