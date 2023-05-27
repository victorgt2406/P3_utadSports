import { AxiosResponse } from "axios";

function handleResponse(axios:AxiosResponse){
    return (axios.status === 200)?axios.data:null
}

export default handleResponse