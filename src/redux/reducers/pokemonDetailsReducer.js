import { POKEMON_DETAILS } from "../actions";

const initialState = {
  pokemonDetails: [],
  isLoaded: false
};

let tempList = [];
export default function pokemonDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case POKEMON_DETAILS:
      let tempId = action.payload.pokemonDetails.id;
      tempList[tempId] = action.payload.pokemonDetails;
      return {
        ...state,
        pokemonDetails: tempList,
        isLoaded: action.payload.isLoaded
      };
    default:
      return state;
  }
}
