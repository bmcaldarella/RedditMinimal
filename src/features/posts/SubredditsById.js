import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link

export const fetchSubredditsById = createAsyncThunk('subreddits/fetchSubreddits', async () => {
    const response = await axios.get('https://www.reddit.com/r/popular.json');
    return response.data.data.children.map((subreddit) => subreddit.data);
});


const subredditsSlice = createSlice({
    name : 'subreddits',
    initialState: {
        subreddits:[],
        status: 'idle',
        error: null
    },

    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubredditsById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSubredditsById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.subreddits = action.payload;
            })
            .addCase(fetchSubredditsById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }


});

export default fetchSubredditsById.reducer;