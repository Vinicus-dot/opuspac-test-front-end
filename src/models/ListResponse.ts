export interface ListResponse<T> {
    data: T[];
    total: number;
    pageNumber: number;
    pageSize: number;
}
