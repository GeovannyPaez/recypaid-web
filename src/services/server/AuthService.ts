"use server";
import nextAuthOptions from "@/auth/next-auth-options";
import { ResponseError, ResponseErrorType } from "@/errors/ResponseError";
import api from "@/lib/api";

import { ResetPasswordDto, User } from "@/types/user";
import { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const LoginService = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const user = await api.post<User>("/auth/login", { email, password });
    return user.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        if (error.response?.data?.message === ResponseErrorType.EMAIL_NOT_VERIFIED) {
          throw new ResponseError(ResponseErrorType.EMAIL_NOT_VERIFIED, ResponseErrorType.EMAIL_NOT_VERIFIED);
        }
        throw new ResponseError("Credenciales Invalidas", ResponseErrorType.UNAUTHORIZED);
      }
    }
    throw new ResponseError("Error logging in");

  };
}

export const RegisterService = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const user = await api.post<User>("/auth/register", { email, password });
    api.defaults.headers.Authorization = `Bearer ${user.data.token}`;
    return user.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        throw new ResponseError("User already exists");
      }
    }
    throw new ResponseError("Error registering user");
  }
};

export const GetServerSession = async (): Promise<User> => {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/auth/login");
  }
  return session.user;
};


export const ResetPassWordService = async (data: ResetPasswordDto): Promise<User> => {
  try {
    const user = await api.post<User>("/auth/reset-password", data);
    return user.data;
  } catch (error) {
    const err = error as AxiosError;
    if (err.response?.status === 401) {
      throw new ResponseError("Invalid Code", ResponseErrorType.UNAUTHORIZED);
    }
    console.log("data", err.response?.data)
    console.log("data here", data)
    console.log(err)

    throw new ResponseError("Error resetting password");
  }
}