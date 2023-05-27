import NavHeader from "./NavHeader";
import NavFooterLinks from "./NavFooterLinks";
import NavFooterInfo from "./NavFooterInfo";
import { Page } from "../../routes";

function NavBar({info}:{info?:Page}){
    const footerComponent:JSX.Element = (info===undefined)?<NavFooterLinks/>:<NavFooterInfo info={info}/>;
    return (
        <div className="bg-body blur-background" style={{position: "sticky", top: "0", zIndex: "100"}}>
            <NavHeader/>
            {footerComponent}
        </div>
    );
}

export default NavBar;