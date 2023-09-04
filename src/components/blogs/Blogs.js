import React, { useEffect, useState } from 'react'
import { getPost } from '../../hooks/blogsApiHandler'
import Blog from './Blog';
import Loader from '../common/Loader';

const Blogs = () => {
    const [posts, setPosts] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        getPost().then((data)=>{
            setPosts(data);
            setIsLoading(false);
        })
    },[])
    console.log(posts);
  return (
    <>
    {
      isLoading ? <Loader/> : 
      <div className='row gy-3'>{posts?.map((post => <Blog key={post.id} post={post} className={`col-md-3 p-1`} />))}</div>
    }
    </>
  )
}

export default Blogs