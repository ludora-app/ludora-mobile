import { HTTPError } from "ky";
import { api, authApi } from "../api.instance";
import { API_ROUTES } from "../utils/api.routes";
import { SampleDTO, SampleResponse } from "../utils/api.types";

// sample query
export async function get(): Promise<SampleResponse> {
  try {
    const response = api
      .get(API_ROUTES.GET_SAMPLE_ROUTE)
      .json<SampleResponse>();
    // or for protected routes
    const protectedResponse = authApi
      .get(API_ROUTES.GET_SAMPLE_ROUTE)
      .json<SampleResponse>();

    return; // something
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorResponse = await error.response.json();
      throw errorResponse;
    }
    throw error;
  }
}

export async function post(obj: SampleDTO): Promise<SampleResponse> {
  try {
    const response = api
      .post(API_ROUTES.POST_SAMPLE_ROUTE, {
        json: obj, // object or anything
      })
      .json<SampleResponse>();
    // or for protected routes
    const protectedResponse = authApi
      .post(API_ROUTES.POST_SAMPLE_ROUTE, {
        json: obj, // object or anything
      })
      .json<SampleResponse>();

    return; // something
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorResponse = await error.response.json();
      throw errorResponse;
    }
    throw error;
  }
}
