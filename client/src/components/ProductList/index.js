import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from "react-redux";

import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';

import { UPDATE_PRODUCTS } from '../../utils/actions';

function ProductList() {
  const dispatch = useDispatch();
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const currentCategory = useSelector(state => state.currentCategory)
  const products = useSelector(state => state.products)
  useEffect(() => {
    const productsFromQuery = data?.products || [];
        dispatch({type: UPDATE_PRODUCTS, products:productsFromQuery})
    
  }, [data])

  function filterProducts() {
    if (!currentCategory) {
      return products;
    }

    return products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
