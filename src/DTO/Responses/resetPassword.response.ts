export interface ResetPasswordResponse {
  user: {
    id: string;
    role: number | string;
    name: string;
  };
}