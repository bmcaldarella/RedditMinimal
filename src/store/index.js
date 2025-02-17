import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/posts/postsSlice';
import commentsReducer from '../features/comments';
import subredditsReducer from '../features/posts/Subreddits';
import subredditsByIdReducer from '../features/posts/SubredditsById';
export const store = configureStore({
    reducer: {
        posts: postReducer,
        comments: commentsReducer,
        subreddits: subredditsReducer,
        subredditsById: subredditsByIdReducer

    },
});
