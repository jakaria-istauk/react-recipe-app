import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getRecipeByIdSlug } from '../../../hooks/fetchRecipe';
import Recipe from './Recipe';
import Loader from '../../common/Loader';

const RecipeDetails = () => {
    const params = useParams();
    const [recipe, updateRecipe] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        getRecipeByIdSlug(params).then((data)=>{
            updateRecipe(data);
            setIsLoading(false);
        });
    },[])
    return (
        <>
        {
            isLoading ? <Loader/> : <Recipe recipe={recipe} className={`col-md-12 recipe-details`} />
        }
        </>
    )
}

export default RecipeDetails