import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import NavBarTemplate from "../templates/NavBarTemplate";
import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import enUS from 'date-fns/locale/en-US';
import BalonBasket from "@mui/icons-material/SportsBasketballRounded";
import BalonFutbol from '@mui/icons-material/SportsSoccer';
import Raqueta from '@mui/icons-material/SportsTennis';
import Calendar from "@mui/icons-material/CalendarToday";
import axios from "axios";
import { CONTEXT } from '../utils/Context';
import { Team } from "../models/Team";
import ActivityFlag from '@mui/icons-material/Flag';

type Activity = {
  away: Team;
  _id: String,
  location: String;
  name: string,
  sport: string,
  home: Team,
  result: string,
  date: string
};

export default function ResultsActivity() {
  const { id } = useParams();
  const context = useContext(CONTEXT);
  const [resultados, setResultados] = useState<Activity>();


  const locale = context.language === 'en' ? enUS : { ...es, formatLong: es.formatLong };

  useEffect(() => {
    axios.get(`${context.apiUrl}/activities/${id}`)
      .then(response => {
        setResultados(response.data);
        console.log(response)
      })
      .catch(error => {
        console.log(error);
      });
  }, [id, context.apiUrl]);
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return format(date, context.language === 'en' ? 'EEEE, MMMM d, hh:mm a' : 'EEEE, d MMMM   HH:mm', { locale });
  }
  if (!resultados) {
    return;
  }
  return (
    <NavBarTemplate info="activities" parentPage="activities" page="ResultsActivity">
      <div className="resultados" style={{ marginTop: '5rem' }}>
        <div className="d-flex flex-column flex-wrap">
        </div>
        <div className="mx-5" style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            className="d-flex flex-column align-items-center me-4"
            style={{ justifyContent: 'center' }}
          >
            <div className="d-flex">
              <div><ActivityFlag className='me-1' style={{ width: '80px', height: '80px' }} /></div>
              {resultados.sport === 'football' ? (
                <BalonFutbol style={{ width: '80px', height: '80px', color: '#0065F3' }} />
              ) : resultados.sport === 'basketball' ? (
                <BalonBasket style={{ width: '90px', height: '90px', color: '#0065F3' }} />
              ) : resultados.sport === 'padel' ? (
                <Raqueta style={{ width: '90px', height: '90px', color: '#0065F3' }} />
              ) : null}
            </div>
          </div>
          <div
            className="d-flex flex-column align-items-center me-5"
            style={{ alignItems: 'flex-start', justifyContent: 'left' }}
          >
            <span style={{ textTransform: 'uppercase', fontSize: '20px', justifyContent: 'left' }}>
              {resultados.name}
            </span>
            <span className="" style={{ color: '#ACACAC' }}>Creado por {resultados.home.captain.nick}</span>
          </div>
          <div className="d-flex flex-column align-items-right">
            <div className="d-flex align-items-center mb-2">
              <Calendar style={{ color: '#ACACAC' }} className="me-2" />
              <span style={{ color: '#ACACAC' }}>{formatDate(resultados.date)}</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-geo-alt-fill" style={{ width: '24px', height: '24px', color: '#ACACAC' }}></i>
              <span style={{ color: '#ACACAC' }}>{resultados.location.toString().charAt(0).toUpperCase() + resultados.location.toString().slice(1)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light-blue d-flex align-items-center justify-content-center py-5 mx-5 my-4 rounded">
          <div className="d-flex flex-column align-items-center me-5">
            {resultados.home && <img src={resultados.home.icon} alt="Home team icon" style={{width: '60px', height: '60px'}}/>}
            {resultados.home && <span>{resultados.home.name}</span>}
          </div>
          <div className="text-primary" style={{fontSize: '2rem'}}>
            {resultados.result}
          </div>
          <div className="d-flex flex-column align-items-center ms-5">
          {resultados.away && <img src={resultados.away.icon} alt="Home team icon" style={{width: '60px', height: '60px'}}/>}
            {resultados.away && <span>{resultados.away.name}</span>}
          </div>
        </div>
    </NavBarTemplate>
  );
}