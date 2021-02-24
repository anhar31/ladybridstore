import axios from 'axios';
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_LIST_SEARCH
    
} from "../constants/productConstants";


// import Axios from 'axios';
const listProducts = (name) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get('/api/products')
        if(!name){
           const { data } = await axios.get('/api/products')
           dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data }); 
        }
        else{
            const { data } = await axios.get(`http://localhost:5011/api/searchproducts/${name}`)
            dispatch({ type: PRODUCT_LIST_SEARCH, payload: data });
        }
        
        
    } 
    catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
}

const detailsProduct =(productId) => async (dispatch) =>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST,payload:productId});
        const { data } = await axios.get('/api/products/' + productId)
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    }

    catch(error){
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });

    }
}
// const searchProduct =(productname) => async (dispatch) =>{
//     try{
//         dispatch({type:PRODUCT_SEARCH_REQUEST,payload:productname});
//         const { data } = await axios.get('/api/searchproducts/' + productname)
//         dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data })
//     }

//     catch(error){
//         dispatch({ type: PRODUCT_SEARCH_FAIL, payload: error.message });

//     }
// }



export{listProducts,detailsProduct}