import useRouterContext from "../../utils/RouterContext";
import Tooltip from "../common/Tolltip";

export default function () {
    const context = useRouterContext();
    return (
        <Tooltip msg={context.getText()[context.language]}>
            <button className="btn btn-dark" onClick={() => {
                if(context.language === "es"){
                    context.setLanguage('en');
                }
                else{
                    context.setLanguage('es');
                }
                
            }}>
                <i className="bi bi-translate"></i>
            </button>
        </Tooltip>
    );
}
