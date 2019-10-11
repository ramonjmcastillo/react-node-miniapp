import React from "react";
import "./App.css";
import MoviesList from "./components/Movie/MoviesList";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MoviePage from "./components/Movie/MoviePage";
import SignInSignUp from "./components/SignInSignUp/SignInSignUp";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { useAuth0 } from "./auth0/react-auth0-wrapper";
import Spinner from "./components/Spinner/Spinner";
import ExternalApi from "./components/ExternalApi/ExternalApi";

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Spinner />;
  }

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={MoviesList} />
        <Route exact path="/movie/:movieIndex" component={MoviePage} />
        <Route exact path="/login" component={SignInSignUp} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute path="/external-api" component={ExternalApi} />
      </Switch>
    </Router>
  );
};

export default App;
