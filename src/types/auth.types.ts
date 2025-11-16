import type { ComponentType } from "react";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  errorSources?: []
  data: T;
}

export interface ISendOTP {
  email: string;
}

export interface IOtpVerify {
    email: string,
    otp: string
}

export interface ISidebarItem {
  title: string;
  url?: string;
  items: {
    title: string;
    url: string;
    component: ComponentType
  }[]
}