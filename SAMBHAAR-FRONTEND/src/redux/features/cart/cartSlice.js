import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     products: [],
//     selectedItems: 0,
//     totalPrice: 0,
//     tax: 0,
//     taxRate: 0,
//     grandTotal: 0,
// };



const loadCartFromStorage = () => {
    try {
        const data = localStorage.getItem("cart");
        return data ? JSON.parse(data) : null;
    } catch (err) {
        return null;
    }
};

const persistedCart = loadCartFromStorage();

const initialState = persistedCart || {
    products: [],
    selectedItems: 0,
    totalPrice: 0,
    tax: 0,
    grandTotal: 0,
};

const saveCartToStorage = (state) => {
    try {
        localStorage.setItem("cart", JSON.stringify(state));
    } catch (err) {
        console.error("Could not save cart", err);
    }
};

const calculateSelectedItems = (products) =>
    products.reduce((total, product) => total + product.quantity, 0);

const calculateTotalPrice = (products) =>
    products.reduce((total, product) => total + product.quantity * product.price, 0);

const calculateTax = (products) =>
    products.reduce((total, product) => total + (product.price * product.quantity * (product.gst / 100)), 0);

const calculateGrandTotal = (products, totalPrice) => {
    const tax = calculateTax(products);
    // const deliveryFee = totalPrice < 499 ? 25 : 0;
    return totalPrice  ;
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isExist = state.products.find((product) => product._id === action.payload._id);

            if (!isExist) {
                state.products.push({ ...action.payload, quantity: 1 });
            } else {
                console.log('Product already added');
            }

            state.selectedItems = calculateSelectedItems(state.products);
            state.totalPrice = calculateTotalPrice(state.products);
            state.tax = calculateTax(state.products);
            state.grandTotal = calculateGrandTotal(state.products, state.totalPrice);
            saveCartToStorage(state);
        },
        updateQuantity: (state, action) => {
            state.products = state.products.map((product) => {
                if (product._id === action.payload.id) {
                    if (action.payload.type === 'increment') {
                        product.quantity += 1;
                    } else if (action.payload.type === 'decrement' && product.quantity > 1) {
                        product.quantity -= 1;
                    }
                }
                saveCartToStorage(state);
                return product;
            });

            state.selectedItems = calculateSelectedItems(state.products);
            state.totalPrice = calculateTotalPrice(state.products);
            state.tax = calculateTax(state.products);
            state.grandTotal = calculateGrandTotal(state.products, state.totalPrice);
            saveCartToStorage(state);
        },
        removeFromCart: (state, action) => {
            state.products = state.products.filter((product) => product._id !== action.payload.id);

            state.selectedItems = calculateSelectedItems(state.products);
            state.totalPrice = calculateTotalPrice(state.products);
            state.tax = calculateTax(state.products);
            state.grandTotal = calculateGrandTotal(state.products, state.totalPrice);
            saveCartToStorage(state);
        },
        clearCart: (state) => {
            state.products = [];
            state.selectedItems = 0;
            state.totalPrice = 0;
            state.tax = 0;
            state.grandTotal = 0;
            saveCartToStorage(state);
        },
    },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
