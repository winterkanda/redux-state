import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Cart from "../components/cart";

import { QUERY_PRODUCTS } from '../utils/queries';
import spinner from '../assets/spinner.gif';

import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../utils/actions";
import { idbPromise } from '../utils/helpers';



function Detail() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const products = data?.products || [];

  useEffect(() => {
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
  }, [products, id]);

  function addToCart() {
    dispatch({type: ADD_TO_CART, product: currentProduct})
  }

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id
    });
    idbPromise('cart', 'delete', { ...currentProduct });

  };


  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button onClick={removeFromCart}>Remove from Cart</button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      
      <Cart /> 
    </>
  );
}

export default Detail;
