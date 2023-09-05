import { defer } from "react-router-dom";
import { apiBaseUrl } from "./helper";

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

export const getRecipeById = (id) => {
    let recipes = getAllRecipes();
    let recipe = recipes?.filter(recipe => recipe.id == id);
    return recipe?.[0];
}