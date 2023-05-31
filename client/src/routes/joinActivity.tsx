import {useContext,useEffect,useState} from "react"
import { CONTEXT } from "../utils/Context";
import Flag from "../assets/icons/FlagFilled.svg"
import Football from "../assets/icons/Soccer Ball-1.svg";
import Calendar from '../components/Calendar2'
import Container from 'react-bootstrap/esm/Container';
import { Form } from 'react-bootstrap'
import WebFont from 'webfontloader'
import NavBarTemplate from "../templates/NavBarTemplate";
import AutoComplete from '../components/inputs/AutoComplete';
import axios from "axios";
import {PISTA} from "../models/Options"
import { Team } from "../models/Team";
import handleResponse from "../utils/handleResponse";
import JoinTeamItemRow from "../components/common/JoinTeamItemRow";

export default function inscriptionActivity(){
    const context = useContext(CONTEXT)
    const [imageExists, setImageExists] = useState<boolean>(false);
    const [pista, setPista] = useState<string>("");//Localizacion
    const [selectedHour, setSelectedHour] = useState<number | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [teams, setTeams] = useState<Team[]>([]);
    const axiosInstance = axios.create({
        baseURL: window.location.origin,
      });
      axiosInstance.interceptors.request.use((config) => {
        const apiURL = config.headers['X-API-URL'];
        config.baseURL = apiURL ? apiURL : config.baseURL;
        return config;
      });

    function dateConverter(date: Date, selectedHour: number | null): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
      
        if (selectedHour !== null && selectedHour >= 0 && selectedHour <= 23) {
          const hour = String(selectedHour).padStart(2, '0');
          return `${year}-${month}-${day} ${hour}:00:00`;
        }
      
        return `${year}-${month}-${day} 00:00:00`;
    }
    let image = <></>;
    if (imageExists) {
        image = <img src="..." alt="team logo" />
    }
    useEffect(() => {
        WebFont.load({
          google: {
            families: ['Poppins']
          }
        });
        const getAllTeams = async () => {
            try {
                const teams: Team[] | null = handleResponse(await axiosInstance.get(`${context.apiUrl}/team`));
                if (teams !== null) {
                    setTeams(teams);
                }
            }
            catch (err) {
                console.log(err);
            }
        };
        getAllTeams();
       }, []);
       
    const teamsComponents = teams.filter((team) => team.open).map((team, index) => {
        return <JoinTeamItemRow team={team} white={(index + 1) % 2 == 0} key={team._id}></JoinTeamItemRow>
    });
    const handleClick = async() => {
        if (selectedHour !== null){
            const activity = await axios.post(`${context.apiUrl}/team`,{
            "sport":"FUTBOL",
            //Equipos?
            //Total Jugadores?
            "total_users":  12 ,
            "localization": pista,
            "start_date": dateConverter(currentDate, selectedHour),
            "end_date": dateConverter(currentDate, selectedHour+1)
            

            

            },{
                headers: {
                    Authorization: context.token?.token,
                    "Content-Type": "application/json"
                }
            });
        }
    };
    return(
        
        <Container>
            <Form style={{fontFamily: 'Poppins'}}>
            <br></br>
                <div className="d-flex justify-content-center align-items-center m-2">
                        <img src={Flag} width = "50"></img>
                        <img src={Football}width = "50"></img>
                </div>  
                <br></br>
                <div>
                    <h2>Equipos que van a participar en la actividad</h2>
                    {teamsComponents}
                </div>
                <br></br>
                
                <div className="m-5">
                                <p>Horario del torneo</p>
                                <Calendar
                                    value={currentDate}
                                    sport={"FUTBOL"}
                                    selectedHour={selectedHour}
                                    onValueChange={setCurrentDate}
                                    onSelectedHourChange={setSelectedHour}
                                    calLang={context.language}
                                />
                    </div>
                <br></br>
                <div className="m-5">
                        <h2> Localizacion del torneo</h2>
                        <AutoComplete placeholder={"Localizacion del torneo"} array={PISTA} value={""} setValue={function (value: string): void {
                            throw new Error("Function not implemented.");
                        } }/>
                    </div>
                
                <br></br>
                <div className="m-5">
                    <p>*La inscripción al torneo acaba 24h antes de que este empiece. Cuando acabe la inscripción se asignarán las plazas por orden de inscripición. Los primeros se asignarán a los equipos con plazas abiertas y si hay mas personas se crearán nuevos equipos con estos.</p>
                    <p>*Si se llega al limite de plazas y equipos definido en el primer campo no podrás participar. Se te avisara por correo si esto sucede.</p>
                </div>
                <br></br>
                <div className="mt-5 d-flex justify-content-center mb-3">
                        <button type="button" className="btn btn-primary px-4" onClick={handleClick} style={{borderRadius: '7px'} }>Inscribirse</button>
                </div>
                    
            </Form>

        </Container>
        
    )
}