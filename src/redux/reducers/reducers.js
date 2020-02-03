import pokemonsListReducer from "./pokemonsListReducer";
import pokemonReducer from "./pokemonReducer";
import pokemonDetailsReducer from "./pokemonDetailsReducer";
import pokemonEvolutionChainReducer from "./pokemonEvolutionChainReducer";
import itemsListReducer from "./itemsListReducer";
import itemReducer from "./itemReducer";
import itemCategoriesListReducer from "./itemCategoriesListReducer";
import itemsFromCategoryListReducer from "./itemsFromCategoryListReducer";
import statsReducer from "./statsReducer";
import { combineReducers } from "redux";

export default combineReducers({
  pokemonsListReducer,
  pokemonReducer,
  pokemonDetailsReducer,
  pokemonEvolutionChainReducer,
  statsReducer,
  itemsListReducer,
  itemReducer,
  itemCategoriesListReducer,
  itemsFromCategoryListReducer
});
