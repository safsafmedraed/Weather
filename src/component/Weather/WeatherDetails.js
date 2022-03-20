import "./WeatherCard.css";
import React, { Fragment, useState } from "react";
import DayDetails from "./DayDetails";
const moment = require("moment");

const WeatherDetails = ({ reading, alldata }) => {
  let newDate = new Date();
  const weekday = reading.dt * 1000;
  newDate.setTime(weekday);
  const [dailyWeather, setdailyWeather] = useState([]);
  const [visible, setvisible] = useState(false);
  const singleday = (day) => {
    const single = alldata.filter((reading) => reading.dt_txt.includes(day));
    setdailyWeather(single);
    setvisible(visible === false ? true : false);
  };

  const weatherdetail = () => {
    return dailyWeather.map((reading, index) => (
      <DayDetails reading={reading} key={index} />
    ));
  };
  return (
    <Fragment>
      <div className="row">
        <div
          className="col"
          onClick={() => singleday(moment(reading.dt_txt).format("YYYY-MM-DD"))}
        >
          <div className="card">
            <h2>{moment(newDate).format("dddd")}</h2>
            <p className="text-muted">
              {moment(newDate).format("MMMM Do, h:mm a")}
            </p>
            <h2>{Math.round(reading.main.temp - 273, 15)} °C</h2>
            <h3>
              {reading.weather[0].description}
              <span>
                Wind {reading.wind.speed}km/h <span className="dot">•</span>{" "}
                Humidity
                {reading.main.humidity}%
              </span>
            </h3>

            <img
              src={`https://openweathermap.org/img/wn/${reading.weather[0].icon}@2x.png`}
              style={{ width: "150px", alignItems: "center" }}
              alt="weather"
            />
          </div>
        </div>
        <div className="row">{visible && weatherdetail()}</div>
      </div>
    </Fragment>
  );
};
export default WeatherDetails;
