import BalonBasket from '@mui/icons-material/SportsBasketballRounded';
import BalonFutbol from '@mui/icons-material/SportsSoccer';
import Raqueta from '@mui/icons-material/SportsTennis';
import axios from 'axios';
import Activity from '@mui/icons-material/Flag';
import Tournament from '@mui/icons-material/EmojiEvents';
import Shield from '@mui/icons-material/Shield';
import Calendar from '@mui/icons-material/CalendarToday';
import NavBarTemplate from '../templates/NavBarTemplate';
import ResultsActivity from './ResultsActivity';
import ResultsTorneo from './ResultsTorneo';

import { Link } from 'react-router-dom';


export default function ResultadosTorAct() {
    const resultados = [
        { tipo: 'Actividad', nombre: 'Nombre Actividad', sport: 'FUTBOL', numEquipos: 2, resultado: '2-1', location: 'U-tad'},
        { tipo: 'Torneo', nombre: 'Nombre Torneo', sport: 'BALONCESTO', numEquipos: 6, location: 'U-tad'},
        { tipo: 'Actividad', nombre: 'Nombre Actividad', sport: 'PADEL', numEquipos: 2, resultado: '2-1', location: 'U-tad'},
        { tipo: 'Torneo', nombre: 'Nombre Torneo', sport: 'FUTBOL', numEquipos: 6, location: 'U-tad'},
        { tipo: 'Actividad', nombre: 'Nombre Actividad', sport: 'FUTBOL', numEquipos: 2, resultado: '2-1', location: 'U-tad'},
        { tipo: 'Torneo', nombre: 'Nombre Torneo', sport: 'PADEL', numEquipos: 6, location: 'U-tad'},
    ];

    
    const fecha = '15-18 mar.';
    
    return (
        <NavBarTemplate {...{container: false}}>
            <div className="resultados">
                <div className="d-flex flex-column flex-wrap">
                    {resultados.map((resultado, index) => (
                        <div key = {index} className = {`d-flex px-4 ms-2 ${index % 2 === 0 ? 'bg-light-blue' : ''}`} style={{display : 'flex'}}>
                            <div className="d-flex align-items-center me-4" style={{ display: 'flex' }}>
                                <div>
                                    {resultado.tipo === 'Actividad' ? (
                                        <Activity className= "me-1" style={{ width: '65px', height: '65px' }} />
                                    ) : (
                                        <Tournament className= "me-1" style={{ width: '65px', height: '65px' }} />
                                    )}
                                </div>
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
                            <div className="mx-5" style={{
                                display: 'flex',
                                alignItems: 'right',
                                flexDirection: 'column',
                                minWidth: '0px',
                                justifyContent: "center"
                            }}>
                                <span style={{ textTransform: 'uppercase', fontSize: '20px' }}>
                                    {resultado.tipo === 'Actividad' ? (
                                        <Link to="/ResultsActivity">{resultado.nombre}</Link>
                                    ) : (
                                        <Link to="/ResultsTorneo">{resultado.nombre}</Link>
                                    )}
                                    
                                </span>
                            </div>

                            <div className="ms-5 d-flex align-items-center">
                                {resultado.tipo === 'Actividad' ? (
                                    <>
                                    <Shield className="me-2" style={{ width: '50px', height: '50px' }} />
                                    <span className="me-2">{resultado.resultado}</span>
                                    <Shield className="me-2" style={{ width: '50px', height: '50px' }} />
                                    </>
                                ) : (
                                    Array.from({ length: resultado.numEquipos }, (_, index) => (
                                    <Shield key={index} className="me-1" style={{ width: '50px', height: '50px' }} />
                                    ))
                                )}
                            </div>

                            <div className="ms-auto d-flex flex-column align-items-end mx-4 pt-3">
                                <div className="d-flex align-items-right">
                                    <Calendar className="me-1"/>
                                    <span className="text-muted">{fecha}</span>
                                </div>
                                <div className="d-flex align-items-left mb-2 mt-3">
                                    <i className="bi bi-geo-alt-fill" style={{ width: '24px', height: '24px' }}></i>
                                    <span className="text-muted">U-tad</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </NavBarTemplate>
    );
}