import { Sport } from "./Options";
import User from "./User";

interface Team {
    _id?: string;
    icon: string;
    name: string;
    description: string;
    sport: Sport;
    captain: User;
    players?: User[];
    open?: boolean;
    max: number,
    primaryColor?: string;
    secondaryColor?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type {Team};