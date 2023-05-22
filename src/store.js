import { configureStore } from '@reduxjs/toolkit';
import HeaderReducer from './reducer/HeaderReducer';

export default configureStore({
    reducer: {
        header: HeaderReducer
    },
})