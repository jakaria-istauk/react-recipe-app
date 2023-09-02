import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRecipeById } from '../../../hooks/fetchRecipe';
import Recipe from './Recipe';

const RecipeDetails = () => {
    const params = useParams();
    const [recipe, updateRecipe] = useState();
    let recipee = getRecipeById(params.id);
    console.log(recipee);
    return (
        <Recipe recipe={recipee} className={`col-md-12 recipe-details`} />
    )
}

export default RecipeDetails