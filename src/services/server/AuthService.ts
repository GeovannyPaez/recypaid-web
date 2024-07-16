"use server";
import nextAuthOptions from "@/auth/next-auth-options";
import { ResponseError, ResponseErrorType } from "@/errors/ResponseError";
import api from "@/lib/api";

import { User } from "@/types/user";
import { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const LoginService = async (
  email: string,
  password: string
): Promise<User> => {
  const user = await api.post<User>("/auth/login", { email, password });
  return user.data;
};

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
