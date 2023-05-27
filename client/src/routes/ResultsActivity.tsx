import React from "react";
import NavBarTemplate from "../templates/NavBarTemplate";
import {MdArrowBack} from "react-icons/md";
import Acivity from "@mui/icons-material/Flag";
import BalonBasket from "@mui/icons-material/SportsBasketballRounded";
import Calendar from "@mui/icons-material/CalendarToday";


export default function ResultsActivity(){
    return (
        <NavBarTemplate {...{ container: false }}>
          <div className="resultados" style={{ marginTop: '2rem'}}>
            <div className="d-flex flex-column flex-wrap">
              <div
                className="d-flex align-items-center mt-3 mb-3"
                style={{ cursor: 'pointer', marginLeft: '1rem', marginTop: '1rem' }}
                onClick={() => history.back()}
              >
                <MdArrowBack size={24} />
              </div>
      
              <div className="mx-5" style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  className="d-flex flex-column align-items-center me-4"
                  style={{ justifyContent: 'center' }}
                >
                  <div className="d-flex">
                    <Acivity className="me-2" style={{ width: '65px', height: '65px' }} />
                    <BalonBasket style={{ width: '65px', height: '65px', color: '#0065F3' }} />
                  </div>
                </div>
      
                <div
                  className="d-flex flex-column align-items-center me-5"
                  style={{ alignItems: 'flex-start', justifyContent: 'left' }}
                >
                  <span style={{ textTransform: 'uppercase', fontSize: '20px', justifyContent:'left' }}>
                    nombre de la actividad
                  </span>
                  <span className="text-muted">Creado por (Nombre del creador)</span>
                </div>
      
                <div className="d-flex flex-column align-items-right">
                  <div className="d-flex align-items-center mb-2">
                    <Calendar className="me-2" />
                    <span className="text-muted">18 mar.</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-geo-alt-fill" style={{ width: '24px', height: '24px' }}></i>
                    <span className="text-muted">Pista Grande</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </NavBarTemplate>
      );
}