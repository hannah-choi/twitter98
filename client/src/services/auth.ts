import { User } from "../model/model";

export type AuthCredential = Pick<User, "userid" | "token">;

export interface IAuthService {
    login: (userid: string, password: string) => Promise<AuthCredential>;
    me: () => Promise<AuthCredential>;
    logout: () => Promise<void>;
    register: (
        userid: string,
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
    async login(userid: string, password: string) {
        return {
            userid: "lobo",
            token: "atun123"
        };
    }

    async me() {
        return {
            userid: "lobo",
            token: "atun123"
        };
    }

    async logout() {
        return;
    }

    async register(
        userid: string,
        password: string,
        nickname: string,
        email: string,
        avatar?: string,
        bg?: string,
        bio?: string
    ) {
        return {
            userid: "lobo",
            token: "atun123"
        };
    }
}
