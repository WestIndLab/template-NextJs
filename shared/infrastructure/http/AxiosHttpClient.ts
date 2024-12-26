import { getConfig } from '@template/shared/conf/config';
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { IStorageService } from '../storage/IStorageService';
import { IHttpClient } from './IHttpClient';

export class AxiosHttpClient implements IHttpClient {
  private readonly axiosInstance: AxiosInstance;
  private readonly AUTH_TOKEN_KEY = 'auth_token';

  constructor(private readonly storageService: IStorageService) {
    const config = getConfig();

    this.axiosInstance = axios.create({
      baseURL: config.apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    void this.setupInterceptors();
  }

  private async setupInterceptors(): Promise<void> {
    this.axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const token = await this.getToken();
        if (token != null) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error),
    );

    this.axiosInstance.interceptors.response.use(
      <T>(response: AxiosResponse<T>) => response.data,
      (error: AxiosError) => {
        if (error.response) {
          this.handleHttpError(error.response.status);
        }
        return Promise.reject(error);
      },
    );
  }

  private handleHttpError(status: number): void {
    switch (status) {
      case 401:
        break;
      case 403:
        break;
      case 404:
        break;
      default:
    }
  }

  private async getToken(): Promise<string | null> {
    return this.storageService.getItem(this.AUTH_TOKEN_KEY);
  }

  public async get<T>(url: string, params?: unknown): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, { params });
    return response.data;
  }

  public async post<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data);
    return response.data;
  }

  public async put<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data);
    return response.data;
  }

  public async delete<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url);
    return response.data;
  }

  public async patch<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data);
    return response.data;
  }
}
