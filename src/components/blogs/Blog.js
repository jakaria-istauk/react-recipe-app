import React from 'react'
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../../hooks/authentication';

const Blog = ({post, className, isPreview}) => {
    let placeholderImage = 'https://placehold.co/800?text=Blog+Image&font=merienda';
    const content = {__html:post?.content?.rendered.slice(0,80)+'...'};
  return (
    <div className={className}>
        <div className="card">
            { isPreview ? <h6 className='card-header text-center'>Recipe Preview</h6> : '' }
            <img src={post.image ? post.image : placeholderImage} className="card-img-top image-square" alt={post.title}/>
            <div className="card-body">
                <h5 className="card-title">{post.title.rendered}</h5>
                <div className="card-text" dangerouslySetInnerHTML={content}></div>
                {
                    !isPreview ? 
                    <>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <Link to={`/blog/${post.id}`} className="btn btn-primary">View Details</Link>
                            {/* {isLoggedIn ? <Link to={`/blog/edit/${post.id}`} className="btn btn-outline-primary">Edit Post</Link> : ''} */}
                        </div>
                    </> : ''
                }
            </div>
        </div>
    </div>
  )
}

export default Blog