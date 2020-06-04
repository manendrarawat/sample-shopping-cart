import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import cartReducer from "./store/cart";


const rootReducer = combineReducers({
    cart: cartReducer
});
const store = createStore(rootReducer, composeWithDevTools());

export default store;




