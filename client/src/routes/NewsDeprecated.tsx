import React from 'react';
import GanadorTorneo from './ganadorTorneo';

import TeamIcon from '../assets/icons/Shield.svg';

import BalonFutbol from '../assets/icons/Soccer Ball-1.svg';
import BalonBasket from '../assets/icons/Sports basketball.svg';
import Raqueta from '../assets/icons/Racket-1.svg';
import Escudo from '../assets/icons/Shield.svg'
import Calendario from '../assets/icons/Calendar today.svg';
import BanderaActividad from '../assets/icons/FlagFilled.svg';
import CopaTorneo from '../assets/icons/copa torneo.svg';
import { Link } from 'react-router-dom';


export default function News() {
  const resultados = [
    {
      tipo: 'Torneo',
      nombre: 'NOMBRE ACTIVIDAD',
      escudo: Escudo,
      deporte: BalonBasket,
      location: 'U-tad',
    },
    {
      tipo: 'Info',
      nombre: 'NOMBRE ACTIVIDAD',
      escudo: Escudo,
      deporte: Raqueta,
      location: 'U-tad',
    },
    {
      tipo: 'Ganador',
      nombre: 'NOMBRE ACTIVIDAD',
      escudo: Escudo,
      deporte: BalonFutbol,
      location: 'U-tad',
    },
    {
        tipo: 'Actividad',
        nombre: 'NOMBRE ACTIVIDAD',
        escudo: Escudo,
        deporte: BalonBasket,
        location: 'U-tad',
      },
      {
        tipo: 'Info',
        nombre: 'NOMBRE ACTIVIDAD',
        escudo: Escudo,
        deporte: Raqueta,
        location: 'U-tad',
      },
      {
        tipo: 'Torneo',
        nombre: 'NOMBRE ACTIVIDAD',
        escudo: Escudo,
        deporte: BalonFutbol,
        location: 'U-tad',
      },
  ];

  const fecha = '15-18 mar.';
    
  return (
    <div className="resultados-container">
      <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
        <div className="dropdown mx-5 ">
         
          
        </div>
       
      </div>
      <div className="resultados">
        <div className="d-flex flex-column">
          {resultados.map((resultado, index) => (
            <div
              key={index}
              className={`d-flex p-4 ${index % 2 === 0 ? 'bg-light-blue' : ''}`}
              style={{ justifyContent: 'space-between' }}
            >
              <div className="mx-5"style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  className="icono-deporte me-5 ms-2"
                  src={resultado.deporte}
                  alt={`Escudo ${resultado.nombre}`}
                  style={{ width: '65px', height: '65px' }}
                />
                <div>
                    <div  className="mb-2"style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <span style={{ textTransform: 'uppercase', fontSize: '20px' }}>{resultado.nombre}</span>
                    </div>
                    <div className="mx-1" style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                        className="icono-izquierda me-3"
                        src={resultado.escudo}
                        alt={`Escudo ${resultado.nombre}`}
                        style={{ width: '50px', height: '50px' }}
                        />
                        <span>VS</span>
                        <img
                        className="icono-derecha ms-3"
                        src={resultado.escudo}
                        alt={`Escudo ${resultado.nombre}`}
                        style={{ width: '50px', height: '50px' }}
                        />
                    </div>
                </div>
              </div>
              <div className="ms-auto d-flex flex-column align-items-end mx-5 pt-3">
                <div className="d-flex align-items-center mb-2">
                  <img
                    className="icono-tipo me-1"
                    src={Calendario}
                    alt={`Escudo ${resultado.nombre}`}
                    style={{ width: '24px', height: '24px' }}
                  />
                  <span className="text-muted">{fecha}</span>
                </div>
                <div className="d-flex align-items-center">
                  <img
                    className="icono-deporte me-1"
                    src={BanderaActividad}
                    alt={`Escudo ${resultado.nombre}`}
                    style={{ width: '24px', height: '24px' }}
                  />
                  <span className="text-muted">{resultado.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
}  