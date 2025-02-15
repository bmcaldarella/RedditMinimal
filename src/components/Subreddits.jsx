import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubreddits } from "../features/posts/Subreddits";
import '../styles/card.css';


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

    return (
        <>
            <h1>Subreddits populares</h1>
            <ul>
                {subreddits.map((subreddit) => (
                    <li key={subreddit.id}>{subreddit.display_name}</li>
                ))}
            </ul>
        </>
    );
}

export default Subreddits;
