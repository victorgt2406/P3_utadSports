import React, { useState, useContext, useEffect, useRef} from "react";
import { CONTEXT } from "../utils/Context";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  subMonths,
  addMonths,
  parseISO
} from "date-fns";
import "./styles.css"
import axios from "axios";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { es, enUS } from "date-fns/locale";
import { ICONS_SPORTS } from "../utils/Icons";

interface Props {
  value: Date;
  sport: string | null;
  selectedHour: number | null;
  onValueChange: (value: Date) => void;
  onSelectedHourChange: (selectedHour: number | null) => void;
}

interface HourObject {
  hour: number;
  matches: any[];
}


const Calendar: React.FC<Props> = React.memo(({ sport, onValueChange, onSelectedHourChange}) => {

  // your code here
  const context = useContext(CONTEXT);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeDate, setActiveDate] = useState(new Date());
  const [hourObjects, setHourObjects] = useState<HourObject[]>([]);
  const [hourPasser, setHourPasser] = useState(Number);
  const hourListRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const axiosInstance = axios.create({
    baseURL: window.location.origin,
  });
  axiosInstance.interceptors.request.use((config) => {
    const apiURL = config.headers['X-API-URL'];
    config.baseURL = apiURL ? apiURL : config.baseURL;
    return config;
  });
  const filteredHourObjects = hourObjects.map(hourObject => {
    return {
      ...hourObject,
      matches: hourObject.matches.filter(match => {
        const matchDate = new Date(match.date);
        return matchDate.getFullYear() === selectedDate.getFullYear() &&
          matchDate.getMonth() === selectedDate.getMonth() &&
          matchDate.getDate() === selectedDate.getDate();
      })
    };
  });

  const handleHourClick = (hour: number) => {
    const scrollTop = hourListRef.current?.scrollTop ?? 0;
    setScrollPosition(scrollTop);
    setHourPasser(hour);
    if (hourListRef.current) {
      hourListRef.current.scrollTop = scrollTop;
    }
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const today = date || new Date();
    setSelectedDate(today);
    cycleMatches(today, sport);
    onValueChange(date);
  }
  useEffect(() => {
  }, [context.language]);

  const cycleMatches = async (date: Date, sport: string | null) => {
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 24, 0, 0, 0);


    const activities = await axiosInstance.get(`${context.apiUrl}/activities/calendar`, {
      params: {
        startOfDay: startOfDay,
        endOfDay: endOfDay,
      },
    });
    
    console.log(activities);

    const hourObjects: HourObject[] = [];

    for (let i = 0; i < 10; i++) {
      hourObjects.push({
        hour: i + 12,
        matches: []
      });
    }

    let lastHour = -1;
    let matchCount = 0;

    activities.data.forEach((match: any) => {
      const startHour = new Date(match.date).getHours();
      const endHour = startHour + 1;

      if (sport === "basketball" && match.sport === "basketball") {
        if (startHour === lastHour) {
          matchCount++;
        } else {
          lastHour = startHour;
          matchCount = 1;
        }
      } else {
        matchCount = 0;
      }

      for (let i = startHour; i < endHour; i++) {
        const index = i - 12; // subtract 12 to get zero-based index

        if (hourObjects[index] && sport === "padel" && match.sport === "padel") {
          if (hourObjects[index].matches.length < 1) {
            hourObjects[index].matches.push(match);
          }
        }
        else if (hourObjects[index] && sport === "football" && (match.sport === "football" || match.sport === "basketball")) {
          if (hourObjects[index].matches.length < 1) {
            hourObjects[index].matches.push(match);
          }
        }
        else if (hourObjects[index] && sport === "basketball" && match.sport === "football") {
          if (hourObjects[index].matches.length < 1) {
            hourObjects[index].matches.push(match);
          }
        } else if (hourObjects[index] && sport === "basketball" && match.sport === "basketball") {
          if (lastHour === startHour && matchCount === 2 && hourObjects[index].matches.length < 1) {
            matchCount = 0;
            hourObjects[index].matches.push(match);
          }
        }
      }
    });

    setHourObjects(hourObjects);
  };


  useEffect(() => {
    onSelectedHourChange && onSelectedHourChange(hourPasser);
    if (hourListRef.current) {
      hourListRef.current.scrollTop = scrollPosition;
    }
  }, [hourPasser]);

  useEffect(() => {
    const today = selectedDate || new Date();
    cycleMatches(today, sport);
  }, [selectedDate, sport]);

  const getHeader = () => {
    return (
      <div className="header">
        <div
          className="todayButton"
          onClick={() => {
            setSelectedDate(new Date());
            setActiveDate(new Date());
          }}
        >
          {context.language === 'es' ? 'Hoy' : 'Today'}
        </div>
        <AiOutlineLeft
          className="navIcon"
          onClick={(event) => {
            setActiveDate(subMonths(activeDate, 1));
          }}
        />
        <AiOutlineRight
          className="navIcon"
          onClick={(event) => {
            setActiveDate(addMonths(activeDate, 1));
          }}
        />
        <h2 className="currentMonth">{format(activeDate, 'MMMM yyyy', { locale: context.language === 'es' ? es : enUS })}</h2>
      </div>
    );
  };

  const getWeekDaysNames = () => {
    const weekStartDate = startOfWeek(activeDate, { weekStartsOn: 1 });
    const weekDays = [];
    const dayFormat = context.language === 'es' ? 'EEEEEE' : 'E';

    for (let day = 0; day < 7; day++) {
      weekDays.push(
        <div className="day weekNames" key={day}>
          {format(addDays(weekStartDate, day), dayFormat, { locale: context.language === 'es' ? es : enUS })}
        </div>
      );
    }

    return <div className="weekContainer">{weekDays}</div>;
  };

  const generateDatesForCurrentWeek = (date: Date, selectedDate: Date, activeDate: Date) => {
    let currentDate = date;
    const week = [];
    for (let day = 0; day < 7; day++) {
      const cloneDate = currentDate;
      week.push(
        <div key={`${cloneDate.getFullYear()}-${cloneDate.getMonth()}-${cloneDate.getDate()}`}
          className={`day ${isSameMonth(currentDate, activeDate) ? "" : "inactiveDay"
            } ${isSameDay(currentDate, selectedDate) ? "selectedDay" : ""}
          ${isSameDay(currentDate, new Date()) ? "today" : ""}
          `}
          onClick={() => handleDateClick(cloneDate)}
        >
          {format(currentDate, "d")}
        </div>
      );
      currentDate = addDays(currentDate, 1);
    }
    return week;
  };

  const getDates = () => {
    const startOfTheSelectedMonth = startOfMonth(activeDate);
    const endOfTheSelectedMonth = endOfMonth(activeDate);
    const startDate = startOfWeek(startOfTheSelectedMonth);
    const endDate = endOfWeek(endOfTheSelectedMonth);
  
    let currentDate = startDate;
  
    const allWeeks = [];
  
    let weekIndex = 0;
    while (currentDate <= endDate) {
      allWeeks.push(
        ...generateDatesForCurrentWeek(currentDate, selectedDate, activeDate).map(item => 
          React.cloneElement(item, { key: `${weekIndex++}-${item.key}` })
        )
      );
      currentDate = addDays(currentDate, 7);
    }
  
    return <div className="weekContainer">{allWeeks}</div>;
  };

  const Match: React.FC<{ match: any }> = React.memo(({ match }) => {
    const startDateTime = parseISO(match.date);
    const endDateTime = parseISO(match.date +1);
    const imgSrc =
      match.sport === "football"
        ? ICONS_SPORTS.football
        : match.sport === "padel"
          ? ICONS_SPORTS.padel
          : ICONS_SPORTS.basketball;
  
    const isSmallScreen = context.isMobile();
    const isAlignLeft = isSmallScreen ? {marginLeft: "120%" } : {};
  
    return (
      <div className={`mt-3 mb-2 d-flex ${isSmallScreen ? 'justify-content-center' : ''}`} style={{ height: "40px", ...isAlignLeft, display: 'flex', alignItems: 'center'}}>
  
        <div className="mx-4">
          {React.cloneElement(imgSrc, { style: { width: "35px", height: "35px" } })}
        </div>
        <div className="mx-1" style={{ whiteSpace: "nowrap" }}>{context.language === 'es' ? "PISTA RESERVADA" : "RESERVED COURT"}</div>
        <div className="mx-4">
          {React.cloneElement(imgSrc, { style: { width: "35px", height: "35px" } })}
        </div>
      </div>
    );
  });
  




  const [leftHeight, setLeftHeight] = useState(0);

  useEffect(() => {
    const leftDiv = document.querySelector(".border-end");
    if (leftDiv) {
      const height = leftDiv.getBoundingClientRect().height;
      setLeftHeight(height);
    }
  }, []);

  return (
    <div className="row">
      <div className="col border-end">
        <section>
          {getHeader()}
          {getWeekDaysNames()}
          {getDates()}
        </section>
      </div>
      <div className="col " >
        <section className="test">
          <h2 className="mb-4">
            <time dateTime={format(selectedDate, "yyyy-MM-dd" ,)}>
              {format(selectedDate, context.language === 'es' ? "dd MMM, yyy" : "MMM dd, yyy", { locale: context.language === 'es' ? es : enUS })}
            </time>
          </h2>
          <div className="col" style={{ height: `${leftHeight - 50}px`, overflowX: "hidden" }} ref={hourListRef}>
            {filteredHourObjects.map((hourObject, index) => (
              <div key={index}>
                <div className="row hour-row " >
                  <div className={`hour-label col-3`}>
                    {hourObject.hour}:00
                  </div>
                  <div className="hour-matches col-3 align-items-center">
                    {hourObject.matches.map((match: { id: any }) => (
                      <Match match={match} key={match.id} />
                    ))}
                  </div>
                  {!hourObject.matches.length && (
                    <div
                      className={`hour-button align-self-center py-2 ${hourPasser === hourObject.hour ? "selected" : ""}`}
                      style={{
                        cursor: "pointer",
                        backgroundColor: hourPasser === hourObject.hour ? "RGB(0, 123, 255)" : "",
                        color: hourPasser === hourObject.hour ? "#fff" : "",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleHourClick(hourObject.hour);
                        e.currentTarget.classList.add('selected');
                      }}
                    >
                      <div className="text-center">{context.language === 'es' ? "Seleccionar" : "Select"}</div>
                    </div>
                  )}
                </div>
                </div>
              ))}
              </div>
          </section>
      </div>
      <div />
    </div>
  );
}, (prevProps, nextProps) => prevProps.sport === nextProps.sport);

export default Calendar