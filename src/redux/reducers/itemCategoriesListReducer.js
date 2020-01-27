import { ITEM_CATEGORIES_LIST } from "../actions";

const initialState = {
  itemCategoriesList: [],
  isLoaded: false
};

export default function itemCategoriesListReducer(state = initialState, action) {
  switch (action.type) {
    case ITEM_CATEGORIES_LIST:
      return {
        ...state,
        itemCategoriesList: action.payload.itemCategoriesList.results,
        isLoaded: action.payload.isLoaded
      };
    default:
      return state;
  }
}
