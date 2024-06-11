export interface Tweet {
    tweetID: number;
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
    id: number;
    password: string;
    bio?: string;
    avatar?: string;
    bg?: string;
    token: undefined | string;
}
