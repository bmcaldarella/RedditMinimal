import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = "https://www.reddit.com";

export const fetchComments = createAsyncThunk(
  'comments/fetchComments', 
  async (postId, { getState }) => {
    if (!postId) throw new Error("postId no proporcionado");

    const state = getState();
    const subreddit = state.posts.posts.find(post => post.id === postId)?.subreddit;
    
    if (!subreddit) throw new Error("Subreddit no encontrado");

    const response = await axios.get(`${URL}/r/${subreddit}/comments/${postId}.json`);
    return response.data;
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload[1]?.data.children || [];
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default commentsSlice.reducer;
