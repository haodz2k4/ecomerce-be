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
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';




@Injectable()
export class OrdersRepository implements IRepository<OrderResDto> {

    constructor(
        private prismaService: PrismaService,
        private productsService: ProductsService
    ) {}
    
    async create(createDto: CreateOrderDto): Promise<OrderResDto> {
        const {userId, status,address, items} = createDto;

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
                ordersItems: {
                    create: orderItems
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

    async getOneById(id: string): Promise<OrderResDto> {
        const order = await this.prismaService.orders.findUnique({
            where: {id},
            include: {
                ordersItems: {
                    include: {
                        product: true
                    }
                },
                user: true 
            }
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
            include: {
                ordersItems: {
                    include: {
                        product: true
                    }
                },
                user: true 
            }
        });
        return plainToInstance(OrderResDto, order)
    }
    async remove(id: string): Promise<void> {
        await this.getOneById(id)
        await this.prismaService.orders.delete({where: {id}})
    }
    
}