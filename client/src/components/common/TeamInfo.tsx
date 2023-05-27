import LabelInfo from "./LabelInfo";
import { Team } from "../../models/Team";
import { ICONS_SPORTS } from "../../utils/Icons";
import useRouterContext from "../../utils/RouterContext";
import { capitalizeFirstLetter } from "../../utils/simpleFunctions";

export default function () {
    const context = useRouterContext();
    const team: Team | null = context.cache;
    let image_url = "", name = "", captain = "", players: string[] = [];
    if (team !== null) {
        image_url = team.image_url;
        name = team.name;
        captain = team.captain;
        players = team.players;
    }
    return (
        <>
            <div className="d-flex justify-content-center align-items-center my-4">
                <img src={image_url} style={{ height: "70px", width: "70px", borderRadius: "40px" }} />
                <svg className={"ms-2 me-4 text-primary"} style={{ height: "80px", width: "80px" }}>{ICONS_SPORTS.BALONCESTO}</svg>
                <div className="d-flex flex-column align-items-center">
                    <div className="fw-bold">{name}</div>
                    <div className="fw-light">{capitalizeFirstLetter(context.getText().createdBy)} {captain}</div>
                </div>
            </div>
            <div>
                <LabelInfo label={context.getText().teamMembers} className="text-primary">
                    {captain}
                </LabelInfo>
                {players.sort().map((player, index) => <LabelInfo key={index}>{player}</LabelInfo>)}
            </div>
        </>
    );
}