import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import WeatherDetails from "./WeatherDetails";
import ErrorAlert from "./ErrorAlert";
import moment from 'moment'
const WeatherHome = () => {
  const [visible, setvisible] = useState(false);
  const [dailyWeather, setdailyWeather] = useState([]);
  const [AllData, setAlldata] = useState([]);
  const [formdata, setformdata] = useState({
    city: "",
    name: '',
    country: '',
    sunrise: '',
    sunset: ''
  });
  const { city, name, country, sunrise, sunset } = formdata;
  // eslint-disable-next-line
  var [alertmsg, setalertmsg] = useState("");
  const onchange = (e) =>
    setformdata({ ...formdata, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const url =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=f923a7ce40934e0a6b74726e3923c901";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const dailyData = data.list.filter((reading) =>
          reading.dt_txt.includes("12:00:00")
        );
        setdailyWeather(dailyData);
        setAlldata(data.list);
        setformdata({
          name: data.city.name, country: data.city.country, sunrise: moment.unix(data.city.sunrise).format("LTS"),
          sunset: moment.unix(data.city.sunset).format('LTS')
        })
      })

      .catch((error) => {
        setvisible(true, () => {
          setalertmsg("error");
        });

        setTimeout(() => {
          setvisible(false);
        }, 3000);
      });
    setformdata({ city: "" })
  };

  const weatherdetail = () => {
    return dailyWeather.map((reading, index) => (
      <WeatherDetails reading={reading} key={index} alldata={AllData} />
    ));
  };

  return (
    <div className="container">
      <div
        className="row justify-content-md-center"
        style={{
          background:
            "linear-gradient(0deg, rgba(249,220,133,0.196516106442577) 0%, rgba(240,236,228,1) 100%)",
          borderRadius: "20px"
        }}
      >
        {" "}
        <div className="row justify-content-md-center">
          <h1 className="display-1 ">5-Day Forecast.</h1>
        </div>
        <div className="w-100"></div>
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <TextField
              style={{ paddingRight: '50px' }}
              id="filled-basic"
              label="Enter your city name"
              name="city"
              value={city}
              onChange={(e) => onchange(e)}
            />

            <Button
              style={{ marginTop: '10px' }}
              variant="contained"
              color="primary"
              onClick={(e) => onSubmit(e)}

            ><span style={{ marginRight: '15px' }}>Search</span> </Button>
            {visible && <ErrorAlert isOpen={visible} />}
          </div>
        </div>
      </div>
      <div className="row justify-content-md-center"><strong>{name && country && `${name}  -  ${country}`}</strong> </div>
      <div className="row justify-content-md-center"><strong>{sunrise && sunset && `Sunrise :${sunrise}  -  Sunset :${sunset}`}</strong> </div>
      <div className="row">

        {weatherdetail()}

      </div>
    </div>
  );
};
export default WeatherHome;
