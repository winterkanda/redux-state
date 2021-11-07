import React, {useEffect} from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from "../../utils/actions";

function CategoryMenu() {
  const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);

  useEffect(() => {
    const categories = categoryData?.categories || [];
    dispatch({ type: UPDATE_CATEGORIES, categories: categories });
  }, [categoryData]);

  const handleCategoryClick = (id) => {
    dispatch({ type: UPDATE_CURRENT_CATEGORY, currentCategory: id });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleCategoryClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
