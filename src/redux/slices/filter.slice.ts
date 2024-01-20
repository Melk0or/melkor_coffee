import { createSlice } from '@reduxjs/toolkit';
import { SortCategory } from '../../components/Sort/Sort';
import { RootState } from '../store';

interface FilterSlice {
    activeCategory: number;
    pageSelected: number;
    sortCategory: SortCategory;
}

const initialState: FilterSlice = {
    activeCategory: 0,
    pageSelected: 1,
    sortCategory: {
        name: 'популярности (по возрастанию)',
        sortProperty: 'rating',
        sortDirection: 'abs',
    },
};

const filterSlice = createSlice({
    name: 'filterSlice',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            // console.log('filterSlice', action);
            state.activeCategory = action.payload;
        },
        setSortCategory(state, action) {
            // console.log('filterSlice', action);
            state.sortCategory = action.payload;
        },
        setPageSelected(state, action) {
            // console.log('filterSlice', action);
            state.pageSelected = action.payload;
        },
        setFilterParams(state, action) {
            // console.log(action.payload);
            state.activeCategory = Number(action.payload.activeCategory);
            state.pageSelected = Number(action.payload.pageSelected);
            state.sortCategory = { ...action.payload.sortCategory };
        },
    },
});
export const getFilterSelector = (state: RootState): FilterSlice =>
    state.filterSlice;
export const getSortCategorySelector = (state: RootState): SortCategory =>
    state.filterSlice.sortCategory;
export const getPageSelectedSelector = (state: RootState): number =>
    state.filterSlice.pageSelected;
export const getActiveCategorySelector = (state: RootState): number =>
    state.filterSlice.activeCategory;

export const {
    setCategoryId,
    setSortCategory,
    setPageSelected,
    setFilterParams,
} = filterSlice.actions;

export default filterSlice.reducer;
