import { User } from "../model/schema";

const users: User[] = [
    {
        id: 1,
        username: "lobo",
        nickname: "Lobo",
        email: "croissant@atun.com",
        password: "$2b$10$glHr.sU06WMOdS2r1IjZlOSBFTGEcfmJZYG.B90diQZFTPXHr/byq",
        bio: "13 y.o siamese"
    }
];

export async function addUser(user: Omit<User, "id">) {
    const newUser = { ...user, id: Math.floor(Math.random() * 100) };
    users.push(newUser);
    return newUser.id;
}

export async function findUserByUsername(username: string) {
    return users.find((user) => user.username === username);
}

export async function findUserById(id: number) {
    return users.find((user) => user.id === id);
}
