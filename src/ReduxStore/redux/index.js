import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/index';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
	rootReducer,
});
