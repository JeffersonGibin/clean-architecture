import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("Test find update use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list products", async () => {
    const productRepository = new ProductRepository();

    const product1 = ProductFactory.create("a", "Coca cola", 8.77);
    await productRepository.create(product1);

    const usecase = new UpdateProductUseCase(productRepository);

    const result = await usecase.execute({
      id: product1.id,
      name: "Coca cola Zero",
      price: 8.77,
      type: "a",
    });

    expect(result.id).toBe(product1.id);
    expect(result.name).toBe("Coca cola Zero");
    expect(result.price).toBe(8.77);

  });
});
