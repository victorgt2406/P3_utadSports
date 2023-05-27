import axios from 'axios';
import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LogoTemplate from '../templates/LogoTemplate';
import User from '../models/User';
import useRouterContext from '../utils/RouterContext';

export default function Login() {
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const context = useRouterContext();

    function handleSubmit(event: React.ChangeEvent<any>) {
        event.preventDefault(); // Prevent page reload
        // email:"henan31978@terkoer.com",
        // password:"Me_gustan_las_magdalenas"       
        (async () => {
            try {
                let login = await axios.post(`${context.apiUrl}/user/login/`, {
                    email: email.current?.value,
                    password: password.current?.value
                });
                console.log(login);
                let data = login.data;
                data.icon= "https://img.freepik.com/premium-photo/natural-real-person-portrait-closeup-woman-girl-female-outside-nature-forest-artistic-edgy-cute-pretty-face-ai-generated_590464-133625.jpg?w=2000"
                context.setUser(data as User);
                context.setPage("activities");
            }
            catch (err){
                console.log(err);
            }
        })();

    }
    return (
        <div className='mt-5'>
            <br></br>
            <br></br>
        <LogoTemplate>
        <br></br>
        <br></br>
            <Form>
                <Form.Group className="mb-4 mt-5 px-5" controlId="formBasicEmail">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control ref={email} type="email" placeholder="Campo a rellenar" />
                </Form.Group>
                <Form.Group className="mb-4 mt-5 px-5" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control ref={password} type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3 mx-3 px-5" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Mantener cuenta" />
                </Form.Group>
                <div className="mt-5 d-flex flex-column align-items-center">
                    <Button variant="primary" className='mb-2' onClick={handleSubmit} >
                        Iniciar sesion
                    </Button>
                    <p className="text-muted mt-2">
                        ¿No estas registrado?
                        <span
                            role="button"
                            className="text-decoration-underline ms-2"
                            onClick={() => context.setPage("register")}
                        >Registrate</span>
                    </p>
                </div>
            </Form>
        </LogoTemplate>
        </div>
    );
}