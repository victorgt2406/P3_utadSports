import { Sport, TimeTable } from "./Options";

// type Team = {
//     created_at: string;
//     description: string;
//     id_captain: number;
//     id_creator: number;
//     id_team: number;
//     image_url: string;
//     max_members: string;
//     name: string;
//     open: boolean;
//     sport: Sport;
//     time_table: TimeTable;
//     total_members: number;
// };

type Team = {
    id_team: number,
    name: string,
    description: string,
    max_members: number,
    image_url: string,
    total_members: number,
    captain: string,
    players: string[],
    sport: Sport,
    open: boolean
}

export type {Team};