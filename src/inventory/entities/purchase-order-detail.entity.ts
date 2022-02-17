import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Product } from './product.entity';
import { PurchaseOrder } from './purchase-order.entity';

@Entity()
export class PurchaseOrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  readonly quantity: number;

  @Column()
  readonly unit_cost: number;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(
    () => PurchaseOrder,
    (purchaseOrder) => purchaseOrder.purchaseOrderDetail,
  )
  purchaseOrder: PurchaseOrder;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
