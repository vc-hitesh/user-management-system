export interface User {
    username: string;
    role: string;
    id: number;
}

export interface Login {
    username: string;
    password: string;
}

export class UserProfile {
    username: string;
    password: string;
    name: string;
    phone: number;
    address: string;
    age: number;
    id?: number;
}

export interface UpdateProfilePayload {
    password: string;
    name: string;
    phone: number;
    address: string;
    age: number;
    id: number;
}

export interface LoginResponse {
    token: string;
    user: {
        username: string;
        role: string;
        id: number;
    };
}

export interface SuccessResponse {
    result: string;
}