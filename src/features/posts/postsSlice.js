import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPost = createAsyncThunk('posts/fetchPost', async (query = '') => {
    const url = query 
        ? `https://www.reddit.com/search.json?q=${query}` 
        : 'https://www.reddit.com/r/popular.json';

    const response = await axios.get(url);
    return response.data.data.children.map((post) => post.data);
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [], 
        status: 'idle', 
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default postsSlice.reducer;
