import React, { useCallback, useEffect, useRef, useState } from 'react'
import Recipe from './Recipe';
import { useDispatch } from 'react-redux';
import { addNewRecipe, updateRecipe } from '../../redux/reducers';
import { useParams } from 'react-router-dom';
import { getRecipeByIdSlug } from '../../../hooks/recipeApiHandler';
import Loader from '../../common/Loader';

const RecipeForm = () => {
    const dispatchAction = useDispatch();
    const params = useParams();
    const [pageTitle, updatePageTitle] = useState('Add a new Recipe');
    const [isEditMode, setisEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [recipe, setRecipe] = useState(
        {
            image: 'https://placehold.co/800?text=Recipe+Image&font=merienda',
            title: 'Recipe Name',
            ingredients: 'Ingredients 1, Ingredients 2, Ingredients 3',
            description: 'This recipe made with this process'
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
        const formData = new FormData(e.target);
        console.log(formData);

        // if(!isEditMode){
        //     dispatchAction( addNewRecipe(newRecipe) );
        // }
        // else{
        //     dispatchAction( updateRecipe(newRecipe) );
        // }
    }

  return (
    <>
    {
        isLoading ? <Loader /> :
    
        <form action="#" method='post' onSubmit={handleSubmit}> 
            <h1 className="display-6 text-center mb-4">{pageTitle}</h1>
            <div className='row'>
                <div className='col-md-8'>
                    <div className='card p-4'>
                        { isEditMode ? <input type='hidden' name='id' defaultValue={recipe?.id} /> : '' }
                        <div className="mb-3">
                            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                            <input defaultValue={ isEditMode ? recipe.title : ''} id="name" name='title' type="text" className="form-control-plaintext border p-2 rounded" onKeyUp={handlePreview} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="col-sm-2 col-form-label">Image Url</label>
                            <input defaultValue={ isEditMode ? recipe.image : ''} id="image" name='image' type="text" className="form-control-plaintext border p-2 rounded" onChange={handlePreview} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ingredients" className="col-sm-2 col-form-label">Ingredients</label>
                            <input defaultValue={ isEditMode ? recipe.ingredients : ''} id="ingredients" name='ingredients' type="text" className="form-control-plaintext border p-2 rounded" placeholder='Ingredients 1, Ingredients 2, Ingredients 3' onKeyUp={handlePreview} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="recipe" className="col-sm-2 col-form-label">How to cook</label>
                            <textarea defaultValue={ isEditMode ? recipe.description : ''} id="recipe" name='description' className="form-control-plaintext border p-2 rounded" onKeyUp={handlePreview} rows={5}></textarea>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary">{ isEditMode ? 'Update' : 'Save' } Recipe</button>
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
