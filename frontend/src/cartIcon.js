import React from "react";
import './cartIcon.css'
import { useSelector} from "react-redux";
import { Link } from "react-router-dom";
import CartScreen from './pages/CartScreen'
export default function CartIcon(props){
    const cart= useSelector(state => state.cart);
    const {cartItems} = cart;

    return(
        <div id="cart-icon">
            <Link to="/cart">
              <i className="fa fa-shopping-cart"></i>
              <span className="badge badge-danger"> {cartItems.reduce((a, c) => a + parseInt(c.qty), 0)}</span>  
            </Link>

        </div>
    )
}