import axios from "axios";
import { useContext, useRef, useState } from "react";
import { CONTEXT } from "../utils/Context";
// import { DEGREES, HOURS } from "../models/Options";
import AutoComplete from "../components/inputs/AutoComplete";
import GetIcon from "../components/inputs/GetIcon";
import useRouterContext from "../utils/RouterContext";
import User from "../models/User";
import notify from "../utils/notify";
import {
    capitalizeFirstLetter,
    getNameAndSurname,
} from "../utils/simpleFunctions";

export default function PersonalInfo() {
    const context = useRouterContext(); //useContext(CONTEXT);
    let user: User = context.user!;
    if (!user) {
        context.setPage("news");
        return;
    }
    const [iconFile, setIconFile] = useState<File | undefined>(undefined);
    const [name, setName] = useState(user.name!);
    const [surname, setSurname] = useState(user.surname!);
    const [nick, setNick] = useState(user.nick);
    const [email, setEmail] = useState(user.email);
    const [psw1, setPsw1] = useState("");
    const [psw2, setPsw2] = useState("");

    const handleIcon = async (file: File) => {
        console.log(file);
        setIconFile(file);
    };

    const handleUpdate = async () => {
        try {
            var icon: string | undefined = undefined;
            const changes: any = {
                name,
                surname,
                nick,
            };
            if (psw1.length >= 8 && psw1 === psw2) {
                changes.password = psw1;
                notify(
                    "Password",
                    "updated",
                    "The password was successfully updated"
                );
            }
            if (iconFile) {
                try {
                    const formData = new FormData();
                    formData.append("file", iconFile);
                    const res = await axios.post(
                        `${context.apiUrl}/storages`,
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );
                    console.log(res);
                    icon = res.data.url;
                } catch (err) {
                    console.log(err);
                    notify("ERROR", "icon", "The icon could not be updated");
                }
            }
            if (icon) {
                changes.icon = icon;
            }
            const response = await axios.put(
                `${context.apiUrl}/users/${user._id}`,
                changes,
                {
                    headers: {
                        Authorization: await context.token?.token,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response);
            if (response.data.acknowledged) {
                context.setUser({ ...user, ...changes });
                notify("Updated!!","","Your requested changes have been updated successfully.");
                setTimeout(()=>window.history.back(), 1000);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            <div className="my-5 d-flex justify-content-center">
                <GetIcon src={user.icon} onChange={handleIcon} />
            </div>
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
                            psw2.length >= 8 && psw2 === psw1 ? "is-valid" : ""
                        }`}
                        placeholder="****"
                    />
                </div>
            </div>
            <div className="my-5 d-flex flex-column align-items-center">
                <button
                    type="button"
                    className="btn btn-primary px-4 mb-2"
                    style={{ width: "fit-content" }}
                    onClick={handleUpdate}
                >
                    {context.getText().updateChanges}
                </button>
            </div>
        </div>
    );
}
