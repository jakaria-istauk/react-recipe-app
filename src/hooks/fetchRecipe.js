
export const getAllRecipes = () => {
    let data = JSON.parse(window.localStorage.getItem( 'my_recipe_app' ) );
    return data?.recipes;
}

export const getRecipeById = (id) => {
    let recipes = getAllRecipes();
    let recipe = recipes?.filter(recipe => recipe.id == id);
    return recipe?.[0];
}