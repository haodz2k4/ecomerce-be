import { PaginatedResDto } from "../dto/paginated-res.dto";

/**
 * R = Response Dto
 */
export interface IRepository<R> {

    create(data: unknown): Promise<R>;

    getMany(data?: unknown): Promise<PaginatedResDto<R>>;

    getOneById(id: unknown): Promise<R>;

    update(id: unknown, data: unknown): Promise<R>;

    remove(id: unknown): Promise<void>;
}