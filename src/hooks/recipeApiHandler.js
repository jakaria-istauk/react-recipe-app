import { defer } from "react-router-dom";
import { apiBaseUrl, getCookie } from "./helper";
import axios from "axios";

axios.defaults.baseURL = apiBaseUrl;
axios.defaults.headers.common['Authorization'] = getCookie('userLogin');

export const getAllRecipes = async (params) => {
    let url = apiBaseUrl + '/recipes';

	if (params?.id) {
		url = url + '/' + params.id;
	}

    let apiData = await fetch(url).then(( res ) => {
		if( ! res.ok ) {
			throw new Error('Data fetching error');
		}

		return res;
	}).then((res) => res.json());
    return apiData;
}

export const getRecipeByIdSlug = async (params) => {
    let url = apiBaseUrl + '/recipe/'+ params.id;

    let apiData = await fetch(url).then(( res ) => {
		if( ! res.ok ) {
			throw new Error('Data fetching error');
		}

		return res;
	}).then((res) => res.json());
    return apiData;
}

export const createRecipe = async ( params ) => {
	const response = await axios.post('/recipe', params, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response;
}
export const updateRecipe = async ( params ) => {

	const response = await axios.put('/recipe/'+params.get('id'), params, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response;
}

export const deleteRecipeByID = async (id) => {
	const response = await axios.delete('/recipe/'+id);
	return response;
}

export const getRecipeById = (id) => {
    let recipes = getAllRecipes();
    let recipe = recipes?.filter(recipe => recipe.id == id);
    return recipe?.[0];
}