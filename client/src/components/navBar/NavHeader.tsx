import NavOffCanvas from "./NavOffCanvas";
import utadImg from "../../assets/pictures/LOGO_U-SPORTS.svg"
import UserBox from "./UserBox";
import useRouterContext from "../../utils/RouterContext";


export default function NavHeader() {
    const context = useRouterContext();
    return (
        <div className="d-flex justify-content-between align-items-center">
            <div className="col d-flex justify-content-start ms-2"><NavOffCanvas /></div>
            <div className="col d-flex justify-content-center">
                <img
                    role="button"
                    src={utadImg}
                    className="nav-header-img"
                    // style={{
                    //     height: "40px",
                    // }}
                    onClick={() => context.setPage("news")}
                />
            </div>
            <div className="col d-flex justify-content-end me-2"><UserBox /></div>
        </div>
    );
}
