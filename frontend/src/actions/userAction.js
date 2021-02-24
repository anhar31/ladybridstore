import Axios from "axios";
import Cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT} from '../constants/userConstants'


  const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
      const { data } = await Axios.post("/api/users/signin", { email, password });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
  }
  
  const register = (name, email, password,rePassword) => async (dispatch) => {
    console.log('register',rePassword);
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password , rePassword } });
    try {
      const { data } = await Axios.post("/api/users/register", { name, email, password , rePassword });
      console.log('data to set',data);
      Cookie.set('userInfo', JSON.stringify(data));
      // signin(email,password);
      dispatch({ type: USER_REGISTER_SUCCESS, payload: signin });
      
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
      
    } catch (error) {
      dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
  }
  const signout = () => (dispatch) => {
    Cookie.remove("userInfo");
    setTimeout(() => {
      window.location.reload(false);
    }, 20);
    dispatch({ type: USER_LOGOUT })
  }

  export { signin, register,signout };