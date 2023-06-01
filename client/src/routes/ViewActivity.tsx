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
import FechaGrande from '../components/common/FechaGrande';

type Activity = {
    away: Team;
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
                return <BalonFutbol style={{ width: '80px', height: '80px', color: '#0065F3' }} />;
            case 'basketball':
                return <BalonBasket style={{ width: '80px', height: '80px', color: '#0065F3' }} />;
            case 'padel':
                return <Raqueta style={{ width: '80px', height: '80px', color: '#0065F3' }} />;
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
                <div className="d-flex flex-column align-items-left mx-2">
                    <div className="fw-bold">{resultados.name}</div>
                    <div className="fw-light">Creado por {resultados.home.captain?.nick}</div>
                </div>
                <div className="mx-4 d-flex flex-column align-items-center">
                    <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-geo-alt-fill" style={{ width: '24px', height: '24px' }}></i>
                        <div className="w-100 text-center ">
                            {resultados.location.toString().charAt(0).toUpperCase() + resultados.location.toString().slice(1)}
                        </div>
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary px-4 mb-2"
                        style={{ width: "fit-content" }}
                        onClick={() => { console.log("TODO!! inscribir a equipo") }}
                    >
                        {context.getText().join}
                    </button>
                </div>
                <FechaGrande fecha={resultados.date} />
            </div>
            <div>
                <LabelInfo label="Equipos que van a participar en la actividad" className="pb-2 mt-2">
                    {resultados.home.name} (lleno)
                </LabelInfo>
                <LabelInfo className="">
                {resultados.away ? (
                        resultados.away.name
                    ) : (
                        <span className="text-primary">1 plaza</span>
                    )}
                   
                </LabelInfo>
            </div>
        </NavBarTemplate>
    );
}
