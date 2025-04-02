import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("Test find product use case", () => {
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

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);

   const product = ProductFactory.create("a", "Coca cola Zero", 8.77);
   
    await productRepository.create(product);

    const input = {
      id: product.id,
    };

    const output = {
      id: product.id,
      name: "Coca cola Zero",
      price: 8.77,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
