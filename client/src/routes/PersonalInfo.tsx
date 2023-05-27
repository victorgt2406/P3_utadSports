import axios from "axios";
import { useContext, useRef, useState } from "react";
import { CONTEXT } from "../utils/Context";
import { DEGREES, HOURS } from "../models/Options";
import AutoComplete from "../components/inputs/AutoComplete";
import GetIcon from "../components/inputs/GetIcon";


export default function PersonalInfo() {
    const name = useRef<HTMLInputElement>(null);
    const surname = useRef<HTMLInputElement>(null);
    const nickname = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const psw1 = useRef<HTMLInputElement>(null);
    const psw2 = useRef<HTMLInputElement>(null);
    const [degree, setDegree] = useState<string>("");
    const [timeTable, setTimeTable] = useState<string>("");
    const context = useContext(CONTEXT);

    const handleRegister = () => {
        (async () => {
            const user = await axios.post(`${context.apiUrl}/user/register/`,
                {
                    "name": name.current?.value,
                    "surname": surname.current?.value,
                    "email": email.current?.value,
                    "password": psw1.current?.value,
                    "nikname": nickname.current?.value,
                    "degree": degree,
                    "time_table": timeTable
                });
            console.log(user);

            setTimeout(async () => {
                let login = await axios.post(`${context.apiUrl}/user/login/`, {
                    email: email.current?.value,
                    password: psw1.current?.value
                });
                console.log(login);
                let data = login.data;
                try {
                    context.setUser(data);
                    context.setPage("start");
                }
                catch {
                    alert(data.msg);
                }
            }, 1000);
        })();
    };

    return (
        <div className="container">
            <div className="my-5 d-flex justify-content-center">
                <GetIcon/>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
                <div className="col-sm m-3">
                    <label className="form-label"><i className="bi bi-person-circle"></i> Nombre</label>
                    <input ref={name} type="text" className="form-control" placeholder="Nombre" />
                </div>
                <div className="col-sm m-3">
                    <label className="form-label"><i className="bi bi-person-circle"></i> Apellido</label>
                    <input ref={surname} type="text" className="form-control" placeholder="Apellido" />
                </div>

                <div className="w-100"></div>

                <div className="col-sm m-3">
                    <label className="form-label"><i className="bi bi-at"></i> Apodo</label>
                    <input ref={nickname} type="text" className="form-control" placeholder="Nickname" />
                </div>
                <div className="col-sm m-3">
                    <label className="form-label"><i className="bi bi-envelope"></i> Correo electronico</label>
                    <input ref={email} type="text" className="form-control" placeholder="Correo electronico" />
                </div>

                <div className="w-100"></div>

                <div className="col-sm m-3">
                    <label className="form-label"><i className="bi bi-key"></i> Contraseña (minimo 8 caracteres)</label>
                    <input ref={psw1} type="text" className="form-control" placeholder="Contraseña" />
                </div>
                <div className="col-sm m-3">
                    <label className="form-label"><i className="bi bi-key"></i> Repetir contraseña</label>
                    <input ref={psw2} type="text" className="form-control" placeholder="Repetir contraseña" />
                </div>

                <div className="w-100"></div>

                <div className="col-sm m-3">
                    <label className="form-label"><i className="bi bi-book"></i> Grado</label>
                    <AutoComplete placeholder={"Grado"} select={true} value={degree} array={DEGREES} setValue={setDegree} />
                </div>
                <div className="col-sm m-3">
                    <label className="form-label"><i className="bi bi-calendar3-week"></i> Horario de clases</label>
                    <AutoComplete placeholder={"Horario de clases"} select={true} value={timeTable} array={HOURS} setValue={setTimeTable} />
                </div>
            </div>
            <div className="my-5 d-flex flex-column align-items-center">
                <button
                    type="button"
                    className="btn btn-primary px-4 mb-2"
                    style={{ width: "fit-content" }}
                    onClick={handleRegister}
                >Guardar</button>
            </div>
        </div>
    );
}