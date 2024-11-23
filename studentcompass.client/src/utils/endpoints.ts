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

    console.log(response);

    if (!response.ok) {
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  },
};
