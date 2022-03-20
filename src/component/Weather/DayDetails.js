import React, { Fragment } from "react";
const moment = require("moment");
const DayDetails = ({ reading }) => {
  let newDate = new Date();
  const weekday = reading.dt * 1000;
  newDate.setTime(weekday);
  return (
    <Fragment>
      <div className="col">
        <div className="card">
          <h2>{moment(newDate).format("dddd")}</h2>
          <p className="text-muted">
            <strong> {moment(newDate).format("MMMM Do, h:mm a")}</strong>
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
    </Fragment>
  );
};
export default DayDetails;
