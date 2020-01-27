import pokemonsListReducer from "./pokemonsListReducer";
import itemsListReducer from "./itemsListReducer";
import itemCategoriesListReducer from "./itemCategoriesListReducer";
import itemsFromCategoryListReducer from "./itemsFromCategoryListReducer";
import { combineReducers } from "redux";

export default combineReducers({
  pokemonsListReducer,
  itemsListReducer,
  itemCategoriesListReducer,
  itemsFromCategoryListReducer
});
