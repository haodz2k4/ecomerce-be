import { Injectable } from '@nestjs/common';
import { IRepository } from 'src/common/interface/repository.interface';
import { OrderResDto } from './dto/order-res.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';




@Injectable()
export class OrdersRepository implements IRepository<OrderResDto> {

    constructor(private prismaService: PrismaService) {}
    
    create(createDto: CreateOrderDto): Promise<OrderResDto> {
        throw new Error('Method not implemented.');
    }
    getMany(queryDto?: unknown): Promise<PaginatedResDto<OrderResDto>> {
        throw new Error('Method not implemented.');
    }
    getOneById(id: unknown): Promise<OrderResDto> {
        throw new Error('Method not implemented.');
    }
    update(id: unknown, updateDto: unknown): Promise<OrderResDto> {
        throw new Error('Method not implemented.');
    }
    remove(id: unknown): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}