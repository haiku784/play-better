// Define initial state for products
const initialState = {
    products: [],
    loading: false,
    error: null
};

// Product reducer function to manage product state
const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCTS_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_PRODUCTS_SUCCESS':
            return { ...state, loading: false, products: action.payload };
        case 'FETCH_PRODUCTS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

// Export the product reducer
export default productReducer;