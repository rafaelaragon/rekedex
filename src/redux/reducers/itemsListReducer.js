import { ITEMS_LIST } from "../actions";

const initialState = {
  page: 0,
  itemsList: [],
  isLoaded: false
};

let tempList = [];
export default function itemsListReducer(state = initialState, action) {
  switch (action.type) {
    case ITEMS_LIST:
      let tempId = action.payload.page;
      tempList[tempId] = !!tempList[100]
        ? tempList[tempId].push(action.payload.itemsList.results)
        : action.payload.itemsList.results;
      return {
        ...state,
        page: tempId,
        itemsList: tempList,
        isLoaded: action.payload.isLoaded
      };
    default:
      return state;
  }
}
