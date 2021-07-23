import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./like";
import Tablebody from "./tablebody";
import Tableheader from "./tableheader";
import jwtdecode from "jwt-decode";

class Movietable extends Component {
  columns = [
    {
      path: "title",
      label: " Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: " Genre" },
    { path: "numberInStock", label: " Stock" },
    { path: "dailyRentalRate", label: " Rate" },
    {
      label: "Like",
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onlike={() => this.props.handlelike(movie)} />
      ),
    },
  ];

  constructor() {
    super();
    let user;
    try {
      const jwt = localStorage.getItem("token");
      user = jwtdecode(jwt);
    } catch (ex) {}
    if (user && user.isAdmin) {
      this.columns.push({
        label: "Delete",
        key: "delete",
        content: (movie) => (
          <button
            onClick={() => this.props.onDelete(movie)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        ),
      });
    }
  }

  render() {
    const { sortColumn, pagemovies, onDelete, handlelike, onsort } = this.props;
    return (
      <table className="table table-hover">
        <Tableheader
          columns={this.columns}
          onsort={onsort}
          sortColumn={sortColumn}
        />
        <Tablebody
          data={pagemovies}
          columns={this.columns}
          sortColumn={sortColumn}
        />
      </table>
    );
  }
}

export default Movietable;
