export interface HTTPResponse<T, M = {}> {
  message: string;
  data: T;
  meta?: M;
}
