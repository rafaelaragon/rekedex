import { ITEMS_LIST } from "../actions";

const initialState = {
  itemsList: [],
  isLoaded: false
};

export default function pokemonsListReducer(state = initialState, action) {
  switch (action.type) {
    case ITEMS_LIST:
      return {
        ...state,
        itemsList: action.payload.itemsList.results,
        isLoaded: action.payload.isLoaded
      };
    default:
      return state;
  }
}
