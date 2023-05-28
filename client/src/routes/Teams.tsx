import React, { useEffect, useState } from "react";
import NavBarTemplate from "../templates/NavBarTemplate";
import useRouterContext from "../utils/RouterContext";
import axios from "axios";
import TeamsItemRow from "../components/common/TeamsItemRow";
import notify from "../utils/notify";
import { Team } from "../models/Team";

export default function () {
    const context = useRouterContext();
    const [teams, setTeams] = useState<Team[]>([]);
    const filters = ["todos","futbol","baloncesto","padel"];
    const [filter, setFilter] = useState<string>("todos");

    useEffect(() => {
        const getTeams = async () => {
            try {
                const response = await axios.get(`${context.apiUrl}/teams/`);
                // console.log(response);
                setTeams(response.data);
            }
            catch(err) {
                console.log(err);
                notify("API ERROR", "teams", "error")
                setTeams([]);
            }
        }
        getTeams();
    }, []);
    var items:JSX.Element[];
    try{
        items = teams.map((team, index) => <TeamsItemRow key={index} team={team} white={(index + 1) % 2 == 0} />)
    }
    catch{
        console.log("error loading the teams");
        items = []
    }
    

    return (
        <NavBarTemplate info="teams" container={false} create="createTeam" {...{ filter, setFilter, filters }}>
            {items}
        </NavBarTemplate>
    );
}