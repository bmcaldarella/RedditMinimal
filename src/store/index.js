import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/posts/postsSlice';
import commentsReducer from '../features/comments';

export const store = configureStore({
    reducer: {
        posts: postReducer,
        comments: commentsReducer,

    },
});
