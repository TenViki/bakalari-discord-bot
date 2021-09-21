import axios, { AxiosError } from "axios";
import {
  BakalariLoginErrorType,
  BakalariLoginType,
  BakalariUserType,
} from "../types/Auth.Type";
import { error, info } from "../utils/logger";

export const login = async (
  username: string,
  password: string,
  url: string
): Promise<BakalariLoginType | BakalariLoginErrorType> => {
  const params = new URLSearchParams();
  params.append("client_id", "ANDR");
  params.append("grant_type", "password");
  params.append("username", username);
  params.append("password", password);

  try {
    const res = await axios.post<BakalariLoginType>(url + "api/login", params);
    return { ...res.data, success: true };
  } catch (ex) {
    if (!axios.isAxiosError(ex)) {
      error(`Could not fetch data from ${url}api/login`, ex);
      return {
        success: false,
        error: "invalid_client",
        error_description: "Something went wrong",
      };
    }

    return { ...ex.response?.data, success: false } as BakalariLoginErrorType;
  }
};

export const getUserData = async (
  accessToken: string,
  url: string
): Promise<BakalariUserType | null | { success: false }> => {
  try {
    const res = await axios.get<BakalariUserType>(url + "api/3/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return { ...res.data, success: true };
  } catch (ex) {
    if (axios.isAxiosError(ex)) return null;
    return { success: false };
  }
};

export const getAccessToken = async (
  refreshToken: string,
  url: string
): Promise<BakalariLoginType | BakalariLoginErrorType> => {
  const params = new URLSearchParams();
  params.append("client_id", "ANDR");
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);

  try {
    const res = await axios.post<BakalariLoginType>(url + "api/login", params);
    return { ...res.data, success: true };
  } catch (ex) {
    if (!axios.isAxiosError(ex)) {
      return {
        success: false,
        error: "invalid_client",
        error_description: "Something went wrong",
      };
    }

    return {
      ...ex.response?.data,
      success: false,
      error: "refresh_token_invalid",
    } as BakalariLoginErrorType;
  }
};
