export interface Tweet {
    id: number;
    text: string;
    created: string;
    nickname: string;
    username: string;
    url?: string;
}

export interface User {
    username: string;
    nickname: string;
    email: string;
    password: string;
    bio?: string;
    avatar?: string;
    bg?: string;
    token: undefined | string;
}
