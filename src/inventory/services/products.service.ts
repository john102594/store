import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductDto,
} from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async findAll(params?: FilterProductDto) {
    if (params.limit) {
      const { limit, offset } = params;
      return await this.productRepo.find({
        take: limit,
        skip: offset,
      });
    }
    return await this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async findSku(productSku: string) {
    const product = await this.productRepo.findOne({ sku: productSku });
    if (!product) {
      throw new NotFoundException(
        `Product SKU #${productSku} is already created`,
      );
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const product = await this.productRepo.findOne({ sku: data.sku });
    if (product) {
      throw new BadRequestException(
        `Product SKU #${data.sku} is already created`,
      );
    }
    const newProduct = this.productRepo.create(data); //Parsea la data al Repo
    return await this.productRepo.save(newProduct);
  }

  //Bulk created
  async bulkCreate(data: CreateProductDto[]) {
    const skus = data.map((element) => element.sku);
    //Validate that sku no created in the db
    const products = await this.productRepo.find({
      where: { sku: In(skus) },
    });

    //Parse to sku in skuscreated
    const skusCreated = products.map((element) => element.sku);
    if (skusCreated[0]) {
      throw new BadRequestException(
        `Product SKUS ${skusCreated} is already created`,
      );
    }

    const newProducts = this.productRepo.create(data); //Parsea la data al Repo
    return await this.productRepo.save(newProducts);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.productRepo.merge(product, changes); //Parsea el product a lo recibido en el changes
    return await this.productRepo.save(product);
  }

  async remove(id: number) {
    return await this.productRepo.delete(id);
  }
}
