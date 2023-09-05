import axios from "axios";
import { apiBaseUrl } from "./helper";

export const authenticatUser = async (params) => {
    let url = apiBaseUrl + '/user/login';

    const response = await axios.post(url, params)
    console.log(response,params);
    // return apiData;
}