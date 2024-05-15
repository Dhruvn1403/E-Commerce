import  {createStore, combineReducers, applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productDetailsReducer, productReducer } from './reducers/productReducer';
import { forgotPasswordReducer, profileReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { newOrderReducer } from './reducers/orderReducer';

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems").split("-")[0])
      : [],
    shippingInfo : localStorage.getItem("shippingInfo") ?
      JSON.parse(localStorage.getItem("shippingInfo")) : {}
  }
};
// console.log(localStorage.getItem("cartItems").split("-")[1])
const middleWare=[thunk];

const store = createStore(
    reducer,
    initialState, 
    composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;