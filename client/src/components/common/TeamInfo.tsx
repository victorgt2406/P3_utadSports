import LabelInfo from "./LabelInfo";
import { Team } from "../../models/Team";
import { ICONS_SPORTS } from "../../utils/Icons";
import useRouterContext from "../../utils/RouterContext";
import { capitalizeFirstLetter } from "../../utils/simpleFunctions";
import User from "../../models/User";

export default function () {
    const context = useRouterContext();
    const team: Team | null = context.cache;
    let icon = "", name = "", captain = "", players: string[] = [];
    if (team !== null) {
        icon = team.icon;
        name = team.name;
        captain = team.captain.nick;
        players = (team.players! as User[])?.map((player)=>player.nick)!;
    }
    return (
        <>
            <div className="d-flex justify-content-center align-items-center my-4">
                <img src={icon} style={{ height: "70px", width: "70px", borderRadius: "40px" }} />
                <svg className={"ms-2 me-4 text-primary"} style={{ height: "80px", width: "80px" }}>{ICONS_SPORTS.basketball}</svg>
                <div className="d-flex flex-column align-items-center">
                    <div className="fw-bold">{name}</div>
                    <div className="fw-light">{capitalizeFirstLetter(context.getText().createdBy)} {captain}</div>
                </div>
            </div>
            <div>
                <LabelInfo label={context.getText().teamPlayers} className="text-primary">
                    {captain}
                </LabelInfo>
                {players.sort().map((player, index) => <LabelInfo key={index}>{player}</LabelInfo>)}
            </div>
            {context.cache.open?<button onClick={()=>{}}>{context.getText().joinTeam}</button>:<></>}
        </>
    );
}