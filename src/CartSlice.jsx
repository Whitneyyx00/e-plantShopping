import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const newItem = action.payload;
        const existingItem = state.items.find(item => item.name === newItem.name);

        if (existingItem) {
            // If item already exists, increase its quantity
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            // If item doesn't exist, add it with quantity 1
            state.items.push({
                ...newItem,
                quantity: 1
            });
        }
    },

    removeItem: (state, action) => {
        const itemName = action.payload;
        // Filter out the item with the matching name
        state.items = state.items.filter(item => item.name !== itemName);
    },

    updateQuantity: (state, action) => {
        const { name, amount } = action.payload;
        const item = state.items.find(item => item.name === name);
        
        if (item) {
            // Update quantity if it would result in a valid amount (greater than 0)
            if (amount > 0) {
                item.quantity = amount;
            } else {
                // If quantity would be 0 or less, remove the item
                state.items = state.items.filter(item => item.name !== name);
            }
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export const selectCartTotal = state => state.cart.items.reduce(
    (total, item) => total + item.quantity,
    0
);

export default CartSlice.reducer;
