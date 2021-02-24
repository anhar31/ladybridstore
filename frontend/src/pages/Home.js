import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/prodactAction";
// import ProductScreen from "./ProudctScreen";


export default function Home(props) {
    const productList = useSelector(state => state.productList);

    const {products} = productList;
    const dispatch = useDispatch();
    // const SearchApi='http://localhost:5011/api/searchproducts/'
    const [ThesearchTerm, setThesearchTerm] = useState('');

    useEffect(() => {
        dispatch(listProducts());

        return () => {
 
        };

    }, [])
    
     
    function handelonSubmit(event) {
            event.preventDefault();

          dispatch(listProducts(ThesearchTerm));

}
    function handelonChange(event) {
        /*
        if(event.target.value === ''){
            setThesearchTerm(event.target.value);
            const button =  document.getElementsByClassName('searchButton')[0];
            button.click();

         return;   
        }
        */
        setThesearchTerm(event.target.value);
    }

// function handelonSubmit(event) {
//         event.preventDefault();

//         fetch(SearchApi + ThesearchTerm) //return Promis
            
//             .then((response) => { return response.json() })
//             .then((data) => {
//               console.log(data);
//               products=(data);
//             });



//     }

    return(
        <div>
            <form  onSubmit={handelonSubmit}  >
                
                <header>
                    <input type="text"
                        placeholder="Search..."
                        className="search"
                        value={ThesearchTerm}
                        onChange={handelonChange}

                    ></input>
                     <button type="submit" className="searchButton">
                            Search  🔍
                         </button>
                </header>
                

            </form>
            
            <ul className="products">

                <p></p>
                {products.map((product) => (
                    <li key={product._id}>
                        <div className="product">
                            <Link to={'/product/' + product._id}>
                                <img
                                    className="product-image"
                                    src={product.image}
                                    alt="product"
                                />
                            </Link>
                            <div className="product-name">
                                <Link to={'/product/' + product._id}>{product.name}</Link>
                            </div>

                            <div className="product-price">${product.price}</div>
                            <div className="product-rating">

         
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

        </div>

    )

}
 