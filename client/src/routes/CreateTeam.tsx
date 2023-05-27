import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import { Sport } from "../models/Options";
import AutoComplete from "../components/inputs/AutoComplete";
import GetIcon from "../components/inputs/GetIcon";
import NavBarTemplate from "../templates/NavBarTemplate";
import SportsButtons from "../components/inputs/SportsButtons";
import AutoCompleteAdder from "../components/inputs/AutoCompleteAdder";
import useRouterContext from "../utils/RouterContext";
import User from "../models/User";
import { Team } from "../models/Team";
import notify from "../utils/notify";

export default function CreateTeam() {
    const context = useRouterContext();
    const name = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLInputElement>(null);
    const maxPlayers = useRef<HTMLInputElement>(null);
    const [captain, setCaptain] = useState<string>("");
    const [nick, setNick] = useState<string>("");
    const [nickPlayers, setNickPlayers] = useState<string[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [imageExists, setImageExists] = useState<boolean>(false);
    const [sport, setSport] = useState<Sport>("" as Sport);
    const [timeTable, setTimeTable] = useState<string>("");

    useEffect(() => {
        const getUsers = async () => {
            // get all users
            try {
                const res = await axios.get(`${context.apiUrl}/users/`, {
                    headers: {
                        Authorization: await context.token,
                        "Content-Type": "application/json",
                    },
                });
                const users = res.data;
                console.log(users);
                setUsers(users.filter((user:User)=>user.nick !== context.user?.nick));
            } catch (err) {
                console.log(err);
            }
        };
        getUsers();
    }, []);

    let image = <></>;
    if (imageExists) {
        image = <img src="..." alt="team logo" />;
    }

    const handleClick = async () => {
        try {
            const teamToCreate: Team = {
                name: name.current?.value!,
                sport: sport,
                description: description.current?.value!,
                captain: users.find((user) => {
                    user.nick === captain;
                })!,
                players: nickPlayers.map(
                    (nick) => users.find((user) => user.nick === nick)!
                ),
                max: parseInt(maxPlayers.current?.value!),
                open: true,
                icon: "",
            };

            const res = await axios.post(context.apiUrl+"/teams", teamToCreate, {
                headers: {
                    Authorization: await context.token,
                    "Content-Type": "application/json",
                },
            });
            console.log(res.data);
            notify("Team created","notification",`${res.data.name} was succesfully created`);
        } catch (err: any) {
            console.log(err);
            notify("Ups...","error","The team can not have that name");
        }
    };

    return (
        <NavBarTemplate
            page="createTeam"
            parentPage="teams"
            info="createTeam"
            container={true}
        >
            <div className="d-flex flex-column justify-content-center">
                <div className="d-flex flex-wrap justify-content-center">
                    <div className="col-sm-4 col d-flex justify-content-center align-items-center">
                        <GetIcon />
                    </div>
                    <div
                        className="col-sm-8 col d-flex flex-column"
                        style={{ height: "100%" }}
                    >
                        <input
                            ref={name}
                            type="text"
                            className="form-control light-blue my-3"
                            placeholder="Nombre del equipo"
                        />
                        <AutoCompleteAdder
                            {...{
                                className: "my-3",
                                value: nick,
                                setValue: setNick,
                                values: nickPlayers,
                                setValues: setNickPlayers,
                                array: users.map((user) => user.nick),
                                placeholder: "Miembros del equipo",
                                filter: true,
                            }}
                        />
                        {/* <input type="text" className="form-control light-blue my-3" placeholder="Miembros del equipo" /> */}
                        <AutoComplete
                            {...{
                                className: "my-3",
                                value: captain,
                                setValue: setCaptain,
                                placeholder: "Seleccionar lider del equipo",
                                array: [...nickPlayers, context.user?.nick!],
                            }}
                        />
                        {/* <input type="text" className="form-control light-blue my-3" placeholder="Seleccionar lider del equipo" /> */}
                    </div>
                </div>
                <div>
                    <div>Deportes en los que compite el equipo</div>
                    <SportsButtons {...{ sport, setSport }} />
                </div>
                <input
                    ref={description}
                    type="text"
                    className="form-control light-blue my-2 mt-1"
                    placeholder="Descripcion"
                />
                <input
                    ref={maxPlayers}
                    type="number"
                    className="form-control light-blue my-2"
                    placeholder="Máximo número de miembros"
                />
                {/* <AutoComplete
                    className="my-2"
                    placeholder={"Horario"}
                    value={timeTable}
                    setValue={setTimeTable}
                    array={TIMETABLE}
                /> */}
                <div className="my-5 d-flex justify-content-center">
                    <button
                        type="button"
                        className="btn btn-primary px-4"
                        onClick={handleClick}
                    >
                        Crear Equipo
                    </button>
                </div>
            </div>
        </NavBarTemplate>
    );
}
