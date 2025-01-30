import { Pagination } from "src/utils/pagination";


export class PaginatedResDto<T> {

    pagination: Pagination;

    items: T[];

    constructor(items: T[], meta: Pagination) {
        this.items = items;
        this.pagination = meta;
    }
}