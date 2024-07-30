import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { GetServerSession } from "./AuthService";
import api from "@/lib/api";
import { redirect } from "next/navigation";
import { ResponseError, ResponseErrorType } from "@/errors/ResponseError";

/**
 * Defines the parameters for making an API request.
 */
export type RequestParams = {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    endpoint: string;
    data?: any;
    searchParams?: Record<string, string | number | boolean>;
    defaultErrorResponse?: any;
    isPublic?: boolean;
}

/**
 * ApiService class for handling API requests.
 */
export class ApiService {
    /**
     * Creates an instance of ApiService.
     * @param pathName - The base path for API endpoints.
     */
    constructor(protected readonly pathName: string) { }

    /**
     * Retrieves authentication headers for API requests.
     * @returns An object containing the Authorization header with the user's token.
     */
    protected async authHeaders() {
        const session = await GetServerSession();
        return {
            headers: {
                "Authorization": `Bearer ${session.token}`
            }
        }
    }

    /**
     * Makes an API request with the given parameters.
     * @param endpoint - The API endpoint to request.
     * @param method - The HTTP method to use for the request.
     * @param data - The data to send with the request (for POST and PUT methods).
     * @param searchParams - Query parameters to append to the URL.
     * @param defaultErrorResponse - A default response to return in case of an error.
     * @param isPublic - Indicates whether the endpoint is public (doesn't require authentication).
     * @returns A Promise that resolves with the response data.
     * @throws {ResponseError} If an error occurs during the request.
     */
    protected async makeRequest<T>({ endpoint, method, data, searchParams, defaultErrorResponse, isPublic }: RequestParams): Promise<T> {
        try {
            const headers = isPublic ? {} : await this.authHeaders();
            let url = `${this.pathName}${endpoint}`;

            // Add search params to the URL if provided
            if (searchParams) {
                const searchParamsString = new URLSearchParams(
                    Object.entries(searchParams).map(([key, value]) => [key, String(value)])
                ).toString();
                url += `?${searchParamsString}`;
            }

            const config = {
                ...headers,
                ...(method === 'get' || method === 'delete' ? { params: data } : {})
            };

            const response: AxiosResponse<T> = await api[method](
                url,
                method === 'get' || method === 'delete' ? config : data,
                method === 'post' || method === 'put' ? config : undefined
            );
            return response.data;
        } catch (error) {
            console.log(error);
            if (defaultErrorResponse) {
                return defaultErrorResponse;
            }
            this.handlerError(error);
            throw error; // Re-throw the error after handling
        }
    }

    /**
     * Handles errors that occur during API requests.
     * @param error - The error object to handle.
     * @throws {ResponseError} With appropriate error type and message.
     */
    protected handlerError(error: any) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
                redirect("/auth/login");
            }
            if (error.response?.status === 404) {
                throw new ResponseError(error.response.data.message, ResponseErrorType.NOT_FOUND)
            }
            if (error.response?.status === 409) {
                throw new ResponseError(error.response.data.message, ResponseErrorType.CONFLICT)
            }
            if (error.response?.status === 400) {
                throw new ResponseError(error.response.data.message, ResponseErrorType.BAD_REQUEST)
            }
        }
        throw new ResponseError("Error in request");
    }
}