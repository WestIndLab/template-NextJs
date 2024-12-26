export interface IHttpClient {
  get<T>(url: string, params?: unknown): Promise<T>;
  post<T>(url: string, data?: unknown): Promise<T>;
  put<T>(url: string, data?: unknown): Promise<T>;
  delete<T>(url: string): Promise<T>;
  patch<T>(url: string, data?: unknown): Promise<T>;
}
