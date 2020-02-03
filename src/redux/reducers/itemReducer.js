import { ITEM } from "../actions";

const initialState = {
  item: [],
  isLoaded: false
};

let tempList = [];
export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case ITEM:
      let tempId = action.payload.item.id;
      console.log("Id", tempId)
      tempList[tempId] = action.payload.item;
      console.log("List[tempId]", tempList[tempId])
      return {
        ...state,
        id: tempId,
        item: tempList,
        isLoaded: action.payload.isLoaded
      };
    default:
      return state;
  }
}
