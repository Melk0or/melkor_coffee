import { createSlice } from '@reduxjs/toolkit';
import { CartCardsProps } from '../../components/CartCards/CartCards';
import { RootState } from '../store';

interface CartItem extends CartCardsProps {
    rating: number;
}

interface CartSlice {
    totalPrice: number;
    items: CartItem[];
}

const initialState: CartSlice = {
    totalPrice: 0,
    items: [],
};

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addItems(state, action) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id
            );
            if (findItem) {
                findItem.amount++;
            } else {
                action.payload.amount = 1;
                state.items.push(action.payload);
            }
            state.totalPrice = state.items.reduce(
                (acc, item) => item.price * item.amount + acc,
                0
            );
        },
        removeAllAmountOfItem(state, action) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id
            );
            if (findItem) {
                state.items = state.items.filter(
                    (obj) => obj.id !== findItem.id
                );
                state.totalPrice -= findItem?.price * findItem?.amount;
            }
        },
        removeItem(state, action) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id
            );
            if (!findItem) return;
            if (findItem.amount > 1) {
                findItem.amount -= 1;
            } else {
                state.items = state.items.filter(
                    (obj) => obj.id !== findItem.id
                );
            }
            state.totalPrice -= findItem.price;
        },
        eraseAllItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const getCartSelector = (state: RootState): CartSlice => state.cartSlice;

export const { addItems, removeAllAmountOfItem, eraseAllItems, removeItem } =
    cartSlice.actions;

export default cartSlice.reducer;
