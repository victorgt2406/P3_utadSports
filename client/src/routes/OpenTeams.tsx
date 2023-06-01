import { useContext, useEffect, useState } from "react";
import NavBarTemplate from "../templates/NavBarTemplate";
import JoinTeamItemRow from "../components/common/JoinTeamItemRow";
import axios from "axios";
import { CONTEXT } from "../utils/Context";
import { Team } from "../models/Team";
import handleResponse from "../utils/handleResponse";
import useRouterContext from "../utils/RouterContext";

export default function OpenTeams() {
    const [teams, setTeams] = useState<Team[]>([]);
    const context = useRouterContext();
    useEffect(() => {
        const getAllTeams = async () => {
            try {
                const response = await axios.get(`${context.apiUrl}/teams/`);
                console.log(response);
                setTeams(response.data);
            }
            catch (err) {
                console.log(err);
            }
        };
        getAllTeams();
    }, []);
    const teamsComponents = teams.filter((team) => team.open).map((team, index) => {
        return <JoinTeamItemRow team={team} white={(index + 1) % 2 == 0} key={index}></JoinTeamItemRow>
    });
    return (
        <NavBarTemplate container={false}>
            {teamsComponents}
        </NavBarTemplate>
    );
}