import { Injectable } from "@nestjs/common";
import { IRepository } from "src/common/interface/repository.interface";
import { RoleResDto } from "./dto/role-res.dto";
import { PaginatedResDto } from "src/common/dto/paginated-res.dto";
import { CreateRoleDto } from "./dto/create-role.dto";


@Injectable()
export class RoleRepository implements IRepository<RoleResDto> {
    create(createDto: CreateRoleDto): Promise<RoleResDto> {
        throw new Error("Method not implemented.");
    }
    getMany(queryDto?: unknown): Promise<PaginatedResDto<RoleResDto>> {
        throw new Error("Method not implemented.");
    }
    getOneById(id: unknown): Promise<RoleResDto> {
        throw new Error("Method not implemented.");
    }
    update(id: unknown, updateDto: unknown): Promise<RoleResDto> {
        throw new Error("Method not implemented.");
    }
    remove(id: unknown): Promise<void> {
        throw new Error("Method not implemented.");
    }

}