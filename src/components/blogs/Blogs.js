import React, { useEffect, useState } from 'react'
import { getPost } from '../../hooks/blogsApiHandler'
import Blog from './Blog';

const Blogs = () => {
    const [posts, setPosts] = useState();

    useEffect(()=>{
        getPost().then((data)=>{
            setPosts(data);
        })
    },[])
    console.log(posts);
  return (
    <div className='row gy-3'>{posts?.map((post => <Blog key={post.id} post={post} className={`col-md-3 p-1`} />))}</div>
  )
}

export default Blogs