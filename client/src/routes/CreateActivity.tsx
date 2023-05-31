import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap'
import Calendar from '../components/Calendar2';
import { Sport } from "../models/Options"
import WebFont from 'webfontloader'
import SportsButtons from '../components/inputs/SportsButtons';
import NavBarTemplate from '../templates/NavBarTemplate';
import useRouterContext from '../utils/RouterContext';
import { Team } from '../models/Team';
import Select from 'react-select';


export default function crearActividad() {
  const context = useRouterContext();
  const [sport, setSport] = useState<Sport>("" as Sport);//Deporte
  const description = useRef<HTMLInputElement>(null);//Descripcion
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [imageExists, setImageExists] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isChecked, setIsChecked] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team>();




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

  function handleCheckboxChange(event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) {
    setIsChecked(event.target.checked);
  }

  function dateConverter(date: Date, selectedHour: number | null): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    if (selectedHour !== null && selectedHour >= 0 && selectedHour <= 23) {
      const hour = String(selectedHour).padStart(2, '0');
      return `${year}-${month}-${day} ${hour}:00:00`;
    }

    return `${year}-${month}-${day} 00:00:00`;
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Poppins']
      }
    });
  }, []);
  //total_users-equipos*12
  let image = <></>;
  if (imageExists) {
    image = <img src="..." alt="team logo" />
  }

  const handleClick = async () => {
    console.log(dateConverter(currentDate, selectedHour));
    if (selectedHour !== null) {
      const localitation = sport === "padel" ? "padel" : "pista";
      const nUsers = sport === "padel" ? 4 : 10;
      const activity_type = isChecked ? "OPEN" : "CLOSE";
      let registeredTeams = true;
      if (!selectedTeam) {
        registeredTeams = false;
      }
      try {
        const activity = await axios.post(`${context.apiUrl}/activities/`, {
          sport: sport,
          name: description.current?.value,
          date: dateConverter(currentDate, selectedHour),
          location: localitation,
          home: selectedTeam?._id,
          registeredTeams: registeredTeams,
        }, {
          headers: {
            Authorization: await context.token?.token,
            "Content-Type": "application/json",
          },
        });

        console.log(activity);
      } catch (error) {
        console.log(error);
      }
    }
  };

  /*
  1. Comprobar el state del checkbox con la respuesta antonio
  2. Array dinamico en el num equipos para luego introducir sus nombres
  */

  return (
    <NavBarTemplate parentPage="activities" page="createActivity" info="createActivity">
      <Form style={{ fontFamily: 'Poppins' }}>
        <br></br>
        <br></br>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="text" placeholder="Nombre de la actividad" className="black-placeholder" style={{ paddingLeft: "2%" }} ref={description} />
        </Form.Group>

        <br></br>
        <p className="activity-heading">Deporte de la actividad</p>

        <SportsButtons {...{ sport, setSport }} />

        <br></br>
        <div>
          <p className="activity-heading">Equipo con el que crear la actividad</p>
          <Select
            className="custom-select"
            classNamePrefix="custom-select"
            options={teams.map(team => ({ label: team.name, value: team }))}
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

        </div>
        <Form.Group className="mb-2 mx-3 mt-2" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Actividad abierta"
            onChange={handleCheckboxChange}
            checked={isChecked}
          />
        </Form.Group>
        <br></br>
        <br></br>
        <p className="activity-heading">Día de la actividad</p>
        <Calendar
          value={currentDate}
          sport={sport}
          selectedHour={selectedHour}
          onValueChange={setCurrentDate}
          onSelectedHourChange={setSelectedHour}
          calLang={context.language}
        />

        {/* <div className="mt-5 d-flex justify-content-center mb-3">
          <button type="button" className="btn btn-primary px-4" onClick={handleClick} style={{ borderRadius: '7px' }}>Crear Actividad</button>
        </div> */}
        <div className="my-5 d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-primary px-4 text-capitalize"
            onClick={handleClick}
          >
            {context.getText().createActivity}
          </button>
        </div>

      </Form>
    </NavBarTemplate>
  );
}