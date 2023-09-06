import {baseSite} from '../config';
export const stripTrailingSlashFromUrl = function(url) {
    if (url.endsWith('/')) {
        return url.slice(0, -1);
    }
    return url;
}
export const apiBaseUrl = stripTrailingSlashFromUrl(baseSite)+'/wp-json/recipe-api/v1';

export const setCookie = (key, value, expdays) => {
    const d = new Date();
    d.setTime(d.getTime() + (expdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = key + "=" + value + ";" + expires + ";path=/";
}

export const getCookie = (key) => {
    let name = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

export const userPostHash = () =>{
  let userCaps = getCookie('userCaps');
  if(!userCaps){
    return false;
  }
  userCaps = JSON.parse(atob(userCaps));
  
  return userCaps?.edit_cap;
}

export const recipeImagePlaceHolder = 'https://placehold.co/800?text=Recipe+Image&font=merienda'