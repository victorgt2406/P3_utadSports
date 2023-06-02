import NavBarTemplate from "../templates/NavBarTemplate";
import TeamInfo from "../components/common/TeamInfo";



export default function () {
    
    return (
        <NavBarTemplate page="viewTeam" parentPage="teams">
            <TeamInfo/>
        </NavBarTemplate>
    );
}