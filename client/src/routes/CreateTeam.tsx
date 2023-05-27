import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import { Degree, Sport, TIMETABLE } from "../models/Options";
import AutoComplete from "../components/inputs/AutoComplete";
import GetIcon from "../components/inputs/GetIcon";
import NavBarTemplate from "../templates/NavBarTemplate";
import SportsButtons from "../components/inputs/SportsButtons";
import AutoCompleteAdder from "../components/inputs/AutoCompleteAdder";
import useRouterContext from "../utils/RouterContext";

type User = {
    name: string;
    surname: string;
    email: string;
    id_user: number;
    degree: Degree;

}

export default function CreateTeam() {
    const context = useRouterContext();

    const name = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLInputElement>(null);
    const maxMembers = useRef<HTMLInputElement>(null);
    const [captain, setCaptain] = useState<string>("");
    const [member, setMember] = useState<string>("");
    const [members, setMembers] = useState<string[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const [imageExists, setImageExists] = useState<boolean>(false);
    const [sport, setSport] = useState<Sport>("" as Sport);
    const [timeTable, setTimeTable] = useState<string>("");

    useEffect(() => {
        const getUsers = async () => {
            const users = (await axios.post(`${context.apiUrl}/user/email`, { "name": member })).data as User[];
            console.log(users);
            setUsers(users);
        }
        getUsers();
    }, [member]);

    let image = <></>;
    if (imageExists) {
        image = <img src="..." alt="team logo" />
    }

    const handleClick = async () => {
        var team;
        try {
            // esto es un ñapa
            const captainData: User = (users.filter((user) => user.name === captain))[0];
            const teamToCreate = {
                "name": name.current?.value,
                "sport": sport,
                "description": description.current?.value,
                "time_table": timeTable,
                "id_creator": context.user?._id,
                "id_captain": captainData.id_user,
                "max_members": maxMembers.current?.value,
                "open": true
            }
            console.log(teamToCreate);

            // POST http://localhost:3000/user_team/ HTTP/1.1
            // Content - Type: application / json

            // {
            //     "id_team": 23,
            //         "id_user": 37
            // }


            // try{
            //     await axios.post(`${context.apiUrl}/user_team/`, { id_team: 1, id_user: 1 });
            // }
            // catch(err){
            //     console.log("ERROR WHEN JOINNIG TEAM",err);
            // }

            
            // team = (await axios.post(`${context.apiUrl}/team`, {
            //     "name": name.current?.value,
            //     "sport": sport,
            //     "description": description.current?.value,
            //     "time_table": timeTable,
            //     "id_creator": context.user?._id,
            //     "id_captain": context.user?._id,
            //     "max_members": 2,
            //     "open": true
            // }, {
            //     headers: {
            //         Authorization: context.user?.token,
            //         "Content-Type": "application/json"
            //     }
            // })).data;
        }
        catch (err: any) {
            console.log(err);
        }
        console.log(team);
    };

    return (
        <NavBarTemplate page="createTeam" parentPage="teams" info="createTeam" container={true}>
            <div className="d-flex flex-column justify-content-center">
                <div className="d-flex flex-wrap justify-content-center">
                    <div className="col-sm-4 col d-flex justify-content-center align-items-center">
                        <GetIcon />
                    </div>
                    <div className="col-sm-8 col d-flex flex-column" style={{ height: "100%" }}>
                        <input ref={name} type="text" className="form-control light-blue my-3" placeholder="Nombre del equipo" />
                        <AutoCompleteAdder {...{
                            className: "my-3",
                            value: member,
                            setValue: setMember,
                            values: members,
                            setValues: setMembers,
                            array: users.map((user) => user.name),
                            placeholder: "Miembros del equipo",
                            filter: false
                        }} />
                        {/* <input type="text" className="form-control light-blue my-3" placeholder="Miembros del equipo" /> */}
                        <AutoComplete {...{
                            className: "my-3",
                            value: captain,
                            setValue: setCaptain,
                            placeholder: "Seleccionar lider del equipo",
                            array: members
                        }} />
                        {/* <input type="text" className="form-control light-blue my-3" placeholder="Seleccionar lider del equipo" /> */}
                    </div>
                </div>
                <div>
                    <div>Deportes en los que compite el equipo</div>
                    <SportsButtons {...{ sport, setSport }} />
                </div>
                <input ref={description} type="text" className="form-control light-blue my-2 mt-1" placeholder="Descripcion" />
                <input ref={maxMembers} type="number" className="form-control light-blue my-2" placeholder="Máximo número de miembros" />
                <AutoComplete className="my-2" placeholder={"Horario"} value={timeTable} setValue={setTimeTable} array={TIMETABLE} />
                <div className="my-5 d-flex justify-content-center">
                    <button type="button" className="btn btn-primary px-4" onClick={handleClick}>Crear Equipo</button>
                </div>
            </div>
        </NavBarTemplate>
    );
}