import React, { useCallback, useEffect, useRef, useState } from 'react'
import Recipe from './Recipe';
import { useDispatch } from 'react-redux';
import { addNewRecipe } from '../../redux/reducers';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../../../hooks/fetchRecipe';

const RecipeForm = () => {
    const dispatchAction = useDispatch();
    const params = useParams();
    const [pageTitle, updatePageTitle] = useState('Add a new Recipe');
    const [recipe, setRecipe] = useState(
        {
            image: 'https://placehold.co/800?text=Recipe+Image&font=merienda',
            title: 'Recipe Name',
            ingredients: 'Ingredients 1, Ingredients 2, Ingredients 3',
            recipe: 'This recipe made with this process'
        }
    );

    useEffect(()=>{
        if( typeof params !== undefined ){
            let _recipe = getRecipeById(params.id);
            if( typeof _recipe !== undefined ){
                setRecipe(_recipe);
            }
            console.log(recipe)
            updatePageTitle(`Edit Recipe : ${_recipe?.title}`)
        }
    },[])

    const handlePreview = useCallback(e => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        });
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const newRecipe = {
            id: Date.now(),
            title: formData.get('title'),
			image: formData.get('image'),
			ingredients: formData.get('ingredients'),
            recipe: formData.get('recipe')
		}

        dispatchAction( addNewRecipe(newRecipe) );
    }
  return (
    <form action="#" method='post' onSubmit={handleSubmit}> 
        <h1 className="display-6 text-center">{pageTitle}</h1>
        <div className='row'>
            <div className='col-md-8'>
                <div className='card p-4'>
                    <div className="mb-3">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                        <input defaultValue={recipe.title} id="name" name='title' type="text" className="form-control-plaintext border p-2 rounded" onKeyUp={handlePreview} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="col-sm-2 col-form-label">Image Url</label>
                        <input defaultValue={recipe.image} id="image" name='image' type="text" className="form-control-plaintext border p-2 rounded" onChange={handlePreview} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ingredients" className="col-sm-2 col-form-label">Ingredients</label>
                        <input defaultValue={recipe.ingredients} id="ingredients" name='ingredients' type="text" className="form-control-plaintext border p-2 rounded" placeholder='Ingredients 1, Ingredients 2, Ingredients 3' onKeyUp={handlePreview} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="recipe" className="col-sm-2 col-form-label">How to cook</label>
                        <textarea defaultValue={recipe.recipe} id="recipe" name='recipe' className="form-control-plaintext border p-2 rounded" onKeyUp={handlePreview}></textarea>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Save Recipe</button>
                    </div>
                </div>
            </div>
            <Recipe recipe={recipe} className={`col-md-4`} isPreview={true} />
        </div>
    </form>
  )
}

export default RecipeForm;
