import React, { useState,useEffect } from 'react'
import Recipe from './Recipe';
import { getAllRecipes } from '../../../hooks/recipeApiHandler';
import { Link } from 'react-router-dom';
import Loader from '../../common/Loader';

const Recipes = () => {
  const [recipes, setRecipes] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
      getAllRecipes().then((data)=>{
        setRecipes(data);
        setIsLoading(false);
      })
  },[])
  return (
    <div className='row gy-3'>
        {
          isLoading ? <Loader/> :
          recipes?.map( recipe => <Recipe key={recipe.id} recipe={recipe} className={`col-md-3 p-1`} /> )
        }
    </div>
  )
}

export default Recipes;