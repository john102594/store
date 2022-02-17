import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { OrderDetail } from '../entities/order-detail.entity';
import { Product } from '../entities/product.entity';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from '../dtos/order-detail.dto';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepo: Repository<OrderDetail>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async findAll() {
    return await this.orderDetailRepo.find();
  }

  async findOne(id: number) {
    const orderDetail = await this.orderDetailRepo.findOne(id);
    if (!orderDetail) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return orderDetail;
  }

  async create(data: CreateOrderItemDto[]) {
    //Validando que todos los productos existen
    const productIds = data.map((element) => element.productId);
    const products = await this.productRepo.findByIds(productIds);
    if (data.length !== products.length) {
      const idsFound = products.map((product) => product.id);
      const idsNotFound = productIds.filter(
        (element) => !idsFound.includes(element),
      );
      throw new NotFoundException(`Products #${idsNotFound} not found`);
    }

    const orderItems = await this.orderDetailRepo.create(data);
    //Asignando productos al detalle de la orden
    await orderItems.forEach((orderDetail, key) => {
      orderDetail.product = products[key];
    });
    const newOrder = this.orderRepo.create(); //Parsea la data al Repo
    newOrder.orderDetail = orderItems;
    await this.orderDetailRepo.save(orderItems);
    return await this.orderRepo.save(newOrder);
  }

  async update(id: number, changes: UpdateOrderItemDto[]) {
    const order = await this.orderDetailRepo.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    console.log(changes);
    // this.orderDetailRepo.merge(order, changes); Parsea el order a lo recibido en el changes
    return await this.orderDetailRepo.save(order);
  }

  async remove(id: number) {
    return await this.orderDetailRepo.delete(id);
  }
}
