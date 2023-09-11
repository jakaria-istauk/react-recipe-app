import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { deleteRecipeByID, getRecipeByIdSlug } from '../../../hooks/recipeApiHandler';
import Loader from '../../common/Loader';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../../../hooks/authentication';
import { recipeImagePlaceHolder, userPostHash } from '../../../hooks/helper';
import { Navigate } from 'react-router-dom';
import Alert from '../../common/Alert';

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
    const [isDeleted, setIsDeleted] = useState(false);
    const [message, setMessage] = useState(false);
    const [processing, setProcessing] = useState(false);
    let userCanEdit = userPostHash();

    useEffect(()=>{
        getRecipeByIdSlug(params).then((data)=>{
            if( data?.id ){
                updateRecipe(data);
                setIsLoading(false);
            }
        });
    },[]);

    const deleteRecipe = useCallback((id) => {
        setProcessing(true);
        deleteRecipeByID(id).then((response)=>{
            if( response?.data?.status ){
                setTimeout(()=>{
                    setIsDeleted(true);
                }, 1500);
            }
            setProcessing(false);
            setMessage(response?.data?.message);
        });
    })

    const imageHightHandler = useCallback(()=>{
        setFullImage(!fullImage);
    })
    return (
        <>
        {
            isDeleted ? <Navigate to='/' /> : ''
        }
        {
            isLoading ? <Loader/> : 
            <div className='col-md-12 recipe-details-page'>
                {message ? <Alert key={Date.now()} message={message} type="success" closable={false} /> : ''}
                <div className='card p-3'>
                    <h1 className='card-title'>
                        {recipe.title}
                        { isLoggedIn && userCanEdit == recipe?.user_hash ? 
                         <>
                        <Link to={`/recipe/edit/${recipe.slug}`} className="btn btn-outline-primary ms-3">Edit</Link>
                        <button onClick={()=>deleteRecipe(recipe.id)} className="btn btn-outline-danger ms-3">{ processing ? 'Deleting....' : 'Delete' }</button>
                         </>
                        : ''}
                    </h1>
                    <div className='mb-3'>
                        {recipe.ingredients.split(",")?.map((ingredient, index)=> <Ingredient key={index} ingredient={ingredient} />)}
                    </div>
                    <img title={fullImage?'Click to collaps':'click to see full image'} onClick={imageHightHandler} src={recipe.image ? recipe.image : recipeImagePlaceHolder} className={`card-img-top image-${fullImage?'':'square'}`} alt={recipe.title}/>
                    <div className="card-text mt-4" dangerouslySetInnerHTML={{__html: recipe.instructions }}></div>
                </div>
            </div>
        }
        </>
    )
}

export default RecipeDetails