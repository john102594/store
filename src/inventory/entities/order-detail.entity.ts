import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Product } from './product.entity';
import { Order } from './order.entity';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  readonly quantity: number;

  @Column()
  readonly unit_price: number;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderDetail)
  order: Order;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
