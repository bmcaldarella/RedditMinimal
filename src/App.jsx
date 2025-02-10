import React from 'react';
import PostList from './components/PostList';
import SearchBar from './components/SearchBar';

function App() {
    return (
        <div>
            <h1>Reddit Clone</h1>
            <SearchBar />
            <PostList />
        </div>
    );
}

export default App;
