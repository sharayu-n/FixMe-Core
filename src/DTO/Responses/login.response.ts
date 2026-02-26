export interface LoginResponse {
    token: string;
    user: {
        id: string;
        role: number | string;
        name: string;
    }
}