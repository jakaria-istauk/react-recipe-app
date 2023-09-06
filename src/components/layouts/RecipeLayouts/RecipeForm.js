import React, { useCallback, useEffect, useRef, useState } from 'react'
import Recipe from './Recipe';
import { useParams } from 'react-router-dom';
import { createRecipe, getRecipeByIdSlug, updateRecipe } from '../../../hooks/recipeApiHandler';
import Loader from '../../common/Loader';
import Alert from '../../common/Alert';

const RecipeForm = () => {
    const params = useParams();
    const [pageTitle, updatePageTitle] = useState('Add a new Recipe');
    const [isEditMode, setisEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState();
    const [statue, setStatus] = useState();
    const [recipe, setRecipe] = useState(
        {
            image: 'https://placehold.co/800?text=Recipe+Image&font=merienda',
            title: 'Recipe Name',
            ingredients: 'Ingredients 1, Ingredients 2, Ingredients 3',
            instructions: 'This recipe made with this process'
        }
    );

    const handlePreview = useCallback(e => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        });
    });

    if(params?.id){
        useEffect(()=>{
            getRecipeByIdSlug(params).then((data)=>{
                setRecipe(data);
                setIsLoading(false);
                setisEditMode(true);
                updatePageTitle(`Edit ${data?.title}`)
            });
        },[])
    }
    else{
        useEffect(()=>{
            setIsLoading(false);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        const formData = new FormData(e.target);

        if(!isEditMode){
            createRecipe(formData).then((response)=>{
                if( response?.status ){
                    
                }
                
                setSubmitted(false);
                setStatus(response?.data?.status);
                setMessage(response?.data?.message);

            }).catch((error)=>{
                console.log(error)
            })
        }
        else{
            updateRecipe(formData).then((response)=>{
                if( response?.status ){
                    updatePageTitle(`Edit ${formData.get('title')}`);
                }
                setSubmitted(false);
                setStatus(response?.data?.status);
                setMessage(response?.data?.message);
            })
        }
    }

  return (
    <>
    {
        isLoading ? <Loader /> :
    
        <form action="#" method='post' onSubmit={handleSubmit}> 
            {message ? <Alert key={Date.now()} message={message} type="success" closable={false} /> : ''}
            <h1 className="display-6 text-center mb-4">{pageTitle}</h1>
            <div className='row'>
                <div className='col-md-8'>
                    <div className='card p-4'>
                        { isEditMode ? <input type='hidden' name='id' defaultValue={recipe?.id} /> : '' }
                        <div className="mb-3">
                            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                            <input defaultValue={ isEditMode ? recipe.title : ''} id="name" name='title' type="text" className="form-control-plaintext border p-2 rounded" onKeyUp={handlePreview} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="col-sm-2 col-form-label">Image Url</label>
                            <input defaultValue={ isEditMode ? recipe.image : ''} id="image" name='image_url' type="text" className="form-control-plaintext border p-2 rounded" onChange={handlePreview} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ingredients" className="col-sm-2 col-form-label">Ingredients</label>
                            <input defaultValue={ isEditMode ? recipe.ingredients : ''} id="ingredients" name='ingredients' type="text" className="form-control-plaintext border p-2 rounded" placeholder='Ingredients 1, Ingredients 2, Ingredients 3' onKeyUp={handlePreview} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="recipe" className="col-sm-2 col-form-label">How to cook</label>
                            <textarea defaultValue={ isEditMode ? recipe.instructions : ''} id="recipe" name='instructions' className="form-control-plaintext border p-2 rounded" onKeyUp={handlePreview} rows={5} required></textarea>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary" disabled={isSubmitted}>
                            {
                                isSubmitted ? 
                                <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                { isEditMode ? 'Updating...' : 'Creating...' } Recipe
                                </>
                                : `${ isEditMode ? 'Update' : 'Create' } Recipe`
                            }
                            
                                </button>
                        </div>
                    </div>
                </div>
                <Recipe recipe={recipe} className={`col-md-4`} isPreview={true} />
            </div>
        </form>
    }
    </>
  )
}

export default RecipeForm;
