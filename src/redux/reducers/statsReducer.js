import { STATS } from "../actions";

const initialState = {
  speed: 0,
  spDef: 0,
  spAtt: 0,
  defense: 0,
  attack: 0,
  health: 0,
  isLoaded: false
};

export default function statsReducer(state = initialState, action) {
  switch (action.type) {
    case STATS:
      return {
        ...state,
        speed: action.payload.speed,
        spDef: action.payload.spDef,
        spAtt: action.payload.spAtt,
        defense: action.payload.defense,
        attack: action.payload.attack,
        health: action.payload.health,
        isLoaded: action.payload.isLoaded
      };
    default:
      return state;
  }
}
