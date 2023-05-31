import { useContext } from "react"
import { CONTEXT } from "../../utils/Context"

export default function LoggedPopOver(){
    const context = useContext(CONTEXT);
    return (
    <div>
        {/* <div>{context.user?.nickname}</div>
        <div>{context.user?._id}</div>
        <div>{context.user?.token}</div> */}
    </div>
    );
}