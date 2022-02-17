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

import { PurchaseOrderDetailsService } from '../services/purchase-order-details.service';
import {
  CreatePurchaseOrderItemDto,
  UpdatePurchaseOrderItemDto,
} from '../dtos/purchase-order-detail.dto';

@ApiTags('purchaseorders')
@Controller('purchaseorders')
export class PurchaseOrdersController {
  constructor(private purchaseOrdersService: PurchaseOrderDetailsService) {}

  @Get()
  @ApiOperation({ summary: 'List of purchaseorders' })
  getPurchaseOrders() {
    return this.purchaseOrdersService.findAll();
  }

  @Get(':purchaseorderId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('purchaseorderId', ParseIntPipe) purchaseorderId: number) {
    return this.purchaseOrdersService.findOne(purchaseorderId);
  }

  @Post()
  create(@Body() payload: CreatePurchaseOrderItemDto[]) {
    return this.purchaseOrdersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() payload: UpdatePurchaseOrderItemDto[],
  ) {
    return this.purchaseOrdersService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.purchaseOrdersService.remove(+id);
  }
}
