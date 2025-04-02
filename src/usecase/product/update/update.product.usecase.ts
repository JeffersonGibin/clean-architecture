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

    const product = ProductFactory.create(
      input.type,
      productFounded.name,
      productFounded.price,
    );

    await this.ProductRepository.update(product);

    return {
      id: input.id,
      name: product.name,
      price: product.price,
    };
  }
}
