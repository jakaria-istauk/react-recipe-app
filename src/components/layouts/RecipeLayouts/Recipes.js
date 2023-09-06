import React, { useState,useEffect, useCallback } from 'react'
import Recipe from './Recipe';
import { getAllRecipes } from '../../../hooks/recipeApiHandler';
import { Link } from 'react-router-dom';
import Loader from '../../common/Loader';
import { updateRecipe } from '../../redux/reducers';
import { useDispatch } from 'react-redux';

const Recipes = () => {
  const dispatchAction = useDispatch();
  const [recipes, setRecipes] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
      getAllRecipes().then((data)=>{
        setRecipes(data);
        setIsLoading(false);
      })
  },[])

  const deletePost = useCallback((e)=>{

    dispatchAction(updateRecipe(parseInt(e.target.getAttribute('data-id'))))

      console.log( parseInt(e.target.getAttribute('data-id')), recipes);
  })
  return (
    <div className='row gy-3'>
        {
          isLoading ? <Loader/> :
          recipes?.map( recipe => <Recipe key={recipe.id} recipe={recipe} className={`col-md-3 p-1`} deletePost={deletePost} /> )
        }
    </div>
  )
}

export default Recipes;