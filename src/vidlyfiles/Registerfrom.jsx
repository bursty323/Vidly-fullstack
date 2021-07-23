import React, { Component } from "react";
import Joi from "joi-browser";
import Lform from "./../Forms/loginform-form";
import { register } from "../Services/userservice";

class Registerform extends Lform {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };
  dosubmit = async () => {
    try {
      const resp = await register(this.state.data);
      localStorage.setItem("token", resp.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
      }
      console.log(ex);
      // const err = { ...this.state.errors };
      // err.username = ex.response.data;
      // this.setState({ errors: err });
    }
    // console.log("submitted");
  };
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handlesubmit}>
          {this.renderinput("username", "Username")}
          {this.renderinput("password", "Password", "password")}
          {this.renderinput("name", "Name")}
          {this.renderbutton("Register")}
        </form>
      </div>
    );
  }
}

export default Registerform;
