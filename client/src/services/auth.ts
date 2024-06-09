import { User } from "../model/model";
import { IHttp } from "../network/http";

export type AuthCredential = Pick<User, "username" | "token">;

export interface IAuthService {
    login: (username: string, password: string) => Promise<AuthCredential>;
    me: () => Promise<AuthCredential>;
    logout: () => Promise<void>;
    register: (
        username: string,
        password: string,
        nickname: string,
        email: string,
        avatar?: string,
        bg?: string,
        bio?: string
    ) => Promise<AuthCredential>;
}

export interface IAuthErrorEventBus {
    listen: (callback: (error: Error) => void) => void;
    notify: (error: Error) => void;
}

export class AuthErrorEventBus implements IAuthErrorEventBus {
    private callback!: (error: Error) => void;

    listen(callback: (error: Error) => void) {
        this.callback = callback;
    }

    notify(error: Error) {
        if (this.callback) {
            this.callback(error);
        }
    }
}

export default class AuthService implements IAuthService {
    private http;
    private token?: string;

    constructor(http: IHttp) {
        this.http = http;
    }

    async login(username: string, password: string) {
        return this.http.fetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({
                username,
                password
            })
        });
    }

    async me() {
        return this.http.fetch("auth/me", {
            method: "GET",
            headers: {
                authorization: `bearer ${this.token}`
            }
        });
    }

    async logout() {
        return;
    }

    async register(
        username: string,
        password: string,
        nickname: string,
        email: string,
        avatar?: string,
        bg?: string,
        bio?: string
    ) {
        const data = await this.http.fetch("/auth/register", {
            method: "POST",
            body: JSON.stringify({
                username,
                password,
                nickname,
                email,
                avatar,
                bg,
                bio
            })
        });
        this.token = data.token;
        return data;
    }
}
