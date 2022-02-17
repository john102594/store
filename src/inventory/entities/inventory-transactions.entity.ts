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
import { Order } from './order.entity';

@Entity()
export class InventoryTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.transations)
  readonly product: Product;

  @Column()
  readonly quantity: number;

  @Column()
  readonly unit_price: number;

  @Column()
  readonly balance: number;

  @Column()
  readonly unit_cost_avg: number;

  @ManyToOne(() => PurchaseOrder)
  readonly purchaseOrder: PurchaseOrder;

  @ManyToOne(() => Order)
  readonly order: Order;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
