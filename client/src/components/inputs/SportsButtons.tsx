import { Sport } from "../../models/Options";
import { ICONS_SPORTS } from "../../utils/Icons";

type MyProps = { sport: Sport, setSport: (sport: Sport) => void }

export default function ({ sport, setSport}: MyProps) {
    return (
        <div className="d-flex flex-wrap justify-content-center my-3">
            <button
                type="button"
                className={`col me-2 btn ${sport === "PADEL" ? "btn-primary" : "btn-light-blue"} fs-3 p-1`}
                style={{ height: "40x", display: "flex", alignItems: "center", justifyContent: "center" }}
                onClick={() => setSport("PADEL")}
            >{ICONS_SPORTS["PADEL"]}</button>
            <button
                type="button"
                className={`col mx-2 btn ${sport === "BALONCESTO" ? "btn-primary" : "btn-light-blue"} fs-3 p-1`}
                style={{ height: "40x", display: "flex", alignItems: "center", justifyContent: "center" }}
                onClick={() => setSport("BALONCESTO")}
            >{ICONS_SPORTS["BALONCESTO"]}</button>
            <button
                type="button"
                className={`col ms-2 btn ${sport === "FUTBOL" ? "btn-primary" : "btn-light-blue"} fs-3 p-1`}
                style={{ height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}
                onClick={() => setSport("FUTBOL")}
            >{ICONS_SPORTS["FUTBOL"]}</button>
        </div>
    );
}