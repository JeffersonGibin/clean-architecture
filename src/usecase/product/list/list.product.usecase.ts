import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputListProductDto,
  OutputListProductDto
} from "./list.product.dto";

export default class ListProductUseCase {
  private productRepository: ProductRepositoryInterface;
  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
    const producs = await this.productRepository.findAll();
    return OutputMapper.toOutput(producs);
  }
}

class OutputMapper {
  static toOutput(product: ProductInterface[]): OutputListProductDto {
    return {
      products: product.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
