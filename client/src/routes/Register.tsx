import { useRef, useState } from "react";
import AutoComplete from "../components/inputs/AutoComplete";
import axios from "axios";
import LogoTemplate from "../templates/LogoTemplate";
import notify from "../utils/notify";
import useRouterContext from "../utils/RouterContext";



export default function Register() {
    const name = useRef<HTMLInputElement>(null);
    const surname = useRef<HTMLInputElement>(null);
    const nickname = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const psw1 = useRef<HTMLInputElement>(null);
    const psw2 = useRef<HTMLInputElement>(null);
    const [degree, setDegree] = useState<string>("");
    const [timeTable, setTimeTable] = useState<string>("");
    const context = useRouterContext();//useContext(CONTEXT);
    // const context = getContext();

    const handleRegister = () => {
        (async () => {
            try {
                const res = await axios.post(`${context.apiUrl}/users/register/`,
                    {
                        "name": name.current?.value,
                        "icon": "https://img.freepik.com/premium-photo/natural-real-person-portrait-closeup-woman-girl-female-outside-nature-forest-artistic-edgy-cute-pretty-face-ai-generated_590464-133625.jpg?w=2000",
                        "surname": surname.current?.value,
                        "email": email.current?.value,
                        "password": psw1.current?.value,
                        "nick": nickname.current?.value,
                    }

                );
                console.log(res);
                context.setUser(res.data.user);
                context.setToken(res.data.token.token);
                context.setPage("news");
            }
            catch (err) {
                console.log(err);
                notify("error","","password incorrect");
            }
        })();
    };

    return (
        <LogoTemplate>
            <>
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

                    {/* <div className="w-100"></div> */}

                    {/* <div className="col-sm m-3">
                        <label className="form-label"><i className="bi bi-book"></i> Grado</label>
                        <AutoComplete placeholder={"Grado"} select={true} value={degree} array={DEGREES} setValue={setDegree} />
                    </div>
                    <div className="col-sm m-3">
                        <label className="form-label"><i className="bi bi-calendar3-week"></i> Horario de clases</label>
                        <AutoComplete placeholder={"Horario de clases"} select={true} value={timeTable} array={TIMETABLE} setValue={setTimeTable} />
                    </div> */}
                </div>
                <div className="mt-5 d-flex flex-column align-items-center">
                    <button
                        type="button"
                        className="btn btn-primary px-4 mb-2"
                        style={{ width: "fit-content" }}
                        onClick={handleRegister}
                    >Registrarme</button>
                    <p className="text-muted">
                        ¿Ya estas registrado?
                        <span
                            role="button"
                            className="text-decoration-underline ms-2"
                            onClick={() => context.setPage("login")}
                        >Inicia sesion</span>
                    </p>
                </div>
            </>
        </LogoTemplate>
    );
}