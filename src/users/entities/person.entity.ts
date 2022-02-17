import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DocumentType } from 'src/common/document-type';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  readonly name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  readonly email: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  readonly phone: string;

  @Column({ type: 'varchar', length: 20 })
  readonly document_number: string;

  @Column({
    type: 'enum',
    enum: DocumentType,
    default: DocumentType.CC,
  })
  document_type: DocumentType;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
