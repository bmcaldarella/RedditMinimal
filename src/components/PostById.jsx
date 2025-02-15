import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPost } from '../features/posts/postsSlice';
import { formatDistanceToNow } from 'date-fns'; 
import '../styles/card.css';
import Comments from './Comments';



const PostListbyId = ({postId})=>{
    const dispatch = useDispatch();
    const { posts, status, error } = useSelector((state) => state.posts);

    useEffect(() => {
        if (status === 'idle') {
          dispatch(fetchPost());
        }
      }, [status, dispatch]);
    
      if (status === 'loading') return <p>Loading...</p>;
      if (status === 'failed') return <p>Error: {error}</p>;

      return (
        <>
        <div>
           {postId.map((post)=>{
            const isImage = post.url && post.url.match(/\.(jpeg|jpg|gif|png)$/);
    
            const timeAgo = formatDistanceToNow(new Date(post.created_utc * 1000), { addSuffix: true });
    
            return (
              <div className='card-list' key={post.id}>
               <div>
                <p>{post.author}</p>
                <p>{timeAgo}</p> 
                </div>
              
                <h2 className='post-title'>{post.title}</h2>
    
                {isImage ? (
                  <img className='post-img' src={post.url} alt="Post-image" />
                ) : (
                  <p className='post-txt'>{post.selftext}</p>
                )}
    
                <p>{post.ups}</p>
                <p>Comments: {post.num_comments}</p>
                <Comments postId={post.id} />
               
              </div>
            );

           })}
        </div>

        </>
      )

};


export default PostListbyId;