import React from 'react';
import NavBarTemplate from '../templates/NavBarTemplate';
import { MdArrowBack } from 'react-icons/md';
import CopaTorneo from '@mui/icons-material/EmojiEvents';
import BalonBasket from '@mui/icons-material/SportsBasketballRounded';
import Shield from '@mui/icons-material/Shield';

export default function ResultsTorneo() {
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
                    <CopaTorneo className="me-2" style={{ width: '65px', height: '65px' }} />
                    <BalonBasket style={{ width: '65px', height: '65px', color: '#0065F3' }} />
                  </div>
                </div>
      
                <div
                  className="d-flex align-items-center me-5"
                  style={{ alignItems: 'flex-start', justifyContent: 'left' }}
                >
                  <span style={{ textTransform: 'uppercase', fontSize: '20px', justifyContent:'left' }}>
                    nombre del torneo
                  </span>
                </div>

                <div className="d-flex align-items-right">
                {Array(6)
                    .fill(0)
                    .map((_, index) => (
                    <div className="d-flex align-items-center mb-2" key={index}>
                        <Shield className="me-2" style={{ width: '40px', height: '40px' }} />
                    </div>
                    ))}
                </div>

      
                
              </div>
            </div>
          </div>
        </NavBarTemplate>
      );
}