import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderDetailsService } from './services/order-details.service';
import { OrdersService } from './services/orders.service';
import { ProductsService } from './services/products.service';
import { PurchaseOrdersService } from './services/purchase-orders.service';
import { PurchaseOrderDetailsService } from './services/purchase-order-details.service';
import { InventoryTransactionsService } from './services/inventory-transactions.service';

import { InventoryTransactionsController } from './controllers/inventory-transactions.controller';
import { OrdersController } from './controllers/orders.controller';
import { ProductsController } from './controllers/products.controller';
import { PurchaseOrdersController } from './controllers/purchase-orders.controller';
import { PurchaseOrderDetailsController } from './controllers/purchase-order-details.controller';
import { OrderDetailsController } from './controllers/order-details.controller';

import { Product } from './entities/product.entity';
import { InventoryTransaction } from './entities/inventory-transactions.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { Order } from './entities/order.entity';
import { PurchaseOrderDetail } from './entities/purchase-order-detail.entity';
import { PurchaseOrder } from './entities/purchase-order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      InventoryTransaction,
      Order,
      OrderDetail,
      PurchaseOrder,
      PurchaseOrderDetail,
    ]),
  ],
  providers: [
    OrderDetailsService,
    OrdersService,
    ProductsService,
    PurchaseOrdersService,
    PurchaseOrderDetailsService,
    InventoryTransactionsService,
  ],
  controllers: [
    InventoryTransactionsController,
    OrdersController,
    ProductsController,
    PurchaseOrdersController,
    PurchaseOrderDetailsController,
    OrderDetailsController,
  ],
})
export class InventoryModule {}
