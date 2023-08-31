import { useEffect, useReducer } from "react";

function getData(key, defaultValue){
    const value = JSON.parse(localStorage.getItem(key));

    if(!value){
        return defaultValue;
    }

    return value;
}

const INITIAL_STATE = {
    isLoggedIn: false,
    recipes: [],
    users: []
};

function getInitialData( initData ){
    let data = {};
    Object.keys(initData).map(key=>{
        data[key] = getData( key, initData[key] );
    })

    return data;
}

export default function useStorage(){
    const [state, dispatch] = useReducer((state, {type, ...payload})=>{
        switch(type){
            case "LOGIN":{
                return {...state, isLoggedIn:true };
            }

            case "REGISTER_USER":{
                return { ...state, users:[ ...state.users, payload ]}
            }

            default:
                return state;
        }
    }, INITIAL_STATE, getInitialData );

    useEffect(()=>{
        Object.keys(state).map( key =>{
            localStorage.setItem(key, JSON.stringify(state?.[key]))
        });
    }, [state]);

    const getValue = ( key ) => {
        return state?.[key];
    }

    return [getValue, dispatch];
}