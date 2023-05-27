import NavBarTemplate from "../templates/NavBarTemplate";
import SingleTeam from "../components/common/TeamInfo";



export default function () {
    return (
        <NavBarTemplate info="teams" parentPage="teams" page="viewTeam">
            <SingleTeam/>
        </NavBarTemplate>
    );
}