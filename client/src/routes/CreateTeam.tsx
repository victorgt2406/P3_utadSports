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
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [max, setMax] = useState<string>("");
    const [captain, setCaptain] = useState<string>("");
    const [nick, setNick] = useState<string>("");
    const [nickPlayers, setNickPlayers] = useState<string[]>([]);
    const [sport, setSport] = useState<Sport>("" as Sport);
    const [users, setUsers] = useState<User[]>([]);
    const [iconFile, setIconFile] = useState<File | undefined>(undefined);

    const handleSubmit = async () => {
        try {
            var icon: string | undefined = undefined;
            if (iconFile) {
                try {
                    const formData = new FormData();
                    formData.append("file", iconFile);
                    const res = await axios.post(
                        `${context.apiUrl}/storages`,
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );
                    console.log(res);
                    icon = res.data.url;
                } catch (err) {
                    console.log(err);
                    notify("ERROR", "icon", "The icon could not be updated");
                }
            }
            const teamToCreate: Team = {
                name,
                sport,
                description,
                captain: users.find((user) => {
                    user.nick === captain;
                })!,
                // @ts-ignore especial exception when creating
                players: nickPlayers.map(
                    (nick) => (users.find((user) => user.nick === nick)!)._id
                ) as string[],
                max: parseInt(max),
                open: true,
                icon: icon?icon:"",
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
            context.setPage("teams");
        } catch (err: any) {
            console.log(err);
            notify("Ups...", "error", "The team can not have that name");
        }
    };

    return (
        <NavBarTemplate parentPage="teams" page="createTeam" info="createTeam">
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
                    handleSubmit,
                    iconFile,
                    setIconFile
                }}
            />
        </NavBarTemplate>
    );
}