import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputUpdateProdutDto,
  OutputUpdateProdutDto,
} from "./update.product.dto";
export default class UpdateProductUseCase {
  private ProductRepository: ProductRepositoryInterface;
  constructor(ProductRepository: ProductRepositoryInterface) {
    this.ProductRepository = ProductRepository;
  }

  async execute(
    input: InputUpdateProdutDto
  ): Promise<OutputUpdateProdutDto> {
    const productFounded = await this.ProductRepository.find(input.id);

    if (!productFounded) {
      throw new Error("Product not found");
    }

    const product = ProductFactory.create(
      input.type,
      input.name,
      input.price,
    );

    await this.ProductRepository.update(product);

    return {
      id: input.id,
      name: product.name,
      price: product.price,
    };
  }
}
