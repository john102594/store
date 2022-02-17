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

import { OrderDetailsService } from '../services/order-details.service';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from '../dtos/order-detail.dto';

@ApiTags('orderDetails')
@Controller('orderdetails')
export class OrderDetailsController {
  constructor(private orderdetailsService: OrderDetailsService) {}

  @Get()
  @ApiOperation({ summary: 'List of orderdetails' })
  getOrderDetails() {
    return this.orderdetailsService.findAll();
  }

  @Get(':orderId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderdetailsService.findOne(orderId);
  }

  @Post()
  create(@Body() payload: CreateOrderItemDto[]) {
    return this.orderdetailsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateOrderItemDto[]) {
    return this.orderdetailsService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.orderdetailsService.remove(+id);
  }
}
