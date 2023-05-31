import axios from "axios";
import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import LogoTemplate from "../templates/LogoTemplate";
import User from "../models/User";
import useRouterContext from "../utils/RouterContext";
import notify from "../utils/notify";
import { capitalizeFirstLetter } from "../utils/simpleFunctions";

export default function Login() {
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const context = useRouterContext();

    function handleSubmit(event: React.ChangeEvent<any>) {
        event.preventDefault(); // Prevent page reload
        console.log("login");
        const login = async () => {
            try {
                let res = await axios.post(`${context.apiUrl}/users/login/`, {
                    email: email.current?.value,
                    password: password.current?.value,
                });
                console.log(res);
                context.setUser(res.data.user);
                context.setToken(res.data.token);
                context.setPage("news");
                console.log(context);
            } catch (err) {
                notify(
                    "Login failed",
                    "ERROR",
                    "user or password are incorrect"
                );
                console.log(err);
            }
        };
        login();
    }
    return (
        <LogoTemplate>
            <Form>
                <Form.Group
                    className="mb-4 mt-3 px-5"
                    controlId="formBasicEmail"
                >
                    <Form.Label>
                        {capitalizeFirstLetter(context.getText().email)}
                    </Form.Label>
                    <Form.Control
                        ref={email}
                        type="email"
                        placeholder={context.getText().emailExample}
                    />
                </Form.Group>
                <Form.Group
                    className="mb-4 mt-5 px-5"
                    controlId="formBasicPassword"
                >
                    <Form.Label>
                        {capitalizeFirstLetter(context.getText().password)}
                    </Form.Label>
                    <Form.Control
                        ref={password}
                        type="password"
                        placeholder="****"
                        autoComplete="off"
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3 mx-3 px-5"
                    controlId="formBasicCheckbox"
                >
                    <Form.Check type="checkbox" label={context.getText().keepAccount} />
                </Form.Group>
                <div className="mt-5 d-flex flex-column align-items-center">
                    <Button
                        variant="primary"
                        className="mb-2"
                        onClick={handleSubmit}
                    >
                        {capitalizeFirstLetter(context.getText().login)}
                    </Button>
                    <p className="text-muted mt-2">
                        {context.getText().notRegistered}
                        <span
                            role="button"
                            className="text-decoration-underline ms-2"
                            onClick={() => context.setPage("register")}
                        >
                            {capitalizeFirstLetter(context.getText().register)}
                        </span>
                    </p>
                </div>
            </Form>
        </LogoTemplate>
    );
}
