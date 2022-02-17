import {
  Controller,
  Get,
  // Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { OrdersService } from '../services/orders.service';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from '../dtos/order-detail.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'List of orders' })
  getOrders() {
    return this.ordersService.findAll();
  }

  @Get(':orderId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.ordersService.findOne(orderId);
  }

  @Post()
  create(@Body() payload: CreateOrderItemDto[]) {
    return this.ordersService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateOrderItemDto[]) {
    return this.ordersService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.ordersService.remove(+id);
  }
}
