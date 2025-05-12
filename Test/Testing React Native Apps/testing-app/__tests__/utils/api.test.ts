import { getProducts } from "../../utils/api";

describe("API", () => {
  test("get 20 items", async () => {
    const products = await getProducts();

    expect(products).toHaveLength(20);
    expect(products).toBeTruthy();
  });

  test("Reject the promise", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.reject("Api Error"),
      })
    ) as jest.Mock;

    await expect(getProducts()).rejects.toEqual("Api Error");
  });

  test("Calls the right endpoint", async () => {
    const fetchMock = global.fetch as jest.MockedFunction<typeof global.fetch>;

    fetchMock.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue([]),
    });

    await getProducts();
    expect(fetchMock).toHaveBeenCalledWith("https://fakestoreapi.com/products");
  });

  test("Return correct data", async () => {
    const fakeData = [
      {
        id: 1,
        title: "Product 1",
        price: 10,
      },
    ];
    global.fetch = jest.fn().mockImplementationOnce(() =>
      //   Promise.resolve({
      //     json: () => Promise.resolve(fakeData),
      //   })) as jest.Mock;

      {
        return new Promise((resolve, reject) => {
          resolve({
            json: () => Promise.resolve(fakeData),
          });
        });
      }
    );
    const products = await getProducts();
    expect(products).toEqual(fakeData);
  });
});
