import { User } from "../model/schema";

const users: User[] = [
    {
        id: 1,
        userid: "lobo",
        nickname: "Lobo",
        email: "croissant@atun.com",
        password: "1234",
        bio: "13 y.o siamese"
    }
];

export async function addUser(user: Omit<User, "id">) {
    const newUser = { ...user, id: Math.random() };
    users.push(newUser);
    return newUser.userid;
}

export async function findUserByUserid(userid: string) {
    return users.find((user) => user.userid === userid);
}
