interface Product {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const getProducts = async (): Promise<Product[]> => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data;
};

export { getProducts, Product };
