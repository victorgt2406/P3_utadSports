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

type Activity = {
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
    // Render some kind of loading indicator or return null if no render should occur.
    return null;
  }
  return (
    <NavBarTemplate {...{ container: false }}>
      <div className="resultados" style={{ marginTop: '2rem' }}>
        <div className="d-flex flex-column flex-wrap">
        </div>
        <div className="mx-5" style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            className="d-flex flex-column align-items-center me-4"
            style={{ justifyContent: 'center' }}
          >
            <div className="d-flex">
              {resultados.sport === 'football' ? (
                <BalonFutbol style={{ width: '65px', height: '65px', color: '#0065F3' }} />
              ) : resultados.sport === 'basketball' ? (
                <BalonBasket style={{ width: '65px', height: '65px', color: '#0065F3' }} />
              ) : resultados.sport === 'padel' ? (
                <Raqueta style={{ width: '65px', height: '65px', color: '#0065F3' }} />
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
            <span className="text-muted">Creado por {resultados.home.name}</span>
          </div>
          <div className="d-flex flex-column align-items-right">
            <div className="d-flex align-items-center mb-2">
              <Calendar className="me-2" />
              <span className="text-muted">{formatDate(resultados.date)}</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-geo-alt-fill" style={{ width: '24px', height: '24px' }}></i>
              <span className="text-muted">{resultados.location.toString().charAt(0).toUpperCase() + resultados.location.toString().slice(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </NavBarTemplate>
  );
}