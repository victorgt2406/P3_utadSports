import BalonBasket from '@mui/icons-material/SportsBasketballRounded';
import BalonFutbol from '@mui/icons-material/SportsSoccer';
import Raqueta from '@mui/icons-material/SportsTennis';
import Escudo from '../assets/icons/Shield.svg'
import Calendario from '../assets/icons/Calendar.svg';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { CONTEXT } from '../utils/Context';
import es from 'date-fns/locale/es';
import enUS from 'date-fns/locale/en-US';
import NavBarTemplate from '../templates/NavBarTemplate';
import VsImage from '../components/common/VsImage';
import { Team } from '../models/Team';


export default function ActivityList() {
  const [resultados, setResultados] = useState<{
    location: Location; name: string, sport: String, home: Team, result: string, date: string
  }[]>([]);
  const context = useContext(CONTEXT);
  const locale = context.language === 'en' ? enUS : { ...es, formatLong: es.formatLong };
  const [filter, setFilter] = useState("");
  const filters = ["Todas las actividades", "Mis actividades", "Actividades finalizadas"];

  useEffect(() => {
    axios.get(`${context.apiUrl}/activities`)
      .then(response => {
        setResultados(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  function formatDate(dateString: string) {
    console.log(dateString);
    const date = new Date(dateString);
    return format(new Date(date), context.language === 'en' ? 'EEEE, MMMM d, hh:mm a' : 'EEEE, d MMMM   HH:mm', { locale });
  }
  const isSmallScreen = context.isMobile();
  const actividad = resultados
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((res) => ({
      name: res.name,
      sport: res.sport,
      escudo: Escudo,
      res: res.result,
      loc: res.location,
      date: res.date,
    }));
  console.log(actividad);
  return (
    <NavBarTemplate {...{ filter, setFilter, filters, create: "createActivity", info: "activities", container: false }}>
      <div className="resultados">
        <div className="d-flex flex-column">
          {actividad.map((resultado, index) => (
            <Link to={"/inscriptionActivity"} className="Link" key={index}>
              <div
                key={index}
                className={`d-flex p-4 ${index % 2 === 0 ? 'bg-light-blue' : ''}`}
                style={{ justifyContent: 'space-between' }}
              >
                <div className={`mx-5 ${isSmallScreen ? 'ms-0 me-auto' : 'ms-5'}`} style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    className={`icono-deporte ${isSmallScreen ? 'ms-0 me-2' : 'ms-2 me-5'}`}
                    style={{ width: '65px', height: '65px' }}
                  >
                    {resultado.sport === 'football' ? (
                      <div className="icono-deporte me-5 ms-2" style={{ color: '#0065F3' }}>
                        {<BalonFutbol style={{ width: '65px', height: '65px' }} />}
                      </div>
                    ) : resultado.sport === 'basketball' ? (
                      <div className="icono-deporte me-5 ms-2" style={{ color: '#0065F3' }}>
                        <BalonBasket style={{ width: '65px', height: '65px' }} />
                      </div>
                    ) : resultado.sport === 'padel' ? (
                      <div className="icono-deporte me-5 ms-4" style={{ color: '#0065F3' }}>
                        <Raqueta style={{ width: '65px', height: '65px' }} />
                      </div>
                    ) : null}
                  </div>
                  <div className="ms-4">
                    <div className="mb-2" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <span style={{ textTransform: 'uppercase', fontSize: '20px' }}>{resultado.name}</span>
                    </div>
                    <VsImage />
                  </div>
                </div>
                <div className="ms-auto d-flex flex-column align-items-end mx-5 pt-3">
                  <div className="d-flex align-items-center mb-2">
                    <img
                      className="icono-tipo me-1"
                      src={Calendario}
                      style={{ width: '24px', height: '24px' }}
                    />
                    <span className="text-muted ms-1">{formatDate(resultado.date)}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-geo-alt-fill" style={{ width: '24px', height: '24px' }}></i>
                    <span className="text-muted">{resultado.loc.toString().charAt(0).toUpperCase() + resultado.loc.toString().slice(1)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </NavBarTemplate>
  );

}  