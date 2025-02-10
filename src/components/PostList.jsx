import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPost } from '../features/posts/postsSlice';

const PostList = () => {
    const dispatch = useDispatch();
    const { posts, status, error } = useSelector((state) => state.posts);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPost());
        }
    }, [status, dispatch]);

    if (status === 'loading') return <p>Cargando...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.selftext}</p>
                    <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
                        Ver en Reddit
                    </a>
                </div>
            ))}
        </div>
    );
};

export default PostList;
