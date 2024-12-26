import { IStorageService } from '@template/shared/infrastructure/storage/IStorageService';

export class LocalStorageService implements IStorageService {
  getItem(key: string): Promise<string | null> {
    if (typeof window !== 'undefined') {
      return Promise.resolve(localStorage.getItem(key));
    }
    return Promise.resolve(null);
  }

  setItem(key: string, value: string): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
    return Promise.resolve();
  }

  removeItem(key: string): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
    return Promise.resolve();
  }

  clear(): void {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  }
}
