import TeamInfo from "../components/common/TeamInfo";
import NavBarTemplate from "../templates/NavBarTemplate";

export default function() {
    
    return (
        <NavBarTemplate page="joinTeam" parentPage="openTeams">
            <TeamInfo/>
        </NavBarTemplate>
    );
}