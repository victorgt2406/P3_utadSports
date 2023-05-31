import { Sport, State, Pista } from "../models/Options";
import { Page } from "../routes";
import { Lang } from "./langs";

// tipo en el que se inclullen todos los textos que pueden ser traducibles
type PagesStr = { [key in Page]: string };
type LangStr = { [key in Lang]: string };
type Options = { [key in Sport]: string } 
    // & {[key in Degree]: string } 
    & {[key in State]: string }
    & {[key in Pista]: string }
    ;


type Others = {
    email: string;
    emailExample: string;
    password: string;
    repeatPassword: string;
    notRegistered: string;
    yesRegistered: string;
    dataProtection: string;
    keepAccount: string;
    nick: string;
    name: string;
    surname: string;
    start: string;
    title: string;
    description: string;
    logOut: string;
    createdBy: string;
    captain: string;
    teamPlayers: string;
    join: string;
    teamName: string;
    selectCaptain: string;
    maxPlayers: string;    
}

interface Texts extends PagesStr, Options, LangStr, Others {}
export default Texts;