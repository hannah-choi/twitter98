import { User } from "../model/model";
import { IHttp } from "../network/http";
import { TokenStorage } from "../store/token";

export type AuthCredential = Pick<User, "id" | "token" | "username">;

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
    private tokenStorage;

    constructor(http: IHttp, tokenStorage: TokenStorage) {
        this.http = http;
        this.tokenStorage = tokenStorage;
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
        this.tokenStorage.saveToken(data.token);
        return data;
    }

    async login(username: string, password: string) {
        const data = await this.http.fetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({
                username,
                password
            })
        });
        this.tokenStorage.saveToken(data.token);
        return data;
    }

    async me() {
        const token = this.tokenStorage.getToken();
        return this.http.fetch("/auth/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    async logout() {
        this.tokenStorage.clearToken();
        return;
    }
}
