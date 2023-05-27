import { useContext, useEffect, useState } from "react";
import NavBarTemplate from "../templates/NavBarTemplate";
import JoinTeamItemRow from "../components/common/JoinTeamItemRow";
import axios from "axios";
import { CONTEXT } from "../utils/Context";
import { Team } from "../models/Team";
import handleResponse from "../utils/handleResponse";

export default function OpenTeams() {
    const [teams, setTeams] = useState<Team[]>([]);
    const context = useContext(CONTEXT);
    const axiosInstance = axios.create({
        baseURL: window.location.origin,
    });
    axiosInstance.interceptors.request.use((config) => {
        const apiURL = config.headers['X-API-URL'];
        config.baseURL = apiURL ? apiURL : config.baseURL;
        return config;
    });
    useEffect(() => {
        const getAllTeams = async () => {
            try {
                const response = await axiosInstance.get(`${context.apiUrl}/user_team/`);
                console.log(response);
                const teams: Team[] | null = handleResponse(response);
                if (teams !== null) {
                    setTeams(teams);
                }
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