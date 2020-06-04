const initialState = {
    products: []
};

const cartReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'ADD_PRODUCT_TO_CART': {
            return Object.assign({}, state, action.payload);
        }

        case 'REMOVE_PRODUCT_FROM_CART': {
            return Object.assign({}, state, action.payload);
        }

        default: {
            return state;
        }
    }
    
};

export default cartReducer;
