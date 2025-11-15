
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