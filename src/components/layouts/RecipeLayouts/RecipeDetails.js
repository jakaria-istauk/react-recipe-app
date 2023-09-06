import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getRecipeByIdSlug } from '../../../hooks/recipeApiHandler';
import Recipe from './Recipe';
import Loader from '../../common/Loader';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../../../hooks/authentication';
import { recipeImagePlaceHolder, userPostHash } from '../../../hooks/helper';

const Ingredient = ({ingredient}) => {
    return(
        ingredient !== '' ? <span className="badge bg-primary me-1">{ingredient}</span> : ''
    )
}

const RecipeDetails = () => {
    const params = useParams();
    const [recipe, updateRecipe] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [fullImage, setFullImage] = useState(false);
    let userCanEdit = userPostHash();

    useEffect(()=>{
        getRecipeByIdSlug(params).then((data)=>{
            if( data?.id ){
                updateRecipe(data);
                setIsLoading(false);
            }
        });
    },[]);

    const imageHightHandler = useCallback(()=>{
        setFullImage(!fullImage);
    })
    return (
        <>
        {
            isLoading ? <Loader/> : 
            <div className='col-md-12 recipe-details-page'>
                <div className='card p-3'>
                    <h1 className='card-title'>
                        {recipe.title}
                        {isLoggedIn && userCanEdit == recipe?.user_hash ? <Link to={`/recipe/edit/${recipe.slug}`} className="btn btn-outline-primary ms-3">Edit Recipe</Link> : ''}
                    </h1>
                    <div className='mb-3'>
                        {recipe.ingredients.split(",")?.map((ingredient, index)=> <Ingredient key={index} ingredient={ingredient} />)}
                    </div>
                    <img title={fullImage?'Click to collaps':'click to see full image'} onClick={imageHightHandler} src={recipe.image ? recipe.image : recipeImagePlaceHolder} className={`card-img-top image-${fullImage?'':'square'}`} alt={recipe.title}/>
                    <div className="card-text my-5" dangerouslySetInnerHTML={{__html: recipe.instructions }}></div>
                </div>
            </div>
        }
        </>
    )
}

export default RecipeDetails