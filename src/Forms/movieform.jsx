import React from "react";
import Lform from "./loginform-form";
import Joi from "joi-browser";
import { getGenres } from "./../Services/GenreService";
import { getMovie, saveMovie } from "./../Services/movieService";

class Movieform extends Lform {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    genres: [],
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rate"),
  };
  async componentDidMount() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
    const MovieId = this.props.match.params.id;
    if (MovieId === "new") return;
    const { data: movie } = await getMovie(MovieId);
    if (!movie) return this.props.history.replace("/not-found");
    this.setState({ data: this.maptoviewmodel(movie) });
  }

  maptoviewmodel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };
  dosubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };
  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handlesubmit}>
          {this.renderinput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderinput("numberInStock", "Number in Stock")}
          {this.renderinput("dailyRentalRate", "Rate")}
          {this.renderbutton("Save")}
        </form>
      </div>
    );
  }
}

export default Movieform;
