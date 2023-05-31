import { Page } from "../routes";
import { Sport } from "../models/Options";
import Activity from '@mui/icons-material/Flag';
import News from '@mui/icons-material/Newspaper';
import Calendar from '@mui/icons-material/CalendarToday';
import Tournament from '@mui/icons-material/EmojiEvents';
import Home from '@mui/icons-material/Home';
import Results from '@mui/icons-material/Scoreboard';
import Team from '@mui/icons-material/Groups';
import OpenTeam from '@mui/icons-material/Groups3';
import Add from '@mui/icons-material/AddRounded';
import Join from '@mui/icons-material/LaunchRounded';
import Basketball from '@mui/icons-material/SportsBasketballRounded';
import Football from '@mui/icons-material/SportsSoccer';
import Padel from '@mui/icons-material/SportsTennis';
import Menu from '@mui/icons-material/Menu';
import Expand from '@mui/icons-material/ExpandMore';
import Info from '@mui/icons-material/InfoOutlined';
import Location from '@mui/icons-material/LocationOn';

//bandera is a svg located ../../src/assets/icons/FlagFilled.svg";

// <img src={Bandera} alt="Flag" style={{ height: "30px" }}></img>
const ICONS_PAGE: { [key in Page]: JSX.Element } = {
    login: <i className="bi bi-person-fill"></i>,
    register: <i className="bi bi-person-plus-fill"></i>,
    activities: <Activity />,
    tournaments: <Tournament />,
    openTeams: <OpenTeam />,
    events: <Calendar />,
    results: <Results />,
    createTeam: <><Team /><Add /></>,
    createActivity: <><Activity /><Add /></>,
    personalInfo: <i className="bi bi-person-circle"></i>,
    myTeams: <Team />,
    myEvents: <></>,
    myHistory: <></>,
    joinTeam: <><Team /><Join /></>,
    joinTournament: <><Tournament /><Join /></>,
    news: <News />,
    inscriptionActivity: <><Activity /><Join /></>,
    ganadorTorneo: <></>,
    createTournament: <><Tournament /><Add /></>,
    teams: <Team />,
    test: <></>,
    ganadorActividad: <></>,
    ResultsActivity: <></>,
    ResultsTorneo: <></>,
    viewTeam: <Team />,
    viewActivity: <Activity />,
    createNew: <></>
};

const ICONS_SPORTS: { [key in Sport]: JSX.Element } = {
    football: <Football />,
    basketball: <Basketball />,
    padel: <Padel />
};

const ICONS_BASIC = {
    add: <Add/>,
    join: <Join/>,
    menu: <Menu/>,
    start: <Home/>,
    expand: <Expand/>,
    location: <Location/>,
    calendar: <Calendar/>
}

const ICONS_NEWS = {
    ...ICONS_SPORTS,
    info: <Info/>
}

export { ICONS_PAGE, ICONS_SPORTS, ICONS_BASIC, ICONS_NEWS }