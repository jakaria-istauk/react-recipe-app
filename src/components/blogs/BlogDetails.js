import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPost } from '../../hooks/blogsApiHandler';
import Blog from './Blog';
import { Link } from 'react-router-dom';

const BlogDetails = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [content, setContent] = useState({__html:''});
    let placeholderImage = 'https://placehold.co/800?text=Blog+Image&font=merienda';

    useEffect(()=>{
        getPost(params).then((data)=>{
            setPost(data);
            setContent({__html:post?.content?.rendered.slice(0,100)})
        });
    },[])

  return (
    <div>
        <div className="card">
            <img src={post.image ? post.image : placeholderImage} className="card-img-top image-square" alt={post?.title?.rendered}/>
            <div className="card-body">
                <h1 className="card-title">{post?.title?.rendered}</h1>
                <div className="card-text" dangerouslySetInnerHTML={{__html:post?.content?.rendered}}></div>
            </div>
        </div>
    </div>
  )
}

export default BlogDetails