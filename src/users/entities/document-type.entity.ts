// import {
//   PrimaryGeneratedColumn,
//   Column,
//   Entity,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from 'typeorm';

// @Entity()
// export class DocumentType {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: 'varchar', length: 255, unique: true })
//   readonly label: string;

//   @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   createdAt: Date;

//   @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   updateAt: Date;
// }
