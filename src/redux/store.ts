import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filter.slice';
import searchSlice from './slices/search.slice';
import cartSlice from './slices/cart.slice';
import coffeeSlice from './slices/coffee.slice';

const rootReducer = combineReducers({
    filterSlice,
    searchSlice,
    cartSlice,
    coffeeSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
