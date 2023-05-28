// type User  = {
//     _id?:string,
//     token: string,
//     nickname?:string,
//     icon?:string
// };

interface User {
    _id: string;
    icon: string;
    nick: string;
    name?: string;
    surname?: string;
    email: string;
    role?: "user" | "admin";
    birthdate?: Date;
    address?: string;
}

interface Token {
    token: string;
    hoursExp: number;
    date?: Date;
}

export default User;
export type {Token};