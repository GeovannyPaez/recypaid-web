import { AxiosError, AxiosInstance } from "axios";
import { GetServerSession } from "./AuthService";
import api from "@/lib/api";
import { redirect } from "next/navigation";
import { ResponseError, ResponseErrorType } from "@/errors/ResponseError";

export class ApiService {
    pathName: string;
    constructor(pathName: string) {
        this.pathName = pathName;
    }

    async authHeaders() {
        const session = await GetServerSession();
        return {
            headers: {
                "Authorization": `Bearer ${session.token}`
            }
        }
    }

    handlerError(error: any) {
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
        console.log(error.response.data);
        throw new ResponseError("Error in request");
    }


}