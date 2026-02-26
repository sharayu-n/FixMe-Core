export interface RegisterResponse {
  token: string;
  user: {
    id: string;
    role: number | string;
    name: string;
  };
 
}