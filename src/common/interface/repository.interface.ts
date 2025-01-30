

export interface IRepository {

    create(data: unknown): Promise<unknown>;
    getMany(data?: unknown): Promise<unknown>;
    getOneById(id: unknown): Promise<unknown>;
    update(id: unknown, data: unknown): Promise<unknown>;
    remove(id: unknown): Promise<void>;
}