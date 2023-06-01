import NavBarTemplate from "../templates/NavBarTemplate";
import TeamInfo from "../components/common/TeamInfo";



export default function () {
    
    return (
        <NavBarTemplate page="joinTeam" parentPage="openTeams">
            <TeamInfo/>
        </NavBarTemplate>
    );
}