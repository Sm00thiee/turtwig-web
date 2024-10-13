export interface LoginRequestDto {
  username: string;
  password: string;
  returnUrl: string;
  rememberUser: boolean;
}

export interface LoginResponse {
  userId: string;
  token: string;
}