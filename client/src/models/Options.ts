type Sport = "FUTBOL" | "BALONCESTO" | "PADEL";
const SPORTS:Sport[] = ["FUTBOL","BALONCESTO","PADEL"];

type Degree = "INGENIERIA Y CIENCIAS" | "ANIMACION" | "DISENO DIGITAL" | "GRADO SUPERIOR" | "VIDEOJUEGOS";
const DEGREES = ["INGENIERIA Y CIENCIAS", "ANIMACION", "DISENO DIGITAL", "GRADO SUPERIOR", "VIDEOJUEGOS"];

type TimeTable = "MORNING" | "AFTERNOON" | "BOTH";
const TIMETABLE = ["MORNING", "AFTERNOON", "BOTH"];

type Hours = '09:00' | '10:00' | '11:00'| '12:00' | '13:00' | '14:00' | '15:00'| '16:00' | '17:00';
const HOURS = ['09:00' ,'10:00' , '11:00', '12:00' , '13:00' , '14:00' , '15:00', '16:00' , '17:00'];

type State = 'START' | 'IN_PROCESS' | 'END';
const STATE = ['START','IN_PROCESS' , 'END'];

type Pista = 'PISTA_01' | 'PISTA_02';
const PISTA = ['PISTA_01', 'PISTA_02'];

export {SPORTS, DEGREES, HOURS, STATE, PISTA, TIMETABLE};
export type { Sport, Degree, Hours, State,Pista, TimeTable };