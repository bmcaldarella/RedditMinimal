import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPost } from '../features/posts/postsSlice';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    const handleSearch = () => {
        dispatch(fetchPost(query));
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Buscar en Reddit..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Buscar</button>
        </div>
    );
};

export default SearchBar;
