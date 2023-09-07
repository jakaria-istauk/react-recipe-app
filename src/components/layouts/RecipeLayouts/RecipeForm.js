import React, { useCallback, useEffect, useRef, useState } from 'react'
import Recipe from './Recipe';
import { useParams } from 'react-router-dom';
import { createRecipe, getRecipeByIdSlug, processMediaData, updateRecipe } from '../../../hooks/recipeApiHandler';
import Loader from '../../common/Loader';
import Alert from '../../common/Alert';

const RecipeForm = () => {
    const recipePlaceHolder = {
        image: 'https://placehold.co/800?text=Recipe+Image&font=merienda',
        title: 'Recipe Name',
        ingredients: 'Ingredients 1, Ingredients 2, Ingredients 3',
        instructions: 'This recipe made with this process'
    };

    const params = useParams();
    const [pageTitle, updatePageTitle] = useState('Add a new Recipe');
    const [isEditMode, setisEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState(false);
    const [status, setStatus] = useState();
    const [formKey, setFormKey] = useState();
    const [recipe, setRecipe] = useState(recipePlaceHolder);
    const [formDefault, setFormDefault] = useState();
    const [imgaeSrcType, setSrcImageType] = useState('url');
    const [imageFile, setImageFile] = useState();

    const handlePreview = useCallback(e => {
        setMessage(false);
        if(e.target.name == 'image' && e.target.files ){
            processMediaData(e.target.files[0]).then((response)=>{
                setImageFile(response);
                setRecipe({
                    ...recipe,
                    [e.target.name]: response
                });
            })
            
        }
        else{
            setRecipe({
                ...recipe,
                [e.target.name]: e.target.value
            });
        }
        
    });

    if(params?.id){
        useEffect(()=>{
            getRecipeByIdSlug(params).then((data)=>{
                if(data?.status){
                    setRecipe(data);
                    setFormDefault(data);
                    setIsLoading(false);
                    setisEditMode(true);
                    updatePageTitle(`Edit ${data?.title}`)
                }
            });
        },[])
    }
    else{
        useEffect(()=>{
            setIsLoading(false);
        })
    }

    const switchImgaeUploadType = useCallback((e)=>{
        setSrcImageType(e.target.value);
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        const formData = new FormData(e.target);
        if(formData.get('image_src_type')=='file'){
            formData.set('image', imageFile);
        }
        setFormDefault(formData);

        if(!isEditMode){
            createRecipe(formData).then((response)=>{
                if( response?.data?.status ){
                    setRecipe(recipePlaceHolder);
                    setFormDefault({});
                    setFormKey(Date.now());
                }

                setStatus(response?.data?.status);
                setSubmitted(false);
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
                console.log(response, 'update');
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
            {message ? <Alert key={Date.now()} message={message} type={status?'success':'danger'} closable={!status} /> : ''}
            <h1 className="display-6 text-center mb-4">{pageTitle}</h1>
            <div className='row'>
                <div className='col-md-8' key={formKey}>
                    <div className='card p-4'>
                        { isEditMode ? <input type='hidden' name='id' defaultValue={recipe?.id} /> : '' }
                        <div className="mb-3">
                            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                            <input defaultValue={formDefault?.title} id="name" name='title' type="text" className="form-control-plaintext border p-2 rounded" onKeyUp={handlePreview} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="d-flex col-sm-6 col-form-label">
                                Image
                                <select value={formDefault?.image_src_type} onChange={switchImgaeUploadType} className="form-select form-select-sm ms-1" name='image_src_type'>
                                    <option value="url">From Url</option>
                                    <option value="file">From Computer</option>
                                </select>
                            </label>
                            <input defaultValue={formDefault?.image} id="image" name='image' accept="image/*" type={imgaeSrcType=='url'?'text':imgaeSrcType} className="form-control-plaintext border p-2 rounded" onChange={handlePreview} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ingredients" className="col-sm-2 col-form-label">Ingredients</label>
                            <input defaultValue={formDefault?.ingredients} id="ingredients" name='ingredients' type="text" className="form-control-plaintext border p-2 rounded" placeholder='Ingredients 1, Ingredients 2, Ingredients 3' onKeyUp={handlePreview} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="recipe" className="col-sm-2 col-form-label">How to cook</label>
                            <textarea defaultValue={formDefault?.instructions} id="recipe" name='instructions' className="form-control-plaintext border p-2 rounded" onKeyUp={handlePreview} rows={5} required></textarea>
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
