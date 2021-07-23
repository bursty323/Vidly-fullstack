import React, { Component } from "react";
import Lform from "./loginform-form";
import { login } from "../Services/loginservice";

class Loginform extends Lform {
  dosubmit = async () => {
    //call to server
    try {
      const resp = await login(this.state.data);
      localStorage.setItem("token", resp.data);
      window.location = "/";
    } catch (ex) {
      // console.log(ex.response);
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
    // console.log("submitted");
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="p-5">
        <h1>Login Form</h1>
        <form onSubmit={this.handlesubmit}>
          {this.renderinput("username", "Username")}
          {this.renderinput("password", "Password", "password")}
          {this.renderbutton("Login")}
        </form>
      </div>
    );
  }
}

export default Loginform;
