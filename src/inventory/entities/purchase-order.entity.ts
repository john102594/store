import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { PurchaseOrderDetail } from './purchase-order-detail.entity';

@Entity()
export class PurchaseOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => PurchaseOrderDetail,
    (purchaseOrderDetail) => purchaseOrderDetail.purchaseOrder,
  )
  purchaseOrderDetail: PurchaseOrderDetail[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
