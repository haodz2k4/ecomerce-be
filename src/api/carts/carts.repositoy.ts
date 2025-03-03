import { Injectable, NotFoundException } from "@nestjs/common";
import { Carts } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AddCartDto } from "./dto/add-cart.dto";
import { plainToInstance } from "class-transformer";
import { CartItemResDto } from "./dto/cart-item-res.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { QueryCartDto } from "./dto/query-cart.dto";
import { CartResDto } from "./dto/cart-res.dto";
import { PaginatedResDto } from "src/common/dto/paginated-res.dto";
import { Pagination } from "src/utils/pagination";



@Injectable()
export class CartsRepository {

    constructor(private prisma: PrismaService) {}

    async generateWhenNotExists(userId: string): Promise<Carts> {
        const cart = await this.prisma.carts.findUnique({
            where: {
                userId
            }
        })
        if(!cart) {
            return this.prisma.carts.create({data: {userId}})
        }
        return cart 
    }

    async get(userId: string,queryCartDto: QueryCartDto) :Promise<CartResDto> {
        const {
            keyword,
            page,
            limit,
            sortBy,
            sortOrder,
            minQuantity,
            maxQuantity
        } = queryCartDto;
        const where: Record<string, unknown> = {}
        if(keyword) {
            where.title = {
                contains: keyword
            }
        }
        if(minQuantity || maxQuantity) {
            where.quantity = queryCartDto.getRangeQuantity()
        }
        const skip = queryCartDto.getSkip()
        const cart = await this.prisma.carts.findUnique({
            where: {userId},
            include: {
                cartsItems: {
                    orderBy: {
                        [sortBy]: sortOrder
                    },
                    where,
                    take: limit,
                    skip
                }
            }
        })
        const pagination = new Pagination(page, limit,cart.cartsItems.length )
        return plainToInstance(CartResDto, {
            id: cart.id,
            userId,
            cart_items: new PaginatedResDto(plainToInstance(CartItemResDto, cart.cartsItems),pagination)
        })

    }

    async add(userId: string, addCartDto: AddCartDto) :Promise<CartItemResDto> {
        const cart = await this.generateWhenNotExists(userId);
        const {productId, quantity} = addCartDto;
        const isExists = await this.prisma.carts_items.findFirst({
            where: {
                cartId: cart.id,
                productId
            }
        })
        if(isExists) {
            const cartItem = await this.prisma.carts_items.update({
                where: {id: isExists.id},
                data: {
                    quantity: isExists.quantity + quantity
                },
                include: {
                    product: true 
                }
            })
            

            return plainToInstance(CartItemResDto, cartItem)
        }else {
            const cartItem = await this.prisma.carts_items.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity
                },
                include: {
                    product: true
                }
            })
            

            return plainToInstance(CartItemResDto, cartItem)
        }

    }

    async update(userId: string, updateCartDto: UpdateCartDto): Promise<CartItemResDto> {

        const cart = await this.generateWhenNotExists(userId);
        const {productId, quantity} = updateCartDto;
        const isExists = await this.prisma.carts_items.findFirst({
            where: {
                cartId: cart.id,
                productId
            }
        })
        if(!isExists) {
            throw new NotFoundException("Cart item is not found")
        }
        const cartItem = await this.prisma.carts_items.update({
            where: {id: isExists.id},
            data: {
                productId,
                quantity
            },
            include: {
                product: true
            }
        });
        return plainToInstance(CartItemResDto, cartItem);
    }

}