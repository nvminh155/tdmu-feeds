export type TResponseDKMH<T = any> = {
  result: boolean;
  message: string;
  code: number;
  data?: T;
};

export type TPaginationRes<TData> = {
  success: true;
  count: number;
  data: {
    results: TData[];
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
  };
  error: TErrorRes | null;
};

export type TSingleRes<T> = {
  success: true;
  data: T | null;
  error: TErrorRes | null;
};

export enum EErrorCode {
  "DKMH_EXPIRED_TOKEN" = 1111,
}

export type TErrorRes = {
  success?: false;
  stack?: string;
  message: string;
  code: string | EErrorCode;
};

export type TResponse<TData> = TSingleRes<TData>;

export type TResponseList<TData> = TPaginationRes<TData>;
