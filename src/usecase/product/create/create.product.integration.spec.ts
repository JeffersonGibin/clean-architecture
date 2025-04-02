import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputCreateProductDto } from "./create.product.dto";

describe("Test find create use case", () => {
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

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);
    
    const input: InputCreateProductDto = {
      name: "Coca cola Zero",
      price: 8.77,
      type: "a",
    };

    const result = await usecase.execute(input);

    const output = {
      id: result.id,
      name: "Coca cola Zero",
      price: 8.77,
    };

    expect(result).toEqual(output);
  });
});
