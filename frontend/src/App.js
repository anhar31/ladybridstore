  
import React from 'react';
import { BrowserRouter,Route, Link } from 'react-router-dom';
import './App.css';
import './index.css'
import ProductScreen from "./pages/ProudctScreen";
import CartScreen from "./pages/CartScreen"
import Home from "./pages/Home"
import SigninScreen from './pages/SgininScreen';
import RegisterScreen from './pages/RegisterScreen';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/userAction';
import CartIcon from './cartIcon';
import { listProducts } from "../src/actions/prodactAction";



//

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);

  const signoutHandler=()=>{
    dispatch(signout());
  };

  function handelonSubmit(event) {
    event.preventDefault();

  dispatch(listProducts('Pants'));

}


  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">LadyBirdStore</Link>
          </div>
          <div className="div">
             <div className="header-links1" >
            <Link to="/">Home</Link>
            <Link to="/cart">Cart</Link></div></div>
         
            <div className="header-links2" ><CartIcon></CartIcon></div>
          <div className="header-links">
            
                 
            {userInfo ? (
              
              <div>
                <Link to="/profile">Welcome {userInfo.name}</Link> 
                <Link to="/" onClick={signoutHandler}> SignOut </Link>
                <Link to="/orders">Orders</Link>
              </div>

            ) : (
              <div>
               
                <Link to="/register">Create Acount</Link>
                <Link to="/signin">Sign In</Link>
              </div>
              
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul className="categories">
            <li>
              <Link onClick={handelonSubmit} to="/category/Pants">Pants</Link>
            </li>

            <li>
              <Link to="/category/Shirts">Shirts</Link>
            </li>
            <li>
              <Link to="/category/dress">dress</Link>
            </li>
          </ul>
        </aside>
        
        <main className="main">
          <div className="content">
          {/* <Route path="/search" component={Search} /> */}
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
            <Route path="/cart" component={CartScreen} />
            <Route path="/" exact={true} component={Home} />
            <Route path="/product/:id" exact={true} component={ProductScreen} />
          </div>
        </main>
    
        <footer className="footer">LadyBird</footer>
        
      </div>
    </BrowserRouter>
  );
}

export default App;