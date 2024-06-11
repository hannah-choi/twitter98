export interface IHttp {
    fetch: (url: string, config: RequestInit, token?: string) => Promise<any>;
}

export class HttpHelper implements IHttp {
    private baseURL;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    async fetch(url: string, config: RequestInit, token?: string) {
        const res = await fetch(`${this.baseURL}${url}`, {
            ...config,
            headers: token
                ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
                : { "Content-Type": "application/json" }
        });

        if (res.status === 204) {
            //DELETE
            return;
        }

        let data;

        try {
            data = await res.json();
        } catch (err) {
            console.error(err);
        }

        if (res.status > 299 || res.status < 200) {
            throw new Error("response not ok");
        }

        return data;
    }
}
