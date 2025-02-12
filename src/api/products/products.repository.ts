import { Injectable } from "@nestjs/common";
import { IRepository } from "src/common/interface/repository.interface";
import { ProductResDto } from "./dto/product-res.dto";
import { PaginatedResDto } from "src/common/dto/paginated-res.dto";



@Injectable()
export class ProductsReposiory implements IRepository<ProductResDto> {

    create(createDto: unknown): Promise<ProductResDto> {
        throw new Error("Method not implemented.");
    }

    getMany(queryDto?: unknown): Promise<PaginatedResDto<ProductResDto>> {
        throw new Error("Method not implemented.");
    }

    getOneById(id: unknown): Promise<ProductResDto> {
        throw new Error("Method not implemented.");
    }

    update(id: unknown, updateDto: unknown): Promise<ProductResDto> {
        throw new Error("Method not implemented.");
    }
    
    remove(id: unknown): Promise<void> {
        throw new Error("Method not implemented.");
    }

}