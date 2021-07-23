import React from "react";

const Input = ({ handlechange, errors, name, label, value, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        onChange={handlechange}
        value={value}
        name={name}
        id={name}
        type={type}
        className="form-control"
      />
      {errors && <div className="alert alert-danger">{errors}</div>}
    </div>
  );
};

export default Input;
