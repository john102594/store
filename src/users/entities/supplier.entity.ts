import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Person } from './person.entity';
import { Company } from './company.entity';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @OneToOne(() => Person, { nullable: false })
  @JoinColumn()
  person: Person;

  @ManyToOne(() => Company, (company) => company.supplier)
  company: Company;
}
