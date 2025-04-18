import BalonBasket from '@mui/icons-material/SportsBasketballRounded';
import BalonFutbol from '@mui/icons-material/SportsSoccer';
import Raqueta from '@mui/icons-material/SportsTennis';
import Escudo from '../assets/icons/Shield.svg'
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { CONTEXT } from '../utils/Context';
import es from 'date-fns/locale/es';
import enUS from 'date-fns/locale/en-US';
import Activity from '@mui/icons-material/Flag';
import VsImage from '../components/common/VsImage';
import NavBarTemplate from '../templates/NavBarTemplate';
import FechaGrande from '../components/common/FechaGrande';
import { useNavigate } from 'react-router-dom';
import { Team } from '../models/Team';


export default function Events() {
  const [resultados, setResultados] = useState<{
    away: Team;
    _id: string,
    location: Location; name: string, sport: String, home: Team, result: string, date: string
  }[]>([]);
  const context = useContext(CONTEXT);
  const locale = context.language === 'en' ? enUS : { ...es, formatLong: es.formatLong };
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`${context.apiUrl}/activities/`)
      .then(response => {
        setResultados(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  
  

  const sorted = resultados
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .filter((res) => new Date(res.date).getTime() > new Date().getTime())
  .map((res) => ({ 
      home: res.home,
      away: res.away,
      id: res._id,
      nombre: res.name,
      escudo: Escudo,
      deporte: res.sport, 
      resultado: res.result,
      location: res.location,
      fecha: res.date,
    }));
  const isSmallScreen = context.isMobile();
  function handleClick(activityId: string) {
    navigate(`/activity/${activityId}`);
  }

  
    


  return (
    <NavBarTemplate {...{ container: false }}>
      <div className="resultados">
        <div className="d-flex flex-column flex-wrap">
          {sorted.map((resultado, index) => (
            <div
              key={index}
              className={`d-flex px-4 ms-2  ${index % 2 === 0 ? 'bg-light-blue' : ''}`}
              style={{ display: 'flex' }}
            >
              <div className="d-flex align-items-center me-4" style={{ display: 'flex' }}>
                <div><Activity className='me-1' style={{ width: '65px', height: '65px' }} /></div>
                <div
                  className={`icono-deporte ${isSmallScreen ? 'ms-0 me-1 mt-4' : 'mx-4'}`}
                  style={{ width: '65px', height: '65px' }}
                >
                  {resultado.deporte === 'football' ? (
                    <div className="icono-deporte me-5 ms-2" style={{ color: '#0065F3' }}>
                      {<BalonFutbol style={{ width: '65px', height: '65px' }} />}
                    </div>
                  ) : resultado.deporte === 'basketball' ? (
                    <div className="icono-deporte me-5 ms-2" style={{ color: '#0065F3' }}>
                      <BalonBasket style={{ width: '65px', height: '65px' }} />
                    </div>
                  ) : resultado.deporte === 'padel' ? (
                    <div className="icono-deporte me-5 ms-2" style={{ color: '#0065F3' }}>
                      <Raqueta style={{ width: '65px', height: '65px' }} />
                    </div>
                  ) : null}
                </div >
                <div className="mx-5" style={{
                  display: 'flex',
                  alignItems: 'right',
                  flexDirection: 'column',
                  minWidth: '0px',
                  justifyContent: "center",
                  width: `${isSmallScreen ? '100%' : 'clamp(50px, 250px, 300px)'}`,

                }}>
                  <span style={{ textTransform: 'uppercase', fontSize: '20px' }}>{resultado.nombre}</span>
                </div>
                <div className="ms-5 d-flex align-items-center">
                  <VsImage image1={resultado.home?.icon} image2={resultado.away?.icon} />
                </div>
              </div>
              <div className="ms-auto d-flex flex-column align-items-end mx-4 pt-3">
                <div className="d-flex align-items-left mb-2 mt-3">
                  <i className="bi bi-geo-alt-fill" style={{ width: '24px', height: '24px' }}></i>
                  <span className="text-muted">{resultado.location.toString().charAt(0).toUpperCase() + resultado.location.toString().slice(1)}</span>
                </div>
                <div className="d-flex align-items-right mb-1">
                  <button type="button" className="btn btn-sm btn-primary px-3 fs-6 mt-2 mb-2" onClick={() => handleClick(resultado.id)}><span style={{ fontSize: '16px' }}>INSCRIBIRSE</span></button>
                </div>
              </div>
              <FechaGrande fecha ={resultado.fecha} />
            </div>
          ))}
        </div>
      </div >
    </NavBarTemplate>
  );
}  