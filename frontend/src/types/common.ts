export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export type Optional<T> = T | undefined | null;

export type Record<K extends string | number | symbol, T> = {
  [P in K]: T;
};

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface TableData<T> {
  rows: T[];
  loading: boolean;
  error: string | null;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
}

export type Nullable<T> = T | null;

export type Awaitable<T> = Promise<T> | T;

export interface ModalState {
  isOpen: boolean;
  type: string;
  data?: unknown;
}

export interface FormData<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
}
