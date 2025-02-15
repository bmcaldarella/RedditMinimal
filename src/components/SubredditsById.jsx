import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPost } from '../features/posts/postsSlice';



const SubredditsById = ({SubredditsById}) => {
        const dispatch = useDispatch();
        const { posts, status, error } = useSelector((state) => state.comments);
        
        useEffect(() => {
            if (status === 'idle') {
              dispatch(fetchPost());
            }
          }, [status, dispatch]);
        
          if (status === 'loading') return <p>Cargando...</p>;
          if (status === 'failed') return <p>Error: {error}</p>;


          const post = posts.find((p) => p.id === SubredditsById);
          if (!post) return <p>Post not founded.</p>;
          

          return (
            <div>
              {posts.map((post) => {
                const isImage = post.url && post.url.match(/\.(jpeg|jpg|gif|png)$/);
                const timeAgo = formatDistanceToNow(new Date(post.created_utc * 1000), { addSuffix: true });
                const formatNumber = (num) => {
                  if (num >= 1_000_000) {
                    return (num / 1_000_000).toFixed(1) + "M"; // 1M, 2.5M, etc.
                  } else if (num >= 1_000) {
                    return (num / 1_000).toFixed(1) + "k"; // 1k, 2.3k, etc.
                  } else {
                    return num;
                  }
                }
                const like = post.ups;
        
                return (
                  <div className='card-list' key={post.id}>
                    <Link to={`/post/${post.id}`} className="post-title-link">
        
        
                      <div>
                        <h6>{post.author} • <span>{timeAgo}</span></h6>
                      </div>
        
        
                      <h2 className='post-title'>{post.title}</h2>
        
                      {isImage ? (
                        <img className='post-img' src={post.url} alt="Post" />
                      ) : (
                        <p className='post-txt'>{post.selftext}</p>
                      )}
        
                      <p>Comments: {post.num_comments}</p>
        
                    </Link>
                    <p>{formatNumber(post.ups)} 👍</p>
                  </div>
        
                );
              })}
            </div>
          );
        };
        
        
        

export default SubredditsById;