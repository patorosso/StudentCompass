import { toast } from 'react-toastify';
import { ROOT_ROUTE } from './constants';

export const endpoints = {
  dashboard: {
    progress: '/dashboard/progress',
  },
  subjects: {
    get: '/subjects',
    getById: '/subjects/:id',
  },
};

export const request = {
  get: async <T>(url: string): Promise<T> => {
    const response = await fetch(ROOT_ROUTE + url);

    if (!response.ok) {
      toast.error(await response.text());
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  },

  getWithParams: async <T>(url: string, params: URLSearchParams): Promise<T> => {
    const response = await fetch(`${ROOT_ROUTE + url}?${params}`);

    if (!response.ok) {
      toast.error(await response.text());
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  },

  post: async <T>(url: string, body: unknown): Promise<T> => {
    const response = await fetch(ROOT_ROUTE + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      toast.error(await response.text());
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  },
};
