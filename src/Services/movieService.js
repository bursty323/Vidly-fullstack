import http from "./httpService";

export function getMovies() {
  return http.get("http://localhost:3900/api/movies");
}
export function getMovie(movieid) {
  return http.get("http://localhost:3900/api/movies/" + movieid);
}

export function saveMovie(movie) {
  if (movie._id) {
    let body = { ...movie };
    delete body._id;
    return http.put("http://localhost:3900/api/movies/" + movie._id, body);
  }
  return http.post("http://localhost:3900/api/movies/", movie);
}
export function deletemovie(id) {
  return http.delete("http://localhost:3900/api/movies" + "/" + id);
}
