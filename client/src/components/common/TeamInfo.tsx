import LabelInfo from "./LabelInfo";
import { Team } from "../../models/Team";
import { ICONS_SPORTS } from "../../utils/Icons";
import useRouterContext from "../../utils/RouterContext";
import { capitalizeFirstLetter } from "../../utils/simpleFunctions";
import User from "../../models/User";
import axios from "axios";
import { useEffect, useState } from "react";
import notify from "../../utils/notify";

export default function () {
    const context = useRouterContext();
    // const team: Team | undefined = context.cache;
    // let icon = "",
    //     name = "",
    //     captain = "",
    //     _id: string | undefined = "",
    //     open: boolean | undefined = false,
    //     players: string[] = [];

    const [icon, setIcon] = useState<string | undefined>("");
    const [name, setName] = useState<string | undefined>("");
    const [captain, setCaptain] = useState<User | undefined>(undefined);
    const [_id, set_id] = useState<string | undefined>("");
    const [open, setOpen] = useState<boolean | undefined>(false);
    const [players, setPlayers] = useState<User[]>([]);

    useEffect(() => {
        const team: Team | undefined = context.cache;
        console.log(team);
        if (team) {
            console.log(team);
            setOpen(team.open);
            set_id(team._id);
            setName(team.name);
            setCaptain(team.captain);
            setIcon(team.icon);
            set_id(team._id);
        }
    }, [context]);

    const handleJoin = async () => {
        try {
            if (context.cache) {
                const res = await axios.patch(
                    `${context.apiUrl}/teams/join/${_id}`,
                    {},
                    {
                        headers: {
                            Authorization: context.token?.token,
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log(res.data);
                notify("succesfully joined","","");
                setPlayers([...players, context.user!]);
            } else {
                console.log("nmasd");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center my-4">
                <img
                    src={icon}
                    style={{
                        height: "70px",
                        width: "70px",
                        borderRadius: "40px",
                    }}
                />
                <svg
                    className={"ms-2 me-4 text-primary"}
                    style={{ height: "80px", width: "80px" }}
                >
                    {ICONS_SPORTS.basketball}
                </svg>
                <div className="d-flex flex-column align-items-center">
                    <div className="fw-bold">{name}</div>
                    <div className="fw-light">
                        {capitalizeFirstLetter(context.getText().createdBy)}{" "}
                        {captain?.nick}
                    </div>
                </div>
            </div>
            <div>
                <LabelInfo
                    label={context.getText().teamPlayers}
                    className="text-primary"
                >
                    {captain?.nick}
                </LabelInfo>
                {players.sort().map((player, index) => (
                    <LabelInfo key={index}>{player.nick}</LabelInfo>
                ))}
            </div>
            {open ? (
                <div className="d-flex justify-content-center my-3">
                    <button className="btn btn-primary" onClick={handleJoin}>
                        {context.getText().joinTeam}
                    </button>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
