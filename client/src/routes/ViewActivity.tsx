import { SetStateAction, useContext, useEffect, useState } from "react";
import LabelInfo from "../components/common/LabelInfo";
import { Team } from "../models/Team";
import NavBarTemplate from "../templates/NavBarTemplate";
import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import enUS from 'date-fns/locale/en-US';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CONTEXT } from "../utils/Context";
import BalonBasket from "@mui/icons-material/SportsBasketballRounded";
import BalonFutbol from '@mui/icons-material/SportsSoccer';
import Raqueta from '@mui/icons-material/SportsTennis';
import FechaGrande from '../components/common/FechaGrande';
import Select from 'react-select';
import notify from "../utils/notify";

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
    const navigate = useNavigate();
    const context = useContext(CONTEXT);
    const { id } = useParams();
    const [resultados, setResultados] = useState<Activity | null>(null);
    const [teams, setTeams] = useState<Team[]>([]);
    const [selectedTeam, setSelectedTeam] = useState<Team>();
    const locale = context.language === 'en' ? enUS : { ...es, formatLong: es.formatLong };
    useEffect(() => {
        const getTeams = async () => {
            try {
                const response = await axios.get(`${context.apiUrl}/teams/`);
                setTeams(response.data);
            }
            catch (err) {
                console.log(err);
                setTeams([]);
            }
        }
        getTeams();
    }, []);
    useEffect(() => {
        axios.get(`${context.apiUrl}/activities/${id}`)
            .then(response => {
                setResultados(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id, context.apiUrl]);
    const updateAwayTeam = async (team: Team) => {
        try {
            const response = await axios.put(`${context.apiUrl}/activities/${id}`, { away: team._id });
            setResultados(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    if (resultados === null) {
        return;
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
                        onClick={() => {
                            if (selectedTeam) {
                                updateAwayTeam(selectedTeam);
                                notify(
                                    "Inscripción completa",
                                    "SUCCESS",
                                    "Estas inscrito para " + resultados.name +  ", buena suerte!"
                                  )
                            }
                        }}
                        disabled={resultados.away !== undefined}
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
                    {
                        resultados.away ? (
                            `${resultados.away.name} (lleno)`
                        ) : (
                            <Select
                                className="custom-select"
                                classNamePrefix="custom-select"
                                placeholder="Plaza abierta"
                                options={teams.filter(team => team.name !== resultados.home.name).map(team => ({ label: team.name, value: team }))}
                                value={selectedTeam ? { label: selectedTeam.name, value: selectedTeam } : null}
                                onChange={selectedOption => setSelectedTeam(selectedOption ? selectedOption.value : undefined)}
                                formatOptionLabel={({ label }) => label}
                                styles={{
                                    control: styles => ({
                                        ...styles,
                                        backgroundColor: 'var(--light-blue-opaque)',
                                        color: 'black',
                                        border: 'none',
                                    }),
                                    placeholder: styles => ({
                                        ...styles,
                                        color: 'var(--bs-primary)', // Add your primary color here
                                    }),
                                    menu: styles => ({
                                        ...styles,
                                        backgroundColor: 'white',
                                        border: 'none',
                                        color: 'black',
                                    }),
                                    option: (styles, { isFocused }) => ({
                                        ...styles,
                                        backgroundColor: isFocused ? 'var(--light-blue-opaque)' : 'white',
                                        color: 'black',
                                        ':hover': {
                                            backgroundColor: 'var(--light-blue-opaque)',
                                            color: 'black',
                                        },
                                        ':active': {
                                            backgroundColor: 'var(--light-blue-opaque)',
                                            color: 'black',
                                        },
                                    }),
                                }}
                            />

                        )
                    }
                </LabelInfo>
            </div>
        </NavBarTemplate>
    );
}
