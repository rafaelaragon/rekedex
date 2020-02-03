import { POKEMONS_LIST } from "../actions";

let initialState = {
  page: 0,
  pokemonsList: [],
  isLoaded: false
};

let tempList = [];
export default function pokemonsListReducer(state = initialState, action) {
  switch (action.type) {
    case POKEMONS_LIST:
      let tempId = action.payload.page;
      tempList[tempId] = !!tempList[10]
        ? tempList[tempId].push(action.payload.pokemonsList.results)
        : action.payload.pokemonsList.results;
      return {
        ...state,
        page: tempId,
        pokemonsList: tempList,
        isLoaded: action.payload.isLoaded
      };

    default:
      return state;
  }
}
