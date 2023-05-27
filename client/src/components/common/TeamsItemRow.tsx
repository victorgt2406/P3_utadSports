import ItemRow, { ItemRowProps } from "./ItemRow";
import SoccerBall from "../../assets/icons/Soccer Ball.svg";
import TeamIcon from "../../assets/icons/Shield.svg"
import useRouterContext from "../../utils/RouterContext";
import { ICONS_SPORTS } from "../../utils/Icons";
import { Sport } from "../../models/Options";
import { Team } from "../../models/Team";

// type Team = {
//     name: string,
//     description: string,
//     max_members: number,
//     image_url: string,
//     total_members: number,
//     captain: string,
//     players: string[],
//     sport: Sport
// }

type MyProps = { team: Team, white: boolean };

export default function ({ team, white }: MyProps) {
    const context = useRouterContext();

    let name: string = "team";
    let description: string = "description";
    let leader: string = "captain";
    let members: string[] = [];
    let sport: Sport = "basketball";
    let membersString: string = "members...";
    let total: number = 0;
    let max: number = 0;

    const handleClick = async ()=>{
        await context.setCache(team);
        context.setPage("viewTeam");
    }

    try {
        name = team.name;
        description = team.description;
        leader = team.captain.nick;
        sport = team.sport;
        total = team.players!.length;
        max = team.max;
        members = team.players!.map((player)=>player.nick);
        membersString = members.sort().reduce((previusMembers, member) => `${previusMembers}, ${member}`, "");
    }
    catch {
        console.log("error loading Teams Item Row");
    }
    const left: JSX.Element = (
        <div className="d-flex flex-wrap">
            <div className="d-flex justify-content-between px-3 me-2 align-items-center">
                <svg className="text-primary" style={{ height: "60px", width: "60px" }}>{ICONS_SPORTS[sport]}</svg>
                <img src={team.icon} style={{ height: "50px", width: "50px", borderRadius: "40px" }}></img>
            </div>
            <div className="d-flex flex-column">
                <p className="fw-bold my-1 fs-5">{team.name}</p>
                <p className="fw-light text-secondary my-1">
                    <span className="text-primary fw-bold me-3">{leader}</span>
                    {membersString}
                </p>
            </div>

        </div>
    );
    const right: JSX.Element = (
        <>
            <div className="d-flex flex-column align-items-end justify-content-center">
                <div>{description}<span className="fw-bold ms-2">Description</span></div>
                <div>{total}/{max}<span className="fw-bold ms-2">Members</span></div>
            </div>

        </>
    );
    return (
        <ItemRow {...{ left, right, white, leftCol: 10 }} onClick={handleClick}/>
    );
}