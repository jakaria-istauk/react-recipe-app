export const setLoggedIn = (data) => {
    window.localStorage.setItem( 'isLoggedIn', data )
}

export const setLoggedOut = () => {
    window.localStorage.removeItem( 'isLoggedIn' );
}

export const isLoggedIn = window.localStorage.getItem( 'isLoggedIn' ) === 'true';