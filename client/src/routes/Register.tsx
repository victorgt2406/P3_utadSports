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
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [nick, setNick] = useState("");
    const [email, setEmail] = useState("");
    const [psw1, setPsw1] = useState("");
    const [psw2, setPsw2] = useState("");
    const [viewData, setDataView] = useState(false);
    const [accept, setAccept] = useState(false);
    const context = useRouterContext(); //useContext(CONTEXT);

    const handleRegister = () => {
        (async () => {
            try {
                const res = await axios.post(
                    `${context.apiUrl}/users/register/`,
                    {
                        name,
                        surname,
                        email,
                        password: psw1,
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
                                psw2.length >= 8 && psw2 === psw1
                                    ? "is-valid"
                                    : ""
                            }`}
                            placeholder="****"
                        />
                    </div>
                </div>
                {viewData ? (
                    <p className="mt-3 card p-2">
                        U-TAD recoge datos de los usuarios para gestionar el uso
                        normal de la web y realizar análisis estadísticos. Se
                        garantizan los derechos de los usuarios sobre sus datos
                        (acceso, rectificación, supresión, oposición,
                        limitación, portabilidad, revocación del consentimiento)
                        y estos pueden ejercerse en dpo@u-tad.com. Los datos de
                        IP se conservan 12 meses y los de consultas hasta
                        resolver la solicitud, posteriormente durante 3 años.
                        Los menores de 14 años deben acceder bajo supervisión de
                        un adulto.
                    </p>
                ) : (
                    <></>
                )}
                <div className="mt-3 d-flex justify-content-center">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        onChange={()=>setAccept(!accept)}
                    />
                    <p
                        role="button"
                        className="text-decoration-underline ms-2"
                        onClick={() => setDataView(!viewData)}
                    >
                        {capitalizeFirstLetter(context.getText().dataProtection)}
                    </p>
                </div>
                <div className="my-5 d-flex flex-column align-items-center">
                    <button
                        type="button"
                        className="btn btn-primary px-4 mb-2"
                        style={{ width: "fit-content" }}
                        onClick={handleRegister}
                        disabled={!accept}
                    >
                        {context.getText().register}
                    </button>
                    <p className="text-muted">
                        {context.getText().yesRegistered}
                        <span
                            role="button"
                            className="text-decoration-underline ms-2"
                            onClick={() => context.setPage("login")}
                        >
                            {capitalizeFirstLetter(context.getText().login)}
                        </span>
                    </p>
                </div>
            </>
        </LogoTemplate>
    );
}
