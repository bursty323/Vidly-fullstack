import httpService from "./httpService";
const apiendpoint = "http://localhost:3900/api/auth";

export function login(data) {
  return httpService.post(apiendpoint, {
    email: data.username,
    password: data.password,
  });
}
