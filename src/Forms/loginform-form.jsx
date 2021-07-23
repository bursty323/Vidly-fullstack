import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./Selectip";

class Lform extends Component {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const errors = {};
    for (let i of result.error.details) {
      //JOI generates error Messages
      errors[i.path[0]] = i.message;
    }
    return errors;

    /*const errors = {};
        const {data} = this.state;
        if(data.username.trim()==="")errors.username="Username is required";
        if(data.password.trim()==="")errors.password="Password is required";
        return Object.keys(errors).length===0? null : errors;*/
  };
  validateproperty = (input) => {
    // console.log(input);
    const obj = { [input.name]: input.value }; //custom state
    const schema = { [input.name]: this.schema[input.name] }; //custom schema
    const { error } = Joi.validate(obj, schema); // we are not aborting early & showing all the errors at once deliberately as one error repaired another will have 0th index
    return error ? error.details[0].message : null;
    /*if(input.name==='username' && input.value.trim()===""){
            return "Username is required!"
        }
        if(input.name==='password' && input.value.trim()===""){
            return "password is required!"
        }*/
  };
  handlechange = (e) => {
    //checking errors
    //console.log(Date.now(), "hi");
    const errors = { ...this.state.errors };
    const errormessage = this.validateproperty(e.currentTarget);
    if (errormessage) errors[e.currentTarget.name] = errormessage;
    else delete errors[e.currentTarget.name];
    //allowing i/p
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, errors });
  };
  handlesubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    //server call
    this.dosubmit();
  };
  renderbutton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
    {
      /*if not error found disable is false*/
    }
  }
  renderinput(name, label, type = "text") {
    return (
      <Input
        errors={this.state.errors[name]}
        handlechange={this.handlechange}
        label={label}
        name={name}
        type={type}
        value={this.state.data[name]}
      />
    );
  }
  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        errors={errors[name]}
        handlechange={this.handlechange}
        label={label}
        name={name}
        options={options}
        value={this.state.data[name]}
      />
    );
  }
}

export default Lform;
