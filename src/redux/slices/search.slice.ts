import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface SearchSlice {
    searchValue: string;
    valueOfSearchInput: string;
}

const initialState: SearchSlice = {
    searchValue: '',
    valueOfSearchInput: '',
};

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        setSearchState(state, action) {
            // console.log('searchSlice', action);
            state.searchValue = action.payload;
        },
        setValueOfSearchInput(state, action) {
            state.valueOfSearchInput = action.payload;
        },
    },
});

export const getSearchSelector = (state: RootState): string =>
    state.searchSlice.searchValue;
export const getValueOfSearchInputSelector = (state: RootState): string =>
    state.searchSlice.valueOfSearchInput;

export const { setSearchState, setValueOfSearchInput } = searchSlice.actions;

export default searchSlice.reducer;
