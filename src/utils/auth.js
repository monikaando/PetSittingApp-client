// import Axios from "axios";
// import qs from "qs";

export const userExist = (user)=> {
    return JSON.parse(window.localStorage.getItem("user"));
}