import { User } from "../model/schema";

const users: User[] = [
    {
        id: 1,
        userid: "lobo",
        nickname: "Lobo",
        email: "croissant@atun.com",
        password: "12345678",
        bio: "13 y.o siamese"
    }
];

export async function addUser(user: Omit<User, "id">) {
    const newUser = { ...user, id: Math.floor(Math.random() * 100) };
    users.push(newUser);
    return newUser.id;
}

export async function findUserByUserid(userid: string) {
    return users.find((user) => user.userid === userid);
}

export async function findUserById(id: number) {
    return users.find((user) => user.id === id);
}
