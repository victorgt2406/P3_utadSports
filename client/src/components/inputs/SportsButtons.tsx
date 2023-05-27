import { Sport } from "../../models/Options";
import { ICONS_SPORTS } from "../../utils/Icons";

type MyProps = { sport: Sport, setSport: (sport: Sport) => void }

export default function ({ sport, setSport}: MyProps) {
    return (
        <div className="d-flex flex-wrap justify-content-center my-3">
            <button
                type="button"
                className={`col me-2 btn ${sport === "padel" ? "btn-primary" : "btn-light-blue"} fs-3 p-1`}
                style={{ height: "40x", display: "flex", alignItems: "center", justifyContent: "center" }}
                onClick={() => setSport("padel")}
            >{ICONS_SPORTS["padel"]}</button>
            <button
                type="button"
                className={`col mx-2 btn ${sport === "basketball" ? "btn-primary" : "btn-light-blue"} fs-3 p-1`}
                style={{ height: "40x", display: "flex", alignItems: "center", justifyContent: "center" }}
                onClick={() => setSport("basketball")}
            >{ICONS_SPORTS["basketball"]}</button>
            <button
                type="button"
                className={`col ms-2 btn ${sport === "football" ? "btn-primary" : "btn-light-blue"} fs-3 p-1`}
                style={{ height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}
                onClick={() => setSport("football")}
            >{ICONS_SPORTS["football"]}</button>
        </div>
    );
}