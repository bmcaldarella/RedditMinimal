import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostList from './components/PostList';
import SearchBar from './components/SearchBar';
import PostById from './components/PostById';
import Subreddits from './components/Subreddits';
function App() {
    return (
        <Router>
            <div>
                <h1>Reddit Clone</h1>
                <SearchBar />
                <Routes>
                    <Route path="/" element={<PostList />} />
                    <Route path="/post/:postId" element={<PostById />} />
                </Routes>
                 <Subreddits />
            </div>
        </Router>
    );
}

export default App;
