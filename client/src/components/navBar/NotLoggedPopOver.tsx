import { Button } from "react-bootstrap";
import { useContext } from "react";
import { CONTEXT } from "../../utils/Context";
import UserOptions from "./UserOptions";
import Login from "../../routes/Login";

export default function NotLoggedPopOver(){
    const context = useContext(CONTEXT);

    return (
        <div className="d-flex flex-column">
            <div className="mb-2"><Login/></div>
            {/* <Button className="mb-2" size="sm" onClick={()=>handlePageChange(login)}>Login</Button> */}
            <Button variant="outline-primary" size="sm" onClick={()=>{context.setPage("register")}}>Register</Button>
            <UserOptions/>
        </div>
    );
}