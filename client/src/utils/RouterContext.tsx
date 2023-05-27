import { useContext } from "react";
import { CONTEXT, ContextInterface } from "./Context";
import { Page } from "../routes";
import { useNavigate } from "react-router-dom";

export default function useRouterContext():ContextInterface {
    const context = useContext(CONTEXT);
    const navigate = useNavigate();

    const setPage = (page: Page)=>{
        context.setPage(page);

        navigate(`/${page==="news"?"":page}`);
    }

    return {...context, setPage};
}