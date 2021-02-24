
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { detailsProduct } from "../actions/prodactAction";

export default function ProductScreen(props) {

  // const product = data1.products.find(x => x._id === props.match.params.id);
  const productDetails = useSelector(state => state.productDetails);
  const { product, loading, error } = productDetails;
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //  
    };
  }, [])
  // when we selected qty and do event on click ,directed as to cart with qty that 
  // we select
  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);

  };


  return (

    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      {loading ? (<div> wait loading ... </div> ):
        error ? (<div>{error}</div>) :
        <>
          (
            <div className="details">
              <div className="details-image">
                <img src={product.image} alt="product"></img>
              </div>
              <div className="details-info">
                <ul>
                  <li>
                    <h4>{product.name}</h4>
                  </li>
                  <li>
                    <a href="#reviews">
                      {/* <Rating
                      value={product.rating}
                      text={product.numReviews + ' reviews'}
                    /> */}
                    </a>
                  </li>
                  <li>
                    Price: <b>${product.price}</b>
                  </li>
                  <li>
                
                  </li>
                </ul>
              </div>
              <div className="details-action">
                <ul>
                  <li>Price: {product.price}</li>
                  <li>
                    Status:{product.countInStock > 0 ? "In stock" : "Unavailable"}

                  </li>
                  <li>
                    {/* when the client is select the value is change */}
                    Qty:<select value={qty} onChange={(e) => { setQty(e.target.value) }}>
                      {[...Array(product.countInStock).keys()].map(x =>
                        <option key={x+1} value={x + 1}>
                          {x + 1}
                        </option>
                      )}
                    </select>
                  </li>
                  <li>
                    {product.countInStock > 0 &&
                      <button
                        onClick={handleAddToCart}
                        className="button primary"
                      >
                        Add to Cart
                    </button>}
                  </li>
                </ul>
              </div>
            </div>
         )
       </>
      }


    </div>

  );
}