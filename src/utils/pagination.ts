

export class Pagination {
    page: number;
    limit: number;
    size: number;
    skip: number;
    total: number;

    constructor(page: number, limit: number, total: number) {
        this.page = page;
        this.limit = limit;
        this.total = total;
        this.skip = (page - 1) * limit;
        this.size = Math.ceil(total / limit);
    }
}