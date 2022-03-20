import React, { Fragment } from "react";
import "./styles.css";
import { HashRouter, Route, Switch } from "react-router-dom";
const WeatherHome = React.lazy(() => import("./component/Weather/WeatherHome"));

const loading = () => (
  <div className="d-flex justify-content-center">
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);
const HomePage = React.lazy(() => import("./component/Weather/HomePage"));
const App = () => {
  return (
    <Fragment>
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route
              exact
              path="/"
              name="Welcome Page "
              render={(props) => <HomePage {...props} />}
            />
            <Route
              exact
              path="/Weather"
              name="Check Weather "
              render={(props) => <WeatherHome {...props} />}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    </Fragment>
  );
};
export default App;
