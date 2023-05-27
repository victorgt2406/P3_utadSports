import React, { useContext } from "react";
import LogoUtad from "../assets/pictures/LOGO_U-SPORTS.svg";
import { CONTEXT } from "../utils/Context";
import getContext from "../utils/Cookies";
import useRouterContext from "../utils/RouterContext";

type MyProps = {
    children: React.ReactNode
}

export default function LogoTemplate({ children }: MyProps) {
    // const context = useContext(CONTEXT);
    const context = useRouterContext();
    return (
        <>
            <div className="container">
                <div role="button" className="d-flex justify-content-center align-items-center" onClick={()=>{
                    context.setPage("news");
                }}>
                    <img className="mt-5 mb-4" src={LogoUtad} style={{width:"55%"}}/>
                </div>
                {children}
            </div>
        </>
    );
}