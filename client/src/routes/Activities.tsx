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



export default function ActivityList() {
  const [resultados, setResultados] = useState<{
    localitation: string; description: string, sport: string, total_team: number, result: string, start_date: string
  }[]>([]);
  const context = useContext(CONTEXT);
  const locale = context.language === 'en' ? enUS : { ...es, formatLong: es.formatLong };
  const [filter, setFilter] = useState("");
  const filters = ["Todas las actividades", "Mis actividades", "Actividades finalizadas"];

  useEffect(() => {
    axios.get(`${context.apiUrl}/activity/`)
      .then(response => {
        setResultados(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return format(new Date(date), context.language === 'en' ? 'EEEE, MMMM d HH' : 'EEEE, d MMMM HH:00', { locale });
  }
  const isSmallScreen = context.isMobile();
  const actividad = resultados
    .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())
    .map((res) => ({
      nombre: res.description,
      escudo: Escudo,
      deporte:
        res.sport === 'FUTBOL'
          ? BalonFutbol
          : res.sport === 'BALONCESTO'
            ? BalonBasket
            : res.sport === 'PADEL'
              ? Raqueta
              : '',
      numEquipos: res.total_team,
      resultado: res.result,
      location: res.localitation,
      fecha: res.start_date,
    }));

  return (
    <NavBarTemplate {...{ filter, setFilter, filters, create: "createActivity", info: "activities", container: false }}>
      {/* <div className="resultados-container"> */}
      {/* <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
        <div className="dropdown mx-5 ">
          <button
            className="btn bg-transparent dropdown-toggle dropdown-toggle-icon"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Todas las actividades
          </button>
          <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton">
            <li><a className="dropdown-item" href="#">Todas las actividades</a></li>
            <li><a className="dropdown-item" href="#">Mis actividades</a></li>
            <li><a className="dropdown-item" href="#">Actividades finalizadas</a></li>
          </ul>

        </div>
        <Link to={"/createActivity"} className="Link"> <button type="button" className="bi bi-plus-lg mx-5 button-icon" style={{ position: 'relative', left: '-10px' }}></button></Link>

      </div> */}
      <div className="resultados">
        <div className="d-flex flex-column">
          {resultados.map((resultado, index) => (
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
                    {resultado.sport === 'FUTBOL' ? (
                      <div className="icono-deporte me-5 ms-2" style={{ color: '#0065F3' }}>
                        {<BalonFutbol style={{ width: '65px', height: '65px' }} />}
                      </div>
                    ) : resultado.sport === 'BALONCESTO' ? (
                      <div className="icono-deporte me-5 ms-2" style={{ color: '#0065F3' }}>
                        <BalonBasket style={{ width: '65px', height: '65px' }} />
                      </div>
                    ) : resultado.sport === 'PADEL' ? (
                      <div className="icono-deporte me-5 ms-2" style={{ color: '#0065F3' }}>
                        <Raqueta style={{ width: '65px', height: '65px' }} />
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <div className="mb-2" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <span style={{ textTransform: 'uppercase', fontSize: '20px' }}>{resultado.description}</span>
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
                    <span className="text-muted ms-1">{formatDate(resultado.start_date)}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-geo-alt-fill" style={{ width: '24px', height: '24px' }}></i>
                    <span className="text-muted">U-tad</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* </div> */}
    </NavBarTemplate>
  );

}  