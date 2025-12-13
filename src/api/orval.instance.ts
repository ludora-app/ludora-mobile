// src/api/mutator/custom-instance.ts
import { HTTPError } from 'ky';

import { kyApi } from './api.instance';

export const customInstance = async <T>({
  data,
  headers,
  method,
  params,
  signal,
  url,
}: {
  url: string;
  method: string;
  params?: Record<string, any>;
  data?: any;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}): Promise<T> => {
  const client = kyApi;
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url;

  try {
    // Traiter les paramètres de requête URL s'ils existent
    const queryParams = params
      ? `?${new URLSearchParams(
          Object.entries(params)
            .filter(([_, value]) => value !== undefined && value !== null)
            .reduce((obj, [key, value]) => ({ ...obj, [key]: String(value) }), {}),
        ).toString()}`
      : '';

    // Construire les options de requête
    const requestOptions: Record<string, any> = {
      headers,
      signal: signal ?? undefined,
    };

    if (data instanceof FormData) {
      requestOptions.body = data;
    } else {
      requestOptions.json = data;
    }

    // Faire l'appel avec ky en fonction de la méthode
    const lowercaseMethod = method.toLowerCase();
    let response: Response;

    if (lowercaseMethod === 'get' || lowercaseMethod === 'delete') {
      response = await client.get(`${cleanUrl}${queryParams}`, requestOptions);
    } else if (lowercaseMethod === 'post') {
      response = await client.post(cleanUrl + queryParams, requestOptions);
    } else if (lowercaseMethod === 'put') {
      response = await client.put(cleanUrl + queryParams, requestOptions);
    } else {
      response = await client.patch(cleanUrl + queryParams, requestOptions);
    }

    // Pour les réponses 204 No Content, retourner un objet vide
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error: any) {
    if (error instanceof HTTPError) {
      const errorResponse = await error.response.json();
      throw errorResponse;
    }
    throw error;
  }
};
