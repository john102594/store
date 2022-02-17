import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { InventoryTransaction } from './inventory-transactions.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', unique: true })
  sku: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @OneToMany(
    () => InventoryTransaction,
    (inventoryTransaction) => inventoryTransaction.product,
  )
  transations: InventoryTransaction[];
}
