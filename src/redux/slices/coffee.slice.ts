import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { CardProps } from '../../components/Card/Card';
import { SortCategory } from '../../components/Sort/Sort';
import { RootState } from '../store';

interface AsyncThunkParams {
    pageCount: number;
    pageSelected: number;
    activeCategory: number;
    sortCategory: SortCategory;
    searchValue: string;
}

interface MainItem extends CardProps {}

interface CoffeeSlice {
    mainItems: MainItem[];
    status: 'complete' | 'loading' | 'rejected' | '';
}

export const fetchingCoffee = createAsyncThunk(
    'coffee/fetchCoffeeStatus',
    async (params: AsyncThunkParams) => {
        const {
            pageCount,
            pageSelected,
            activeCategory,
            sortCategory,
            searchValue,
        } = params;
        const { data } = await axios.get<MainItem[]>(
            `https://655352b85449cfda0f2e8000.mockapi.io/mainItems?${
                pageCount > 1 ? `page=${pageSelected}&` : 'p=1&'
            }limit=3${
                activeCategory > 0 ? `&categories=${activeCategory}` : ''
            }&sortBy=${sortCategory.sortProperty}&order=${
                sortCategory.sortDirection
            }${searchValue ? `&search=${searchValue}` : ''}`
        );
        return data;
    }
);

const initialState: CoffeeSlice = {
    mainItems: [],
    status: '',
};

const coffeeSlice = createSlice({
    name: 'coffeeSlice',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<MainItem[]>) {
            state.mainItems = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchingCoffee.fulfilled, (state, action) => {
            state.status = 'complete';
            state.mainItems = action.payload;
            console.log('Ошибок нет');
        });
        builder.addCase(fetchingCoffee.pending, (state) => {
            state.status = 'loading';
            state.mainItems = [];
            console.log('Загрузка');
        });
        builder.addCase(fetchingCoffee.rejected, (state, action) => {
            state.status = 'rejected';
            state.mainItems = [];
            console.log('Ошибка', action.payload);
        });

        // [fetchingCoffee.fulfilled]: (
        //     state: CoffeeSlice,
        //     action: PayloadAction<MainItem[]>
        // ) => {
        //     state.status = 'complete';
        //     state.mainItems = action.payload;
        //     console.log('Ошибок нет');
        // },
        // [fetchingCoffee.pending]: (state: CoffeeSlice) => {
        //     state.status = 'loading';
        //     state.mainItems = [];
        //     console.log('Загрузка');
        // },
        // [fetchingCoffee.rejected]: (state: CoffeeSlice, action: any) => {
        //     state.status = 'rejected';
        //     state.mainItems = [];
        //     console.log('Ошибка', action.payload);
        // },
    },
});

export const getMainItemsSelector = (state: RootState): MainItem[] =>
    state.coffeeSlice.mainItems;

export const { setItems } = coffeeSlice.actions;

export default coffeeSlice.reducer;
