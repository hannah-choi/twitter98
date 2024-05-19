import { User } from "../model/schema";

const users: User[] = [
    {
        id: 1,
        userid: "lobo",
        nickname: "Lobo",
        email: "croissant@atun.com",
        password: "1234",
        bio: "13 y.o siamese",
        token: undefined
    }
];

export async function registerUser(user: User) {
    const newUser = { ...user, id: users.length + 1 };
    users.push(newUser);
    return newUser.userid;
}

export async function loginUser(userid: string, password: string) {
    const foundUser = users.find((user) => user.userid === userid);
    return { id: foundUser!.id, password: foundUser!.password };
}
