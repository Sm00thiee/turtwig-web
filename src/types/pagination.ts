export interface PaginationRequest {
  pageIndex: number;
  pageSize: number;
  sortBy: string;
  isDescending: boolean;
}

export interface PaginationBaseResponse<T> {
  pageIndex: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  items: T[];
}