import { PaginatedResDto } from "../dto/paginated-res.dto";

/**
 * R = Response Dto
 */
export interface IRepository<R> {

    create(createDto: unknown): Promise<R>;

    getMany(queryDto?: unknown): Promise<PaginatedResDto<R>>;

    getOneById(id: unknown): Promise<R>;

    update(id: unknown, updateDto: unknown): Promise<R>;

    remove(id: unknown): Promise<void>;
}