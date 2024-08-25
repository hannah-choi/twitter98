export class TokenStorage {
    private defaultToken;

    constructor() {
        this.defaultToken = "TOKEN";
    }

    saveToken(token: string) {
        localStorage.setItem(this.defaultToken, token);
    }

    getToken() {
        return localStorage.getItem(this.defaultToken);
    }

    clearToken() {
        return localStorage.removeItem(this.defaultToken);
    }
}
