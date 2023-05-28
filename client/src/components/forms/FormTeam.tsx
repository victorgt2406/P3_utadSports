import axios from "axios";
import { useEffect } from "react";
import useRouterContext from "../../utils/RouterContext";
import User from "../../models/User";
import { Sport } from "../../models/Options";
import AutoComplete from "../inputs/AutoComplete";
import AutoCompleteAdder from "../inputs/AutoCompleteAdder";
import GetIcon from "../inputs/GetIcon";
import SportsButtons from "../inputs/SportsButtons";
import notify from "../../utils/notify";

type MyProps = {
    name: string;
    setName: (name:string)=>void;
    description: string;
    setDescription: (name:string)=>void;
    max: string;
    setMax: (max:string)=>void;
    captain: string;
    users:User[];
    setUsers: (users: User[])=>void;
    setCaptain: (captain: string) => void;
    nick: string;
    setNick: (nick: string) => void;
    nickPlayers: string[];
    setNickPlayers: (players: string[]) => void;
    sport: Sport;
    setSport: (sport: Sport) => void;
    handleSubmit: ()=>void;
};

export default function ({
    name,
    setName,
    description,
    setDescription,
    max,
    setMax,
    users,
    setUsers,
    captain,
    setCaptain,
    nick,
    setNick,
    nickPlayers,
    setNickPlayers,
    sport,
    setSport,
    handleSubmit
}: MyProps) {
    const context = useRouterContext();

    useEffect(() => {
        const getUsers = async () => {
            // get all users
            try {
                if(context.token){
                    const res = await axios.get(`${context.apiUrl}/users/`, {
                        headers: {
                            Authorization: await context.token.token,
                            "Content-Type": "application/json",
                        },
                    });
                    const users = res.data;
                    console.log(users);
                    setUsers(
                        users.filter(
                            (user: User) => user.nick !== context.user?.nick
                        )
                    );
                }else{
                    notify("Not logged","notification","Please, you need to login in this form");
                    context.setPage("login");
                }
                
            } catch (err) {
                console.log(err);
            }
        };
        getUsers();
    }, []);
    return (
        <>
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
                            // ref={name}
                            onChange={(event: React.ChangeEvent<any>) => {
                                setName(event.target.value);
                            }}
                            value={name}
                            type="text"
                            className="form-control light-blue my-3"
                            placeholder={context.getText().teamName}
                        />
                        <AutoCompleteAdder
                            {...{
                                className: "my-3",
                                value: nick,
                                setValue: setNick,
                                values: nickPlayers,
                                setValues: setNickPlayers,
                                array: users.map((user) => user.nick),
                                placeholder: context.getText().teamPlayers,
                                filter: true,
                            }}
                        />
                        <AutoComplete
                            {...{
                                className: "my-3",
                                value: captain,
                                setValue: setCaptain,
                                placeholder: context.getText().captain,
                                array: [...nickPlayers, context.user?.nick!],
                            }}
                        />
                    </div>
                </div>
                <div>
                    <div>Deportes en los que compite el equipo</div>
                    <SportsButtons {...{ sport, setSport }} />
                </div>
                <input
                    onChange={(event: React.ChangeEvent<any>) => {
                        setDescription(event.target.value);
                    }}
                    value={description}
                    type="text"
                    className="form-control light-blue my-2 mt-1"
                    placeholder={context.getText().description}
                />
                <input
                    onChange={(event: React.ChangeEvent<any>) => {
                        setMax(event.target.value);
                    }}
                    value={max.toString()}
                    type="number"
                    className="form-control light-blue my-2"
                    placeholder={context.getText().maxPlayers}
                />
                <div className="my-5 d-flex justify-content-center">
                    <button
                        type="button"
                        className="btn btn-primary px-4"
                        onClick={handleSubmit}
                    >
                        Crear Equipo
                    </button>
                </div>
            </div>
        </>
    );
}
