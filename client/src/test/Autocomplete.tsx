import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import AutoComplete from "../components/inputs/AutoComplete";
import { CONTEXT } from '../utils/Context';

function App() {
    const context = useContext(CONTEXT);
    const [value, setValue] = useState("");
    const [array, setArray] = useState([]);
    
    useEffect(()=>{
        console.log("loading new names");
        (async () => {
            let users = (await (axios.post(`${context.apiUrl}/user/email/`, {
                name: value
            }))).data;
            console.log(users);
            users = users.map((user: {[key:string]:string})=>`${user.name} ${user.surname}`);
            setArray(users);
        })();
    },[value]);
    return (
        <>
            <AutoComplete placeholder={'cosas'} array={array} value={value} setValue={setValue} />
        </>
    )
}

export default App;