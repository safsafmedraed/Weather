import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import weather from "../../assets/weather.gif";
const styles = {
  backgroundImageStyle: {
    backgroundImage: `url(${weather})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: 'no-repeat',
    height: window.outerHeight
  }, weatherButton: {
    textAlign: 'center',
    paddingTop: '20%',

  }
}
const HomePage = () => {
  return (

    <div
      style={styles.backgroundImageStyle}
    >

      <div style={styles.weatherButton}>
        <Link to="/Weather">
          <Button variant="contained" color="primary" >
            Check weather
          </Button>
        </Link>
      </div>
    </div>

  );
};
export default HomePage;
