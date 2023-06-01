import TeamInfo from "../components/common/TeamInfo";
import NavBarTemplate from "../templates/NavBarTemplate";
import useRouterContext from "../utils/RouterContext";

export default function() {
    const context = useRouterContext();
    
    return (
        <NavBarTemplate page="joinTeam" parentPage="openTeams">
            <TeamInfo/>
            <button onClick={()=>{}}>{context.getText().joinTeam}</button>
        </NavBarTemplate>
    );
}