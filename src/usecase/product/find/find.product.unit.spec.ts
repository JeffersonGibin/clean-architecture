import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Computing", 2000);
product.changeName('Computing VI');

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find product use case", () => {
  it("should find a product", async () => {
    const prdocutRepository = MockRepository();
    const usecase = new FindProductUseCase(prdocutRepository);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "Computing VI",
      price: 2000,
    };

    const result = await usecase.execute(input);
    console.log(result)

    expect(result).toEqual(output);
  });

  it("should not find a product", async () => {
    const prdocutRepository = MockRepository();
    prdocutRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const usecase = new FindProductUseCase(prdocutRepository);

    const input = {
      id: "123",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
