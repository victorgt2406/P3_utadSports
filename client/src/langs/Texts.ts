import { Sport, State, Pista } from "../models/Options";
import { Page } from "../routes";

// tipo en el que se inclullen todos los textos que pueden ser traducibles
type PagesStr = { [key in Page]: string };
type Options = { [key in Sport]: string } 
    // & {[key in Degree]: string } 
    & {[key in State]: string }
    & {[key in Pista]: string }
    ;


type Others = {
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

interface Texts extends PagesStr, Options, Others {}
export default Texts;