import React, { Component } from "react";
import { getMovies, deletemovie } from "../Services/movieService";
import { paginate } from "../utils/pagination";
import Like from "./like";
import "../index.css";
import Paginate from "./pagination";
import Listgroup from "./listgroup";
import { getGenres } from "./../Services/GenreService";
import Movietable from "./movietable";
import _ from "lodash";
import { Link } from "react-router-dom";
import Searchbox from "../searchbox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pagesize: 4,
    currentpage: 1,
    sortColumn: { path: "title", order: "asc" },
    SearchQuery: "",
    selectedgenre: null,
  };

  async componentDidMount() {
    const { data } = await getGenres();
    let genres = [{ _id: "", name: "All Genres" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }
  handleDelete = async (movie) => {
    const original = this.state.movies;
    const movies = original.filter((x) => x._id !== movie._id);
    this.setState({ movies });
    try {
      await deletemovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log("ERROR");
      }
      this.setState({ movies: original });
    }
  };
  handlelike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlechange = (page) => {
    //pagination
    this.setState({ currentpage: page });
  };
  handlegenreselect = (item) => {
    this.setState({ selectedgenre: item, SearchQuery: "", currentpage: 1 }); //currentpage ko fir zero kiya
  };
  handlesort = (item) => {
    this.setState({ sortColumn: item });
    //console.log(item);
  };
  handlesearch = (query) => {
    this.setState({ SearchQuery: query, selectedgenre: null, currentpage: 1 });
  };
  render() {
    const {
      movies,
      pagesize,
      currentpage,
      selectedgenre,
      sortColumn,
      SearchQuery,
    } = this.state;
    if (movies.length === 0) return <p>There are No Movies in the Database.</p>;
    let filtered = movies;
    if (SearchQuery) {
      filtered = movies.filter((m) =>
        m.title.toLowerCase().startsWith(SearchQuery.toLowerCase())
      );
    } else if (selectedgenre && selectedgenre._id)
      filtered = movies.filter((x) => x.genre._id === selectedgenre._id);
    const sorted = _.orderBy(filtered, sortColumn["path"], sortColumn["order"]);
    const pagemovies = paginate(sorted, pagesize, currentpage);
    return (
      <div className="row m-5">
        <div className="col-3">
          <Listgroup
            items={this.state.genres}
            textproperty="name"
            valueproperty="_id"
            onitemselect={this.handlegenreselect}
            selecteditem={this.state.selectedgenre}
          />
        </div>
        <div className="col">
          {this.props.user && (
            <Link to="/movies/new">
              <button className="btn btn-primary btm-sm margin">
                New Movie
              </button>
            </Link>
          )}
          <p>There are {filtered.length} Movies in the Database</p>
          <Searchbox
            value={SearchQuery}
            handlesearch={this.handlesearch}
          ></Searchbox>
          <Movietable
            pagemovies={pagemovies}
            onDelete={this.handleDelete}
            handlelike={this.handlelike}
            onsort={this.handlesort}
            sortColumn={this.state.sortColumn}
          />
          <Paginate
            currentpage={this.state.currentpage}
            onpagechange={this.handlechange}
            itemcount={filtered.length}
            pagesize={pagesize}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
