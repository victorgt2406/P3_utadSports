import ItemRow from "./ItemRow";
import { Team } from "../../models/Team";
import useRouterContext from "../../utils/RouterContext";
import { ICONS_SPORTS } from "../../utils/Icons";
import User from "../../models/User";
type MyProps = { team: Team, white: boolean };

export default function JoinTeamItemRow({ team, white }: MyProps) {
    const context = useRouterContext();
    const {name, captain, players: members, sport, icon:image } = team;

    const handleClick = ()=>{
        console.log(team);
        context.setCache({...team});
        context.setPage("joinTeam");
    }
    let teamMembersString:string;
    try{
        teamMembersString = (members! as User[]).reduce((previusMembers:string, member:User)=>`${previusMembers}, ${member.nick}`, "");
    }
    catch{
        teamMembersString = "";
    }
    const style = {

    }
    const left: JSX.Element = (
        <div className="d-flex flex-wrap">
            <div className="d-flex justify-content-between px-3 me-2 align-items-center">
                <svg className="text-primary" style={{ height: "60px", width: "60px" }}>{ICONS_SPORTS[sport]}</svg>
                {/* <img src={SoccerBall}></img> */}
                <img src={image} style={{ height: "50px", width: "50px", borderRadius: "40px" }}></img>
            </div>
            <div className="d-flex flex-column">
                <p className="text-uppercase fw-bold my-1 fs-5">{name}</p>
                <p className="fw-light text-secondary my-1"><span className="text-primary fw-bold me-2">{captain.nick}</span>{teamMembersString}</p>
            </div>

        </div>
    );
    const peopleLeft = team.max - (team.players!.length+1)>=0?team.max - (team.players!.length+1):0;
    const right: JSX.Element = (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center">
                <p className="fw-light text-secondary my-1">{context.language === "es"?`Faltan ${peopleLeft} personas`:`${peopleLeft} people left`}</p>
                <button type="button" className="btn btn-sm btn-primary px-3 fs-5" onClick={handleClick}>{context.getText().join}</button>
            </div>

        </>
    );
    return (
        <ItemRow {...{ left, right, white, leftCol:10 }} />
    );
}