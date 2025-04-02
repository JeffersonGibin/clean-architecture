import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";
const product = ProductFactory.create(
  "a",
  "Product A",
  100
);

const input = {
  id: product.id,
  name: "Product A",
  price: 100,
  type: "a",
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve({
      id: product.id,
      name: input.name,
      price: input.price
    })),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual({
      id: product.id,
      name: input.name,
      price: input.price,
    });
  });

  it("should return not found", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    await expect(productUpdateUseCase.execute(input)).rejects.toThrow(
      "Product not found"
    );
  });
});
