import { CART_ADD_ITEM, CART_REMOVE_ITEM ,USER_CART_SUCCESS} from "../constants/cartConstants";

function cartReducer(state = { cartItems: []}, action) {
    switch (action.type) {
      case USER_CART_SUCCESS:
        return { loading: false, cartItems: state.cartItems };
      case CART_ADD_ITEM:
          //   get the item
          const item = action.payload;
          const product = state.cartItems.find(x => x.product === item.product);
          if (product) {
            return {
              cartItems:
                state.cartItems.map(x => x.product === product.product ? item : x)
            };
            
          }
          return { cartItems: [...state.cartItems, item] };
        case CART_REMOVE_ITEM:
           return { cartItems: state.cartItems.filter(x => x.product !== action.payload) };
        default:
           return state;
    }    
}

export{cartReducer}