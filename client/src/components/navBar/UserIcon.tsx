import { useContext } from "react";
import { CONTEXT } from "../../utils/Context";
import PopOver from "../common/PopOver";
import UserOptions from "./UserOptions";
import useRouterContext from "../../utils/RouterContext";

export default function ProfileIcon() {
    const context = useRouterContext();
    const userIcon: JSX.Element = (context.user === null) ?
        (<i className="bi bi-person-fill"></i>)
        :
        (<img src={context.user.icon} alt="profile" className="nav-header-img" style={{
            borderRadius: "40px"
        }} />);
    return (
        <PopOver body={<div className="me-2"><UserOptions /></div>}>
            <div role="button" className="ms-2">
                {userIcon}
            </div>
        </PopOver>
    );
}