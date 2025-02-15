import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostList from './components/PostList';
import SearchBar from './components/SearchBar';
import PostById from './components/PostById';


function App() {
    return (
        <Router>
            <Routes>
            <Route path="/PostById" element={<PostById/>} />
        <div>
            <h1>Reddit Clone</h1>
            <SearchBar />
            <PostList />
            
        </div>
        </Routes>
        </Router>
    );
}

export default App;
