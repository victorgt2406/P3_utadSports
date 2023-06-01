import { useContext, useEffect, useState } from "react";
import LabelInfo from "../components/common/LabelInfo";
import { Team } from "../models/Team";
import NavBarTemplate from "../templates/NavBarTemplate";
import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import enUS from 'date-fns/locale/en-US';
import axios from "axios";
import { useParams } from "react-router-dom";
import { CONTEXT } from "../utils/Context";
import BalonBasket from "@mui/icons-material/SportsBasketballRounded";
import BalonFutbol from '@mui/icons-material/SportsSoccer';
import Raqueta from '@mui/icons-material/SportsTennis';

type Activity = {
  _id: string,
  location: string; 
  name: string, 
  sport: string, 
  home: Team, 
  result: string, 
  date: string
};

export default function ActivityDetail() {
  const context = useContext(CONTEXT);
  const { id } = useParams();
  const [resultados, setResultados] = useState<Activity | null>(null);

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
  };

  if (resultados === null) {
    // Render a loading indicator or return null
    return <div>Loading...</div>;
  }

  const getSportIcon = () => {
    switch (resultados.sport) {
      case 'football':
        return <BalonFutbol style={{ width: '65px', height: '65px', color: '#0065F3' }} />;
      case 'basketball':
        return <BalonBasket style={{ width: '65px', height: '65px', color: '#0065F3' }} />;
      case 'padel':
        return <Raqueta style={{ width: '65px', height: '65px', color: '#0065F3' }} />;
      default:
        return null;
    }
  };

  return (
    <NavBarTemplate info="activities" parentPage="activities" page="viewActivity">
      <div className="d-flex justify-content-center align-items-center my-4">
        <div className="me-2 text-primary" style={{ height: "80px", width: "80px" }}>
          {getSportIcon()}
        </div>
        <div className="d-flex flex-column align-items-center mx-2">
          <div className="fw-bold">{resultados.name}</div>
          <div className="fw-light">Creado por {resultados.home.name}</div>
        </div>
        <div className="mx-2">
          <div className="w-100 text-center mb-2">{resultados.location}</div>
          <button
            type="button"
            className="btn btn-primary px-4 mb-2"
            style={{ width: "fit-content" }}
            onClick={() => { console.log("TODO!! inscribir a equipo") }}
          >
            {context.getText().join}
          </button>
        </div>
        <div>{formatDate(resultados.date)}</div>
      </div>
      <div>
        <LabelInfo label="Numero de equipos 2/2" className="text-primary">
          {resultados.home.name}
        </LabelInfo>
      </div>
    </NavBarTemplate>
  );
}
