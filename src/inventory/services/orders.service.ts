import {
  Injectable,
  NotFoundException,
  // BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { OrderDetail } from '../entities/order-detail.entity';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from '../dtos/order-detail.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepo: Repository<OrderDetail>,
  ) {}

  async findAll() {
    return await this.orderRepo.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async create(data: CreateOrderItemDto[]) {
    // const order = await this.orderRepo.findOne({ sku: data.sku });
    // if (order) {
    //   throw new BadRequestException(
    //     `Order SKU #${data.sku} is already created`,
    //   );
    // }

    return data;
  }

  async update(id: number, changes: UpdateOrderItemDto[]) {
    const order = await this.orderRepo.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    console.log(changes);
    // this.orderRepo.merge(order, changes); Parsea el order a lo recibido en el changes
    return await this.orderRepo.save(order);
  }

  async remove(id: number) {
    return await this.orderRepo.delete(id);
  }
}
