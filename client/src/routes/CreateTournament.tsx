import WebFont from 'webfontloader'
import SoccerBall from "../assets/icons/Soccer Ball.svg";
import TennisBall from "../assets/icons/Racket.svg";
import BasketBall from "../assets/icons/Sports basketball.svg";
import { CONTEXT } from '../utils/Context';
import { SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import Checkbox from '../components/inputs/Checkbox';
import Calendar from '../components/Calendar2'
import axios from "axios";
import { Container,Form } from 'react-bootstrap';
import { Team } from "../models/Team";
import handleResponse from "../utils/handleResponse";
//    const [array,setArray] = useState<String[]>()
import JoinTeamItemRow from "../components/common/JoinTeamItemRow";
import AutoComplete from '../components/inputs/AutoComplete';

export default function CreateTournament() {
    const [sport, setSport] = useState<string>("");//Deporte
    const [isChecked, setIsChecked] = useState(false);
    const [selectedHour, setSelectedHour] = useState<number | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const context = useContext(CONTEXT);
    const nombreTorneo = useRef<HTMLInputElement>(null);//Descripcion
    const total_team = useRef<HTMLInputElement>(null);//equipos totales
    const [teams, setTeams] = useState<Team[]>([]);
    const [team, setTeam] = useState("");

    const [filter, setFilter] = useState("");
    const filters = ["Todas las actividades", "Mis actividades", "Actividades finalizadas"];

    const axiosInstance = axios.create({
        baseURL: window.location.origin,
      });
      axiosInstance.interceptors.request.use((config) => {
        const apiURL = config.headers['X-API-URL'];
        config.baseURL = apiURL ? apiURL : config.baseURL;
        return config;
      });
    
    useEffect(() => {
        WebFont.load({
          google: {
            families: ['Poppins']
          }
        });
        const getAllTeams = async () => {
            try {
                const response = await axiosInstance.get(`${context.apiUrl}/team`);
                console.log(response);
                const teams: Team[] | null = handleResponse(response);
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
        return <JoinTeamItemRow team={team} white={(index + 1) % 2 == 0} key={team.id_team}></JoinTeamItemRow>
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
    const handleCheckboxChange = (newChecked: boolean | ((prevState: boolean) => boolean)) => {
        setIsChecked(newChecked);
      };

    const handleSport = async (sport: String ) =>{
        setSport(sport.toString())
        const getSport = await axios.post(`${context.apiUrl}/team/team_name`,{
            "sport":{sport}
        },{
             headers: {
                 Authorization: context.user?.token,
                 "Content-Type": "application/json"
             }
         });
    }

      const handleClick = async() => {
        if (selectedHour !== null){
            const activity = await axios.post(`${context.apiUrl}/Tournament`,{
            "sport":{sport},
            "start_date": dateConverter(currentDate, selectedHour),
            "total_team":total_team.current?.value,
            "end_date": dateConverter(currentDate, selectedHour+1)
           
            
         },{
             headers: {
                 Authorization: context.user?.token,
                 "Content-Type": "application/json"
             }
         });
        }
    };
    
    return (
       
            <Container>
                <Form style={{fontFamily:'Poppins'}}>
                    <div className="d-flex flex-column justify-content-center container">
                        <p className="text-uppercase"><i role="button" className="bi bi-chevron-left me-2"></i> Crear torneo nuevo</p>
                        <div>
                            <br></br>
                            <div>Deporte del torneo:</div>
                            <div className='botonRaro'>
                                <div className="d-flex flex-wrap justify-content-center mb-3 ">
                                    <button
                                        type="button"
                                        className={`col me-2 btn  ${sport === "BALONCESTO" ? "btn-primary" : "btn-light-blue"} btn-sm`}
                                        onClick={() => handleSport("BALONCESTO")}
                                    ><img
                                    src={BasketBall}
                                    alt=""
                                /></button>
                                    <button
                                        type="button"
                                        className={`col btn ${sport === "PADEL" ? "btn-primary" : "btn-light-blue"} btn-sm`}
                                        onClick={() => handleSport("PADEL")}
                                    ><img
                                    src={TennisBall}
                                    alt=""
                                /></button>
                                    <button
                                        type="button"
                                        className={`col ms-2 btn ${sport === "FUTBOL" ? "btn-primary" : "btn-light-blue"} btn-sm`}
                                        onClick={() => handleSport("FUTBOL")}
                                    ><img
                                    src={SoccerBall}
                                    alt=""
                                /></button>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        
                        <div>
                            <p>Nombre del Equipo: </p>

                            <AutoComplete placeholder={"Equipos del torneo"} array={teams.map((value => value.name) )} value={team} setValue={setTeam}/>

                        </div>
                        <br></br>
                        <div className="col">
                            <label className="form-label">*Breve explicacion de esta modalidad</label>
                            <textarea  className="form-control" id="exampleFormControlTextarea1" rows={3} placeholder='Explicacion de dicha modalidad'></textarea>
                        </div>
                        <br></br>
                        <div className="col">
                            <label className="form-label">*Breve explicacion de este tipo de torneo</label>
                            <textarea  className="form-control" id="exampleFormControlTextarea1" rows={3} placeholder='Explicacion del torneo'></textarea>
                        </div>
                        <br></br>
                        <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
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
                        <div className="mt-5 d-flex justify-content-center">
                            <button type="button" className="btn btn-primary px-4" onClick={handleClick} style={{borderRadius: '7px'} }>Crear Torneo</button>
                        </div>
                    </div>
                </Form>
            </Container>
    );
}