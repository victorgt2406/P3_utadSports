import React, { useContext } from "react";
import { CONTEXT } from "../../utils/Context";
import { Page } from "../../routes";
import useRouterContext from "../../utils/RouterContext";
import LogOutIcon from '@mui/icons-material/PowerSettingsNew';


function UserOptionPage({ page, icon }: { page: Page, icon: JSX.Element }) {
    // const { getText, setPage } = useContext(CONTEXT);
    const { getText, setPage } = useRouterContext();
    return (
        <li role="button" className="list-group-item text-capitalize text-end profile-option" onClick={() => setPage(page)}>{getText()[page]} <span className="ms-2 text-secondary">{icon}</span></li>
    );
}

function UserLogOut() {
    const { setUser, getText } = useRouterContext();
    return (
        <li role="button" className="list-group-item text-capitalize text-end profile-option" onClick={() => setUser(null!)}>{getText().logOut} <span className="text-danger ms-2"><LogOutIcon/></span></li>
    );
}

export default function UserOptions() {

    const style: React.CSSProperties = {
        width: "220px",
    };

    return (
        <ul className="list-group" style={style}>
            <UserOptionPage page="personalInfo" icon={<i className="bi bi-info-circle"></i>} />
            <UserOptionPage page="myTeams" icon={<i className="bi bi-people-fill"></i>} />
            <UserOptionPage page="myEvents" icon={<i className="bi bi-calendar-event"></i>} />
            <UserOptionPage page="myHistory" icon={<i className="bi bi-clock-history"></i>} />
            <UserLogOut/>
        </ul>
    );
}