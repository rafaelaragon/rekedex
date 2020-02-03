import { POKEMON } from "../actions";

const initialState = {
  pokemon: [],
  isLoaded: false
};

let tempList = [];
export default function pokemonReducer(state = initialState, action) {
  switch (action.type) {
    case POKEMON:
      let tempId = action.payload.pokemon.id;
      tempList[tempId] = action.payload.pokemon;
      return {
        ...state,
        id: tempId,
        pokemon: tempList,
        isLoaded: action.payload.isLoaded
      };
    default:
      return state;
  }
}
