import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';

import { Customer } from './entities/customer.entity';
import { Company } from './entities/company.entity';
import { Employee } from './entities/employee.entity';
import { Person } from './entities/person.entity';
import { Supplier } from './entities/supplier.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Customer,
      Company,
      Employee,
      Person,
      Supplier,
    ]),
  ],
  controllers: [CustomerController, UsersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
