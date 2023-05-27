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
    name: string;
    surname: string;
    email: string;
    password: string;
    role: "user" | "admin";
    birthdate: Date;
    address: string;
}

export default User;