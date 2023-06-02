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
import notify from '../utils/notify';
import { useNavigate } from 'react-router-dom';
import langEn from '../langs/langEn';
import langEs from '../langs/langEs';

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
  const [calendarKey, setCalendarKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setCalendarKey((prevKey) => prevKey + 1);
  }, [context.language]);

  useEffect(() => {
    const getTeams = async () => {
      try {
        const response = await axios.get(`${context.apiUrl}/teams/`);
        setTeams(response.data);
      } catch (err) {
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

    const formattedDate = new Date(year, date.getMonth(), date.getDate(), 0, 0, 0);
    return formattedDate.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Poppins']
      }
    });
  }, []);

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
        console.log("Creando equipo")
      }
      try {
        const activity = await axios.post(`${context.apiUrl}/activities/`, {
          sport: sport,
          name: description.current?.value,
          date: new Date(dateConverter(currentDate, selectedHour)),
          location: localitation,
          home: selectedTeam?._id,
          registeredTeams: registeredTeams,
        }, {
          headers: {
            Authorization: await context.token?.token,
            "Content-Type": "application/json",
          },
        });
        console.log('Activity POST request:', activity);
        notify("Actividad Creada", "SUCCESS", "La actividad " + (description.current?.value || '') + " ha sido creada correctamente");
        navigate(`/activities`);
      } catch (error) {
        console.log('Activity POST request failed:', error);
        notify("Error al crear la actividad", "ERROR", "Checkea que todos los campos estan rellenos, incluido la hora");
        throw error;
      }
    } else {
      console.log('Selected hour is null');
      throw new Error("Selected hour is null");
    }
  };

  const lang = context.language === 'es' ? langEs : langEn;

  return (
    <NavBarTemplate parentPage="activities" page="createActivity" info="createActivity">
      <Form style={{ fontFamily: 'Poppins' }}>
        <br></br>
        <br></br>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder={lang.activityNamePlaceholder}
            className="black-placeholder"
            style={{ paddingLeft: '2%' }}
            ref={description}
          />
        </Form.Group>

        <br></br>
        <p className="activity-heading">{lang.sportActivity}</p>

        <SportsButtons {...{ sport, setSport }} />

        <br></br>
        <div>
          <p className="activity-heading">{lang.activityTeam}</p>
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
            label={lang.openActivity}
            onChange={handleCheckboxChange}
            checked={isChecked}
          />
        </Form.Group>

        <br></br>
        <br></br>
        <p className="activity-heading">{lang.activityDay}</p>
        <Calendar
          key={calendarKey}
          value={currentDate}
          sport={sport}
          selectedHour={selectedHour}
          onValueChange={setCurrentDate}
          onSelectedHourChange={setSelectedHour}
        />

        <div className="my-5 d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-primary px-4 text-capitalize"
            onClick={handleClick}>
            {lang.createActivity}
          </button>
        </div>

      </Form>
    </NavBarTemplate>
  );
}
