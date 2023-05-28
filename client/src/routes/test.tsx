import { useRef, useState } from "react";
import FormTeam from "../components/forms/FormTeam";
import NavBarTemplate from "../templates/NavBarTemplate";
import { Sport } from "../models/Options";
import { Team } from "../models/Team";
import User from "../models/User";
import axios from "axios";
import useRouterContext from "../utils/RouterContext";
import notify from "../utils/notify";

export default function () {
    const context = useRouterContext();
    // inputs
    // const name = useRef<HTMLInputElement>(null);
    // const description = useRef<HTMLInputElement>(null);
    // const max = useRef<HTMLInputElement>(null);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [max, setMax] = useState<string>("");
    const [captain, setCaptain] = useState<string>("");
    const [nick, setNick] = useState<string>("");
    const [nickPlayers, setNickPlayers] = useState<string[]>([]);
    const [sport, setSport] = useState<Sport>("" as Sport);
    const [users, setUsers] = useState<User[]>([]);

    const handleSubmit = async () => {
        try {
            const teamToCreate: Team = {
                // name: name.current?.value!,
                name,
                sport,
                // description: description.current?.value!,
                description,
                captain: users.find((user) => {
                    user.nick === captain;
                })!,
                players: nickPlayers.map(
                    (nick) => users.find((user) => user.nick === nick)!
                ),
                // max: parseInt(max.current?.value!),
                max: parseInt(max),
                open: true,
                icon: "",
            };

            const res = await axios.post(
                context.apiUrl + "/teams",
                teamToCreate,
                {
                    headers: {
                        Authorization: await context.token?.token,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(res.data);
            notify(
                "Team created",
                "notification",
                `${res.data.name} was succesfully created`
            );
        } catch (err: any) {
            console.log(err);
            notify("Ups...", "error", "The team can not have that name");
        }
    };

    return (
        <NavBarTemplate>
            <FormTeam
                {...{
                    name,
                    setName,
                    description,
                    setDescription,
                    max,
                    setMax,
                    captain,
                    setCaptain,
                    users,
                    setUsers,
                    nick,
                    setNick,
                    nickPlayers,
                    setNickPlayers,
                    sport,
                    setSport,
                    handleSubmit
                }}
            />
        </NavBarTemplate>
    );
}
