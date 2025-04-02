import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("Test find list use case", () => {
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
    const product2 = ProductFactory.create("b", "Coca cola Zero", 8.77);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const usecase = new ListProductUseCase(productRepository);

    const result = await usecase.execute({});

    const output = {
      products: [product1, product2],
    };

    expect(result.products).not.toBeUndefined();
    expect(result.products.length).toBe(2);
    expect(result.products[0].name).toEqual(product1.name);
    expect(result.products[0].price).toEqual(product1.price);
    expect(result.products[1].name).toEqual(product2.name);
    expect(result.products[1].price).toEqual(product2.price);
  });
});
