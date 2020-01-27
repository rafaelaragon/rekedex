import { POKEMONS_LIST } from "../actions";

const initialState = {
  pokemonsList: [],
  isLoaded: false
};

export default function pokemonsListReducer(state = initialState, action) {
  switch (action.type) {
    case POKEMONS_LIST:
      return {
        ...state,
        pokemonsList: action.payload.pokemonsList.results,
        isLoaded: action.payload.isLoaded
      };
    default:
      return state;
  }
}
