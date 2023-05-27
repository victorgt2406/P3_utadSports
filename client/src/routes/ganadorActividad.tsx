import React from 'react';
import TeamIcon from '../assets/icons/Shield.svg';
import BalonFutbol from '../assets/icons/Soccer Ball.svg';
import MedallaGanador from '../assets/icons/Medal First Place.svg';
import Calendario from '../assets/icons/Calendar today.svg';
import Ubicacion from '../assets/icons/Flag Filled.svg';

export default function GanadorActividad() {
    const resultados = [
        { lugar: 1, nombre: 'Equipo 1', escudo: TeamIcon},
        { lugar: 2, nombre: 'Equipo 2', escudo: TeamIcon },
        { lugar: 3, nombre: 'Equipo 3', escudo: TeamIcon },
        { lugar: 4, nombre: 'Equipo 4', escudo: TeamIcon },
        { lugar: 5, nombre: 'Equipo 5', escudo: TeamIcon },
        { lugar: 6, nombre: 'Equipo 6', escudo: TeamIcon },
    ];

    const MedallaIcono = MedallaGanador;
    const BalonIcono = BalonFutbol;

    const nombreTorneo = 'Actividad U-tad';
    const descripcionTorneo = 'Actividad U-tad';
    const fechasTorneo = '15-18 mar.';
    const location = 'U-tad';

    return (
        <>
            <div className="mt-5"> {/* Espacio entre la barra de navegación y los elementos */}
            <h1 className="text-center mt-3 mb-5"> {/* Aumentado el margen inferior */}
                <img
                    className="escudo-ganador"
                    src={resultados[0].escudo}
                    alt={`Escudo ${resultados[0].nombre}`}
                />
                <br />
                <img
                    className="medalla-ganador"
                    src={MedallaIcono}
                />
                <img
                    className="balon-futbol"
                    src={BalonIcono}
                />
                Ganador del torneo {nombreTorneo}
                <br />
                <small className="text-muted">{resultados[0].nombre}</small>
            </h1>
            <div className="resultados mt-5">
                <div className="text-left ml-5 mb-2" style={{fontSize: '0.8rem', marginLeft: '17%', marginTop: '100px'}}> {/* Tamaño de fuente reducido y margen inferior añadido */}
                    Clasificación
                </div>
                <ul className="list-group shadow mb-3 mx-auto" style={{ maxWidth: '900px' }}> {/* Ancho máximo aumentado */}
                    {resultados.map((resultado, index) => (
                        <li
                            key={resultado.lugar}
                            className={`list-group-item p-3 d-flex align-items-center ${
                                index % 2 === 0 ? 'bg-light-blue' : ''
                            }`}
                        >
                            <span className="mr-2">{resultado.lugar}. </span>
                            <img
                                className="escudo-equipo mr-2"
                                src={resultado.escudo}
                                alt={`Escudo ${resultado.nombre}`}
                            />
                            <span>{resultado.nombre}</span>
                        </li>
                    ))}
                </ul>
            </div>
            </div>
        </>
    );
}