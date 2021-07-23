import "./App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import jwtdecode from "jwt-decode";
import Movies from "./components/movies";
import NavBar from "./vidlyfiles/navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import Products from "./vidlyfiles/products";
import Posts from "./vidlyfiles/post";
import Dashboard from "./vidlyfiles/dashboard";
import Productdetails from "./vidlyfiles/productdetail";
import Movieid from "./vidlyfiles/moviedfakeid";
import Loginform from "./Forms/loginform";
import Registerform from "./vidlyfiles/Registerfrom";
import Movieform from "./Forms/movieform";
import Logout from "./vidlyfiles/logout";

class App extends Component {
  state = {};
  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtdecode(jwt);
      this.setState({ user });
    } catch (ex) {}
  }
  render() {
    return (
      <div>
        <NavBar user={this.state.user} />
        <div className="container">
          <Switch>
            <Route path="/products/:id" component={Productdetails} />
            <Route path="/products" component={Products}></Route>
            <Route path="/posts" component={Posts}></Route>
            <Route path="/admin" component={Dashboard}></Route>
            <Route path="/login" component={Loginform}></Route>
            <Route //protecting route
              path="/movies/:id"
              render={(props) => {
                //injected by react
                if (!this.state.user)
                  return (
                    <Redirect
                      to={{
                        pathname: "/login",
                      }}
                    />
                  );
                return <Movieform {...props} />;
              }}
            ></Route>
            <Route path="/movies/:_id" component={Movieid} />
            <Route path="/logout" component={Logout}></Route>
            <Route path="/Register" component={Registerform} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            ></Route>
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/notfound" />
            {/* <Route path="/" component={Movies}></Route> */}
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
