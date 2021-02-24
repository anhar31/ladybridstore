import {createStore,combineReducers, compose, applyMiddleware} from 'redux'
import{productDetailsReducer, productListReducer }from './reducers/productReducers'
import Cookie from 'js-cookie';
import { cartReducer } from './reducers/cartReducers';
import { userRegisterReducer, userSigninReducer } from './reducers/userReducers';
import thunk from 'redux-thunk';


const userInfo = Cookie.getJSON('userInfo') || null;
const cartItems = Cookie.getJSON('cartItems') || [];

const initialState={cart: {cartItems},
userSignin: { userInfo } };
const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userSignin:userSigninReducer,
    userRegister:userRegisterReducer,
    
})
const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)))



export default store;