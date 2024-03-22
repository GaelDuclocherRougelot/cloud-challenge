import { configureStore } from '@reduxjs/toolkit';

import messageReducer from './message/message';


export const store = configureStore({
    reducer: {
        message: messageReducer,
    },
});
