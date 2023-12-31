import { apiBaseUrl, getCookie, getUserData } from "./helper";
import axios from "axios";

axios.defaults.baseURL = apiBaseUrl;
axios.defaults.headers.common['Authorization'] = getCookie('userLogin');

export const getAllRecipes = async (params) => {
	let query_params = {};

	if(params?.per_page){
		query_params.per_page = params?.per_page;
	}
	if(params?.page){
		query_params.page = params?.page;
	}
    if(params?.author){
		query_params.author = getUserData('user_name');
	}

    let apiData = await axios.get('/recipes',{params:query_params}).then(( res ) => {
		return res;
	}).catch((error) => {

    });
    return apiData?.data;
}

export const getRecipeByIdSlug = async (params) => {
    let apiData = await axios.get('/recipe/'+ params.id).then(( res ) => {
		return res;
	}).catch((error) => {

    });
    return apiData?.data;
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

const fileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

export const processMediaData = async (file) =>{
    return await fileToBase64(file);
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