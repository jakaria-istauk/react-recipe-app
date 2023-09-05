import axios from "axios";
import { apiBaseUrl } from "./helper";

export const authenticatUser = async (params) => {
    let url = apiBaseUrl + '/user/login';

    const response = await axios.post(url, params, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response.data;
}

export const registerUser = async (params) => {
    let url = apiBaseUrl + '/user/signup';

    const response = await axios.post(url, params, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response.data;
}