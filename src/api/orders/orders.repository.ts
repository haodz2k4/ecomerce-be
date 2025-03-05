import { Injectable } from '@nestjs/common';
import { IRepository } from 'src/common/interface/repository.interface';
import { OrderResDto } from './dto/order-res.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { QueryOrderDto } from './dto/query-order.dto';
import { Pagination } from 'src/utils/pagination';




@Injectable()
export class OrdersRepository implements IRepository<OrderResDto> {

    constructor(private prismaService: PrismaService) {}
    
    async create(createDto: CreateOrderDto): Promise<OrderResDto> {
        const {userId, status, items} = createDto;
        const order = await this.prismaService.orders.create({
            data: {
                userId,
                status,
                ordersItems: {
                    create: items
                }
            },
            include: {
                ordersItems: true
            }
        })
        return plainToInstance(OrderResDto, order)
    }

    async getMany(queryDto?: QueryOrderDto): Promise<PaginatedResDto<OrderResDto>> {
        const {
            keyword,
            page,
            limit,
            sortBy,
            sortOrder,
            userId,
            status
        } = queryDto;

        const where: Record<string, unknown> = {};
        if(status) {
            where.status = status;
        }
        if(userId) {
            where.userId = userId;
        }
        if(keyword) {
            where["OR"] = [
                {
                    user: {
                        fullName: {
                            contains: keyword
                        }
                    }
                },
                {
                    address: {
                        contains: keyword
                    }
                }
            ]
        }
        const [orders, total] = await Promise.all([
            this.prismaService.orders.findMany({
                where,
                orderBy: {
                    [sortBy]: sortOrder
                },
                include: {
                    ordersItems: {
                        include: {
                            product: true
                        }
                    },
                    user: true 
                }
            }),
            this.getTotalDocument(where)
        ]) 

        const pagination = new Pagination(page, limit,total);
        return new PaginatedResDto(plainToInstance(OrderResDto, orders), pagination)

        
    }

    async getTotalDocument(where?: Record<string, unknown>) :Promise<number> {

        return await this.prismaService.orders.count({
            where
        });
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