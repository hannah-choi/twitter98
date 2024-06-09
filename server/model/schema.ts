export interface Tweet {
    tweetID: number;
    text: string;
    created: string;
    nickname: string;
    username: string;
    url?: string;
}

export interface User {
    id: number;
    username: string;
    nickname: string;
    email: string;
    password: string;
    bio?: string;
    avatar?: string;
    bg?: string;
}
