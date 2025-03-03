import { Injectable } from "@nestjs/common";
import { Carts } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AddCartDto } from "./dto/add-cart.dto";
import { plainToInstance } from "class-transformer";
import { CartItemResDto } from "./dto/cart-item-res.dto";



@Injectable()
export class CartsRepository {

    constructor(private prisma: PrismaService) {}

    async generateWhenNotExists(userId: string): Promise<Carts> {
        const cart = await this.prisma.carts.findUnique({
            where: {
                userId
            }
        })
        if(cart) {
            return this.prisma.carts.create({data: {userId}})
        }
        return cart 
    }

    async add(userId: string, addCartDto: AddCartDto) :Promise<CartItemResDto> {
        const cart = await this.generateWhenNotExists(userId);
        const {productId, quantity} = addCartDto;
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