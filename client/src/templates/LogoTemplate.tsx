import React, { useContext } from "react";
import LogoUtad from "../assets/pictures/LOGO_U-SPORTS.svg";
import { CONTEXT } from "../utils/Context";
import getContext from "../utils/Cookies";
import useRouterContext from "../utils/RouterContext";
import ChangeLanguageButton from "../components/navBar/ChangeLanguageButton";

type MyProps = {
    children: React.ReactNode
}

export default function LogoTemplate({ children }: MyProps) {
    // const context = useContext(CONTEXT);
    const context = useRouterContext();
    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-end mt-2"><ChangeLanguageButton/></div>
                <div role="button" className="d-flex justify-content-center align-items-center my-5" onClick={()=>{
                    context.setPage("news");
                }}>
                    <img src={LogoUtad} style={{width:"70%"}}/>
                </div>
                {children}
            </div>
        </>
    );
}