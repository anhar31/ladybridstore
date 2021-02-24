import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SEARCH, PRODUCT_LIST_SUCCESS, PRODUCT_SEARCH_FAIL, PRODUCT_SEARCH_REQUEST, PRODUCT_SEARCH_SUCCESS } from "../constants/productConstants";

function productListReducer(state = { products: [] }, action) {
    switch (action.type) {
        // send request to server to get data
      case PRODUCT_LIST_REQUEST:
        return { loading: true, products: [] };
        // i get the data drom server and set the data to action payload
      case PRODUCT_LIST_SUCCESS:
        return { loading: false, products: action.payload };
      case PRODUCT_LIST_SEARCH:
        return { loading: false, products: action.payload };
        // return loding to false and send error
      case PRODUCT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  function productDetailsReducer(state = { product: { reviews: [] } }, action) {
    switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
        return { loading: true };
      case PRODUCT_DETAILS_SUCCESS:
        return { loading: false, product: action.payload };
      case PRODUCT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }  
 
  export{productListReducer,productDetailsReducer}