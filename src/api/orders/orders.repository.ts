import { Injectable, NotFoundException } from '@nestjs/common';
import { IRepository } from 'src/common/interface/repository.interface';
import { OrderResDto } from './dto/order-res.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { QueryOrderDto } from './dto/query-order.dto';
import { Pagination } from 'src/utils/pagination';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductsService } from '../products/products.service';
import { ordersInclude } from 'src/prisma/include/orders-include';
import { CartsService } from '../carts/carts.service';
import { StatsOrderDto } from './dto/stats-order.dto';
import { StatsOrderResDto } from './dto/stats-order-res.dto';




@Injectable()
export class OrdersRepository {

    constructor(
        private prismaService: PrismaService,
        private productsService: ProductsService,
        private cartsService: CartsService
    ) {}
    
    async stats(statsOrderDto: StatsOrderDto) :Promise<StatsOrderResDto> {
        const where: Record<string, unknown> = {};
        if(statsOrderDto.getRangeDate()){
            where.createdAt = statsOrderDto.getRangeDate()
        }
        const [totalOrders, totalRevenue, totalProductsSold, totalCustomer] = await Promise.all([
            this.prismaService.orders.count({where}),
            this.prismaService.orders_items.aggregate({
                where,
                _sum: {price: true, quantity: true},
                
            }).then(res => res._sum.price * res._sum.quantity),
            this.prismaService.orders_items.aggregate({
                where,
                _sum: {quantity: true}
            }).then(res => res._sum.quantity || 0),
            this.prismaService.orders.findMany({ 
                where, 
                select: { userId: true } 
            }).then(orders => new Set(orders.map(o => o.userId)).size) 
        ])

        return plainToInstance(StatsOrderResDto, {
            totalOrders, 
            totalRevenue, 
            totalProductsSold, 
            totalCustomer
        })

    }

    async create(userId: string, createDto: CreateOrderDto): Promise<OrderResDto> {
        const { status,address,phone,paymentMethod, items} = createDto;
        const user = await this.prismaService.users.findUnique({where: {id: userId}});
        if(!user) {
            throw new NotFoundException(`User with ${userId} is not found`);
        }
        const orderItems = await Promise.all(
            items.map(async (item) => {

                const product = await this.productsService.findOne(item.productId);
                if(product.inventories.quantity === 0 || product.inventories.quantity < item.quantity) {
                    throw new NotFoundException(`Product with id ${item.productId} is not enough stock`)
                }

                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product.price
                }
            })
        )
        
        const order = await this.prismaService.orders.create({
            data: {
                userId,
                status,
                address,
                phone,
                paymentMethod,
                ordersItems: {
                    create: orderItems
                }
            },
            include: ordersInclude
        })
        //Remove cart item when create order
        const productIds = orderItems.map((item) => item.productId);
        await this.cartsService.removeMulti(userId,productIds)
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
                include: {...ordersInclude}
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

    async getOneById(id: string): Promise<OrderResDto> {
        const order = await this.prismaService.orders.findUnique({
            where: {id}
        });
        if(!order) {
            throw new NotFoundException("Order is not found");
        }
        return plainToInstance(OrderResDto, order)
    }
    async update(id: string, updateDto: UpdateOrderDto): Promise<OrderResDto> {
        await this.getOneById(id)
        const order = await this.prismaService.orders.update({
            where: {
                id
            },
            data: updateDto,
            include: ordersInclude
        });
        return plainToInstance(OrderResDto, order)
    }
    async remove(id: string): Promise<void> {
        await this.getOneById(id)
        await this.prismaService.orders.delete({where: {id}})
    }
    
}