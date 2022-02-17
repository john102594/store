import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PurchaseOrder } from '../entities/purchase-order.entity';
import { PurchaseOrderDetail } from '../entities/purchase-order-detail.entity';
import { Product } from '../entities/product.entity';
import {
  CreatePurchaseOrderItemDto,
  UpdatePurchaseOrderItemDto,
} from '../dtos/purchase-order-detail.dto';

@Injectable()
export class PurchaseOrderDetailsService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private purchaseOrderRepo: Repository<PurchaseOrder>,
    @InjectRepository(PurchaseOrderDetail)
    private purchaseOrderDetailRepo: Repository<PurchaseOrderDetail>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async findAll() {
    return await this.purchaseOrderDetailRepo.find();
  }

  async findOne(id: number) {
    const purchaseorderDetail = await this.purchaseOrderDetailRepo.findOne(id);
    if (!purchaseorderDetail) {
      throw new NotFoundException(`PurchaseOrder #${id} not found`);
    }
    return purchaseorderDetail;
  }

  async create(data: CreatePurchaseOrderItemDto[]) {
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

    const purchaseOrderItems = await this.purchaseOrderDetailRepo.create(data);
    //Asignando productos al detalle de la orden
    await purchaseOrderItems.forEach((purchaseOrderDetail, key) => {
      purchaseOrderDetail.product = products[key];
    });
    const newPurchaseOrder = this.purchaseOrderRepo.create(); //Parsea la data al Repo
    newPurchaseOrder.purchaseOrderDetail = purchaseOrderItems;
    await this.purchaseOrderDetailRepo.save(purchaseOrderItems);
    return await this.purchaseOrderRepo.save(newPurchaseOrder);
  }

  async update(id: number, changes: UpdatePurchaseOrderItemDto[]) {
    const purchaseorder = await this.purchaseOrderDetailRepo.findOne(id);
    if (!purchaseorder) {
      throw new NotFoundException(`PurchaseOrder #${id} not found`);
    }
    console.log(changes);
    // this.purchaseorderDetailRepo.merge(purchaseorder, changes); Parsea el purchaseorder a lo recibido en el changes
    return await this.purchaseOrderDetailRepo.save(purchaseorder);
  }

  async remove(id: number) {
    return await this.purchaseOrderDetailRepo.delete(id);
  }
}
