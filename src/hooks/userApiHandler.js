import axios from "axios";
import { apiBaseUrl } from "./helper";

axios.defaults.baseURL = apiBaseUrl;

export const authenticatUser = async (params) => {

    const response = await axios.post('/user/login', params, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response.data;
}

export const registerUser = async (params) => {

    const response = await axios.post('/user/signup', params, {
        headers: {
            'Content-Type': 'application/json'
        },
    })

    return response.data;
}