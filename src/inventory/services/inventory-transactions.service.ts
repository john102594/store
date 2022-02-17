import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { InventoryTransaction } from '../entities/inventory-transactions.entity';
import {
  CreateInventoryTransactionDto,
  UpdateInventoryTransactionDto,
} from '../dtos/inventory-transaction.dto';

@Injectable()
export class InventoryTransactionsService {
  constructor(
    @InjectRepository(InventoryTransaction)
    private inventoryTransactionRepo: Repository<InventoryTransaction>,
  ) {}

  //Find all
  async findAll() {
    return await this.inventoryTransactionRepo.find();
  }

  //Find One
  async findOne(id: number) {
    const inventorytransaction = await this.inventoryTransactionRepo.findOne();
    if (!inventorytransaction) {
      throw new NotFoundException(`InventoryTransaction #${id} not found`);
    }
    return inventorytransaction;
  }

  //Create
  async create(data: CreateInventoryTransactionDto) {
    const newInventoryTransaction = this.inventoryTransactionRepo.create(data); //Parsea la data al Repo
    return await this.inventoryTransactionRepo.save(newInventoryTransaction);
  }

  //Update
  async update(id: number, changes: UpdateInventoryTransactionDto) {
    const inventorytransaction = await this.inventoryTransactionRepo.findOne(
      id,
    );
    this.inventoryTransactionRepo.merge(inventorytransaction, changes); //Parsea el inventorytransaction a lo recibido en el changes
    return await this.inventoryTransactionRepo.save(inventorytransaction);
  }

  //Remove
  async remove(id: number) {
    return await this.inventoryTransactionRepo.delete(id);
  }
}
