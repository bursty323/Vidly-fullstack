import httpService from "./httpService";
const apiendpoint = "http://localhost:3900/api/users";

export function register(user) {
  return httpService.post(apiendpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
