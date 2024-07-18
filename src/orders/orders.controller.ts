import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient: ClientProxy
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.natsClient.send('createOrder', createOrderDto);
  }

  @Get()
  findAll(@Query() ordenPaginationDto: OrderPaginationDto) {
    return this.natsClient.send('findAllOrders', ordenPaginationDto);
  }


  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.natsClient.send('findOneOrder', { id })
      .pipe(catchError(error => { throw new RpcException(error) }))
  }

  @Get(':status')
  findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto
  ) {
    return this.natsClient.send('findAllOrdersByStatus', { status: statusDto.status, paginationDto })
      .pipe(catchError(error => { throw new RpcException(error) }))
  }


  @Patch(':id')
  changeOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    return this.natsClient.send('changeOrderStatus', { id, status: statusDto.status })
      .pipe(catchError(error => { throw new RpcException(error) }))
  }





}
