import { useContext } from "react";
import { CONTEXT } from "../../utils/Context";
import UserIcon from "./UserIcon";
import useRouterContext from "../../utils/RouterContext";
import UserNotifications from "./UserNotifications";

function LoggedBox() {
    return (
        <>
        <div className="d-flex justify-content-center align-items-center">
            <UserNotifications/>
            <UserIcon />
        </div>
        </>
    );
}

function NotLoggedBox() {
    const context = useRouterContext();
    return (
        <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-warning me-2 text-nowrap m-1" onClick={() => { context.setPage("register") }}>{context.getText().register}</button>
            <button className="btn btn-primary text-nowrap m-1" onClick={() => { context.setPage("login") }}>{context.getText().login}</button>
        </div>
    );
}

export default function UserBox() {
    const context = useContext(CONTEXT);
    const logged = (context.user !== null);
    return (logged ?
        (<LoggedBox />)
        :
        (<NotLoggedBox />)
    );
}