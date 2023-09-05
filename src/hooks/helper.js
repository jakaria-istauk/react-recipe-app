import {baseSite} from '../config';
export const stripTrailingSlashFromUrl = function(url) {
    if (url.endsWith('/')) {
        return url.slice(0, -1);
    }
    return url;
}
export const apiBaseUrl = stripTrailingSlashFromUrl(baseSite)+'/wp-json/recipe-api/v1';