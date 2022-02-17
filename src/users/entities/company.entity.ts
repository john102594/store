import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Supplier } from './supplier.entity';

import { DocumentType } from 'src/common/document-type';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 40 })
  readonly name: string;

  @Column({ type: 'varchar', length: 15 })
  readonly phone: string;

  @Column({ type: 'varchar', length: 100 })
  readonly website: string;

  @Column({ type: 'varchar', length: 20 })
  readonly document_number: string;

  @Column({
    type: 'enum',
    enum: DocumentType,
    default: DocumentType.CC,
  })
  document_type: DocumentType;

  @OneToMany(() => Supplier, (supplier) => supplier.company)
  supplier: Supplier[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
