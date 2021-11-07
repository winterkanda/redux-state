import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../../utils/actions";


function ProductItem(item) {
  const  dispatch = useDispatch();
  const cart =  useSelector(state => state.cart)
  const itemFromCart = cart.filter((product) => product._id===item._id)
  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  function addToCart() {
    
    dispatch({type: ADD_TO_CART, product: item})
  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
