import CreateTeam from "./CreateTeam";
import Login from "./Login";
import Register from "./Register";
import CreateActivity from "./CreateActivity";
import ResultadosTorAct from "./ResultadosTorAct";
import GanadorTorneo from "./ganadorTorneo";
import NavBarTemplate from "../templates/NavBarTemplate";
import PersonalInfo from "./PersonalInfo";
import JoinTeam from "./JoinTeam";
import OpenTeams from "./OpenTeams";
import CreateTournament from "./CreateTournament";
import Teams from "./Teams";
import Activities from "./Activities";
import InscriptionActivity from "./joinActivity"
import Test from "./test";
import GanadorActividad from "./ganadorActividad";
import ResultsActivity from "./ResultsActivity";
import ResultsTorneo from "./ResultsTorneo";
import JoinTournament from "./joinTournament";
import Events from "./Events";
import ViewTeam from "./ViewTeam";
import ViewActivity from "./ViewActivity";
import News from "./News";
import CreateNew from "./CreateNew";


type Page = "login" | "register" | "createActivity" | "tournaments" | "openTeams" | "events" | "results" | "ResultsActivity" | "ResultsTorneo" | "ganadorTorneo" | "ganadorActividad" | "createTeam" | "personalInfo" | "myTeams" | "myEvents" | "myHistory" | "joinTeam" | "joinTournament" | "news" | "createTournament" | "teams" | "activities" | "inscriptionActivity" | "test" | "viewTeam" | "viewActivity" | "createNew";

const PAGES: Page[] = ["login", "register", "createActivity", "tournaments", "openTeams", "events", "results", "ResultsActivity", "ResultsTorneo", "ganadorTorneo", "ganadorActividad", "createTeam", "personalInfo", "myTeams", "myEvents", "myHistory", "joinTeam", "joinTournament", "news", "createTournament", "teams", "activities", "inscriptionActivity", "test", "viewTeam", "viewActivity", "createNew"];

const PAGES_COMPONENTS: { [key in Page]: JSX.Element } = {
    login: <Login />,
    register: <Register />,
    activities: <Activities />,
    createActivity: <CreateActivity />,
    openTeams: <OpenTeams />,
    events: <Events />,
    results: <ResultadosTorAct />,
    ResultsActivity: <ResultsActivity />,
    ResultsTorneo: <ResultsTorneo />,
    ganadorTorneo: <NavBarTemplate><GanadorTorneo /></NavBarTemplate>,
    ganadorActividad: <NavBarTemplate><GanadorActividad /></NavBarTemplate>,
    tournaments: <NavBarTemplate page="joinTournament" parentPage="tournaments"><CreateTournament /></NavBarTemplate>,
    createTeam: <CreateTeam />,
    personalInfo: <NavBarTemplate><PersonalInfo /></NavBarTemplate>,
    myTeams: <NavBarTemplate><></></NavBarTemplate>,
    myEvents: <NavBarTemplate><></></NavBarTemplate>,
    myHistory: <NavBarTemplate><></></NavBarTemplate>,
    joinTeam: <JoinTeam />,
    joinTournament: <NavBarTemplate page="joinTournament" parentPage="tournaments"><JoinTournament /></NavBarTemplate>,
    news: <News />,
    createTournament: <NavBarTemplate><CreateTournament /></NavBarTemplate>,
    inscriptionActivity: <NavBarTemplate><InscriptionActivity /></NavBarTemplate>,
    teams: <Teams />,
    test: <Test />,
    viewTeam: <ViewTeam />,
    viewActivity: <ViewActivity />,
    createNew: <CreateNew/>
}

export type { Page };
export { PAGES, PAGES_COMPONENTS };