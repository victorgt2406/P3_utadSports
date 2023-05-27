import { useContext } from "react";
import { Page } from "../../routes";
import { CONTEXT } from "../../utils/Context";
import { ICONS_PAGE } from "../../utils/Icons";

type MyProps = { info: Page };

export default function NavFooterInfo({ info }: MyProps) {
    const context = useContext(CONTEXT);
    return (
        <div className="col d-flex flex-column justify-content-center align-items-center">
            <div className="fs-4">{ICONS_PAGE[info]}</div>
            <div
                className="nav-footer-info-item w-100 text-center text-uppercase text-wrap"
                style={{
                    fontSize: "16px"
                }}
                
            >{context.getText()[info]}</div>
        </div>
    );

}