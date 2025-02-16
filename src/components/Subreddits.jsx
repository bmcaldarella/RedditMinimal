import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubreddits } from "../features/posts/Subreddits";
import '../styles/subreddits.css';

const Subreddits = () => {
    const dispatch = useDispatch();
    const { subreddits, status, error } = useSelector((state) => state.subreddits);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchSubreddits());
        }
    }, [status, dispatch]);

    if (status === "loading") return <p>Cargando subreddits...</p>;
    if (status === "failed") return <p>Error: {error}</p>;
    if (subreddits.length === 0) return <p>No hay subreddits aún.</p>;

    const getRandomImage = () => `https://picsum.photos/200/200?random=${Math.random()}`;

    return (
        <div className="subreddits-container">
                   <h3 className="sub-title">Subreddits</h3>

            <ul>
                {subreddits.map((subreddit) => (
                    
                    <li className="options" key={subreddit.id}>
                        <div>
                        <img className="img-subreddit" src={getRandomImage()} alt="Subreddit"/>
                        <span className="text-subreddit"> {subreddit.subreddit}</span> 

                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Subreddits;
