import cup from "../assets/icons/copa torneo.svg"
import football from "../assets/icons/Soccer Ball-1.svg"
import Calendar from "../components/Calendar2"
import AutoComplete from '../components/inputs/AutoComplete';
import {HOURS,PISTA} from "../models/Options"
import { CONTEXT } from '../utils/Context';
import { Team } from "../models/Team";
import axios from "axios";
import JoinTeamItemRow from "../components/common/JoinTeamItemRow";
import OpenTeams from "./OpenTeams";
import { Container, Form } from 'react-bootstrap'
import WebFont from 'webfontloader'

import NavBarTemplate from '../templates/NavBarTemplate';


import { SetStateAction, useContext, useEffect, useRef, useState } from 'react';


export default function joinTournament(){
    const [teams, setTeams] = useState<Team[]>([]);
    const [pista, setPista] = useState<string>("");//Localizacion
    const [selectedHour, setSelectedHour] = useState<number | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    //Equipo,Horario,Localizacion
    const context = useContext(CONTEXT);
    const [sport, setSport] = useState<string>("");//Deporte
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


    useEffect(() => {
        WebFont.load({
          google: {
            families: ['Poppins']
          }
        });
        const getAllTeams = async () => {
            let loaded = false;
            try {
                const teams: Team[] = (await axiosInstance.get(`${context.apiUrl}/team`)).data;
                setTeams(teams);
                console.log(teams);
                loaded = true;
            }
            catch (err) {
                console.log(err);
            }
        };
        getAllTeams();
       }, []);


    const teamsComponents = teams.filter((team) => team.open).map((team, index) => {
        return <JoinTeamItemRow team={team} white={index % 2 == 0} key={team._id}></JoinTeamItemRow>
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

    return (
        <Container>
            <Form style={{fontFamily:'Poppins'}}>
                <div>
                    <h2>Inscripcion a "nombre_torneo" como "tu nombre"</h2>
                    <div className="d-flex justify-content-center align-items-center m-2">
                        <img src={cup}></img>
                        <img src={football}></img>
                    </div>  
                    <div className="m-5">
                        <p>Equipos que van a participar en el torneo</p>
                        {teamsComponents}
                    </div>
                    
                    <div className="m-5">
                        <h2> Localizacion del torneo</h2>
                        <AutoComplete placeholder={"Localizacion del torneo"} array={PISTA} value={""} setValue={function (value: string): void {
                            throw new Error("Function not implemented.");
                        } }/>
                    </div>
                    <div>
                        <p>*La inscripción al torneo acaba 24h antes de que este empiece. Cuando acabe la inscripción se asignarán las plazas por orden de inscripición. Los primeros se asignarán a los equipos con plazas abiertas y si hay mas personas se crearán nuevos equipos con estos.</p>
                        <p>*Si se llega al limite de plazas y equipos definido en el primer campo no podrás participar. Se te avisara por correo si esto sucede.</p>

                    </div>
                    <br></br>
                    <div className="mt-5 d-flex justify-content-center mb-3">
                        <button type="button" className="btn btn-primary px-4" onClick={handleClick} style={{borderRadius: '7px'} }>Inscribirse</button>
                    </div>
                </div>  
            </Form>
        </Container>
       

    );

}