import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPost } from '../features/posts/postsSlice';
import '../styles/SeachBar.css';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    const handleSearch = () => {
        if (query.trim() !== '') {
            dispatch(fetchPost(query));
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    return (
        <div className='search-bar-container'>
            <div className='logo-container'>
                <img className='logo-reddit' src="./public/reddit.png" alt="logo" />
                <h3 className='logo-reddit-text'>Reddit<span className='logo-text'>Minimal</span></h3>

            </div>
            <div className='search' >
                <input
                    className='search-bar'
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyPress} // Capturar "Enter"
                />            <button onClick={handleSearch}><svg className='lupa-search' fill="#ffffff" height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490.4 490.4" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M484.1,454.796l-110.5-110.6c29.8-36.3,47.6-82.8,47.6-133.4c0-116.3-94.3-210.6-210.6-210.6S0,94.496,0,210.796 s94.3,210.6,210.6,210.6c50.8,0,97.4-18,133.8-48l110.5,110.5c12.9,11.8,25,4.2,29.2,0C492.5,475.596,492.5,463.096,484.1,454.796z M41.1,210.796c0-93.6,75.9-169.5,169.5-169.5s169.6,75.9,169.6,169.5s-75.9,169.5-169.5,169.5S41.1,304.396,41.1,210.796z"></path> </g> </g></svg></button>

            </div>
            <hr />
        </div>
    );
};

export default SearchBar;
