import { POKEMON_EVOLUTION_CHAIN } from "../actions";

const initialState = {
  pokemonEvolutionChain: [],
  firstEv: "",
  secondEv: "",
  thirdEv: "",
  isLoaded: false
};

let tempList = [];
export default function pokemonEvolutionChainReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case POKEMON_EVOLUTION_CHAIN:
      let tempId = action.payload.pokemonEvolutionChain.id;
      tempList[tempId] = action.payload.pokemonEvolutionChain;
      return {
        ...state,
        pokemonEvolutionChain: tempList,
        firstEv: action.payload.first,
        secondEv: action.payload.second,
        thirdEv: action.payload.third,
        isLoaded: action.payload.isLoaded
      };
    default:
      return state;
  }
}
