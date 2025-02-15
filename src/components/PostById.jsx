import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPost } from '../features/posts/postsSlice';
import { formatDistanceToNow } from 'date-fns';
import { useParams } from "react-router-dom"; 
import Comments from './Comments';

const PostById = () => {
    const dispatch = useDispatch();
    const { postId } = useParams(); 
    const { posts, status, error } = useSelector((state) => state.posts);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPost());
        }
    }, [status, dispatch]);

    if (status === 'loading') return <p>Cargando...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    const post = posts.find((p) => p.id === postId);
    if (!post) return <p>Post no encontrado.</p>;

    const isImage = post.url && post.url.match(/\.(jpeg|jpg|gif|png)$/);
    const timeAgo = formatDistanceToNow(new Date(post.created_utc * 1000), { addSuffix: true });

    return (
        <div>
            <div className='card-list'>
                <div>
                    <p>{post.author}</p>
                    <p>{timeAgo}</p> 
                </div>
                <h2 className='post-title'>{post.title}</h2>

                {isImage ? (
                    <img className='post-img' src={post.url} alt="Post" />
                ) : (
                    <p className='post-txt'>{post.selftext}</p>
                )}

                <p>{post.ups} 👍</p>
            </div>

            <Comments postId={post.id} />
        </div>
    );
};

export default PostById;
