import { defer } from "react-router-dom";
import { apiBaseUrl } from "./helper";

const baseUrl = apiBaseUrl + '/recipe-api/v1';

export const getAllRecipes = async (params) => {
    let url = baseUrl + '/recipes';

	if (params?.id) {
		url = url + '/' + params.id;
	}

    console.log(url);
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