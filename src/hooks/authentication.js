import { getCookie, setCookie } from "./helper";

export const setLoggedIn = (data) => {
    setCookie('userLogin', data.user_login, 30);
    setCookie('userCaps', data.user_caps, 30);
}

export const setLoggedOut = () => {
    setCookie('userLogin', '', -30);
    setCookie('userCaps', '', -30);
}

export const isLoggedIn = getCookie( 'userLogin' ) !== '';