import LabelInfo from "../components/common/LabelInfo";
import { Team } from "../models/Team";
import NavBarTemplate from "../templates/NavBarTemplate";
import { ICONS_SPORTS } from "../utils/Icons";
import useRouterContext from "../utils/RouterContext";

export default function () {
    const context = useRouterContext();
    // const team: Team | null = context.cache;
    // let image_url = "", name = "", captain = "", players:string[] = [];
    // if (team !== null) {
    //     image_url = team.image_url;
    //     name = team.name;
    //     captain = team.captain;
    //     players = team.players;
    // }
    return (
        <NavBarTemplate info="activities" parentPage="activities" page="viewActivity">
            <div className="d-flex justify-content-center align-items-center my-4">
                <svg className={"me-2 text-primary"} style={{ height: "80px", width: "80px" }}>{ICONS_SPORTS.basketball}</svg>
                <div className="d-flex flex-column align-items-center mx-2">
                    <div className="fw-bold">{"nombre de la actividad"}</div>
                    <div className="fw-light">creador por {"nombre del creador"}</div>
                </div>
                <div className="mx-2">
                    <div className="w-100 text-center mb-2">{"lugar"}</div>
                    <button
                        type="button"
                        className="btn btn-primary px-4 mb-2"
                        style={{ width: "fit-content" }}
                        onClick={() => { console.log("TODO!! inscribir a equipo") }}
                    >{context.getText().join}</button>
                </div>
                <div>
                    <>la fecha to wapa del figma</>
                </div>
            </div>
            <div>
                <LabelInfo label="Numero de equipos 2/2" className="text-primary">
                    {"equipo1 local"}
                </LabelInfo>
                <LabelInfo>
                    {"equipo2 visitante"}
                </LabelInfo>
                {/* {players.sort().map((player, index) => <LabelInfo key={index}>{player}</LabelInfo>)} */}
            </div>
        </NavBarTemplate>
    );
}