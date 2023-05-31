import { useRef, useState } from "react";
import AutoComplete from "../components/inputs/AutoComplete";
import axios from "axios";
import LogoTemplate from "../templates/LogoTemplate";
import notify from "../utils/notify";
import useRouterContext from "../utils/RouterContext";
import {
    capitalizeFirstLetter,
    getNameAndSurname,
    validateEmail,
} from "../utils/simpleFunctions";

export default function Register() {
    // const name = useRef<HTMLInputElement>(null);
    // const surname = useRef<HTMLInputElement>(null);
    // const nickname = useRef<HTMLInputElement>(null);
    // const email = useRef<HTMLInputElement>(null);
    // const psw1 = useRef<HTMLInputElement>(null);
    // const psw2 = useRef<HTMLInputElement>(null);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [nick, setNick] = useState("");
    const [email, setEmail] = useState("");
    const [psw1, setPsw1] = useState("");
    const [psw2, setPsw2] = useState("");
    // const [degree, setDegree] = useState<string>("");
    // const [timeTable, setTimeTable] = useState<string>("");
    const context = useRouterContext(); //useContext(CONTEXT);
    // const context = getContext();

    const handleRegister = () => {
        (async () => {
            try {
                const res = await axios.post(
                    `${context.apiUrl}/users/register/`,
                    {
                        // name: name.current?.value,
                        // surname: surname.current?.value,
                        // email: email.current?.value,
                        name,
                        surname,
                        email,
                        // password: psw1.current?.value,
                        password: psw1,
                        // nick: nickname.current?.value,
                        nick,
                    }
                );
                console.log(res);
                context.setUser(res.data.user);
                context.setToken(res.data.token);
                context.setPage("news");
            } catch (err) {
                console.log(err);
                notify("error", "", "password incorrect");
            }
        })();
    };

    return (
        <LogoTemplate>
            <>
                <div className="d-flex flex-wrap justify-content-center">
                    <div className="col-sm m-3">
                        <label className="form-label">
                            <i className="bi bi-envelope"></i>{" "}
                            {capitalizeFirstLetter(context.getText().email)}
                        </label>
                        <input
                            onChange={(event: React.ChangeEvent<any>) => {
                                const value: string = event.target.value;
                                setEmail(event.target.value);
                                const nameSurname = getNameAndSurname(value);
                                if (nameSurname) {
                                    if (nameSurname.surname) {
                                        setSurname(
                                            capitalizeFirstLetter(
                                                nameSurname.surname
                                            )
                                        );
                                    }
                                    setName(
                                        capitalizeFirstLetter(nameSurname.name)
                                    );
                                }
                            }}
                            value={email}
                            type="text"
                            className={`form-control ${
                                getNameAndSurname(email) ? "is-valid" : ""
                            }`}
                            placeholder={context.getText().emailExample}
                        />
                    </div>
                    <div className="col-sm m-3">
                        <label className="form-label">
                            <i className="bi bi-at"></i>{" "}
                            {capitalizeFirstLetter(context.getText().nick)}
                        </label>
                        <input
                            // ref={nickname}
                            onChange={(event: React.ChangeEvent<any>) => {
                                setNick(event.target.value);
                            }}
                            value={nick}
                            type="text"
                            className={`form-control ${
                                nick.length > 3 ? "is-valid" : ""
                            }`}
                            placeholder="Leo"
                        />
                    </div>

                    <div className="w-100"></div>

                    <div className="col-sm m-3">
                        <label className="form-label">
                            <i className="bi bi-person-circle"></i>{" "}
                            {capitalizeFirstLetter(context.getText().name)}
                        </label>
                        <input
                            // ref={name}
                            onChange={(event: React.ChangeEvent<any>) => {
                                setName(event.target.value);
                            }}
                            value={name}
                            type="text"
                            className={`form-control ${
                                name.length > 3 ? "is-valid" : ""
                            }`}
                            placeholder="Leonardo"
                        />
                    </div>
                    <div className="col-sm m-3">
                        <label className="form-label">
                            <i className="bi bi-person-circle"></i>{" "}
                            {capitalizeFirstLetter(context.getText().surname)}
                        </label>
                        <input
                            // ref={surname}
                            onChange={(event: React.ChangeEvent<any>) => {
                                setSurname(event.target.value);
                            }}
                            value={surname}
                            type="text"
                            className={`form-control ${
                                surname.length > 3 ? "is-valid" : ""
                            }`}
                            placeholder="DiCaprio"
                        />
                    </div>

                    <div className="w-100"></div>

                    <div className="col-sm m-3">
                        <label className="form-label">
                            <i className="bi bi-key"></i>{" "}
                            {capitalizeFirstLetter(context.getText().password)}
                        </label>
                        <input
                            // ref={psw1}
                            onChange={(event: React.ChangeEvent<any>) => {
                                setPsw1(event.target.value);
                            }}
                            value={psw1}
                            type="password"
                            className={`form-control ${
                                psw1.length >= 8 ? "is-valid" : ""
                            }`}
                            placeholder="****"
                        />
                    </div>
                    <div className="col-sm m-3">
                        <label className="form-label">
                            <i className="bi bi-key"></i>{" "}
                            {capitalizeFirstLetter(
                                context.getText().repeatPassword
                            )}
                        </label>
                        <input
                            // ref={psw2}
                            onChange={(event: React.ChangeEvent<any>) => {
                                setPsw2(event.target.value);
                            }}
                            value={psw2}
                            type="password"
                            className={`form-control ${
                                (psw2.length >= 8 && psw2 === psw1) ? "is-valid" : ""
                            }`}
                            placeholder="****"
                        />
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
                    >
                        Registrarme
                    </button>
                    <p className="text-muted">
                        ¿Ya estas registrado?
                        <span
                            role="button"
                            className="text-decoration-underline ms-2"
                            onClick={() => context.setPage("login")}
                        >
                            Inicia sesion
                        </span>
                    </p>
                </div>
            </>
        </LogoTemplate>
    );
}
