import NavBarTemplate from "../templates/NavBarTemplate";
import img from "../assets/pictures/test2_21_9.jpg"
import { ICONS_BASIC, ICONS_NEWS } from "../utils/Icons";

function BigNew() {
    return (
        <div className="d-flex flex-column">
            <div style={{
                position: "relative"
            }}>
                <img src={img} className="w-100 rounded-md" />
                <button
                    type="button"
                    className="btn btn-primary px-4"
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        right: "30px"
                    }}
                >ver más</button>
            </div>
            <div className="d-flex justify-content-between align-items-center mx-2 mt-2">
                <div className="col-9 d-flex justify-content-start align-items-center">
                    <svg className="icon-lg me-3">{ICONS_NEWS.info}</svg>
                    <div className="d-flex flex-column">
                        <span className="text-uppercase fw-bold fs-5 mb-2">titular</span>
                        <span >new ...</span>
                    </div>
                </div>
                <div className="col-3 text-secondary d-flex flex-column align-items-end justify-content-center">
                    <span><svg className="icon-sm me-2">{ICONS_BASIC.calendar}</svg>date</span>
                    <span><svg className="icon-sm me-2">{ICONS_BASIC.location}</svg>location</span>
                </div>
            </div>
        </div>
    );
}

function New({ className = "" }: { className?: string }) {
    return (
        <div className={`d-flex flex-column ${className}`}>
            <img src={img} className="w-100 rounded-md" />
            <div className="d-flex justify-content-start align-items-center mt-2">
                <svg className="icon-md me-3">{ICONS_NEWS.info}</svg>
                <span className="text-uppercase fw-bold fs-5">titular</span>
            </div>
            <div className="mb-2 mt-1">mensaje</div>
            <div className="d-flex justify-content-between alig-items-center mt-2">
                <div className="text-secondary d-flex flex-column align-items-start justify-content-center">
                    <span><svg className="icon-sm me-2">{ICONS_BASIC.calendar}</svg>date</span>
                    <span><svg className="icon-sm me-2">{ICONS_BASIC.location}</svg>location</span>
                </div>
                <button
                    type="button"
                    className="btn btn-primary px-4"
                    style={{
                        height: "fit-content"
                    }}
                >ver más</button>
            </div>
        </div>
    );
}


export default function () {
    return (
        <NavBarTemplate>
            <div className="my-3 mx-4"><BigNew /></div>
            <div className="my-3 mx-4 d-flex"><New className="col m-4" /><New className="col m-4" /></div>
        </NavBarTemplate>
    );
}