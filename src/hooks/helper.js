
export const stripTrailingSlash = function(str){
    return str.replace(/\/\/*/g,"/").replace(/\/+$/,"");
}

export const apiBaseUrl = 'http://wp-api.test/wp-json'