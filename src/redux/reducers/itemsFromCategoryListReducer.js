import { ITEMS_FROM_CATEGORY_LIST } from "../actions";

const initialState = {
  itemsFromCategoryList: []//,
  //isLoaded: false
};

export default function itemsFromCategoryListReducer(state = initialState, action) {
  switch (action.type) {
    case ITEMS_FROM_CATEGORY_LIST:
        let tempId = action.payload.itemsFromCategoryList.id - 1;
        let tempItem = []
        tempItem[tempId] = action.payload.itemsFromCategoryList
      return {
        ...state,
        itemsFromCategoryList: [
            ...state.itemsFromCategoryList,
            ...tempItem
        ]
        
        //isLoaded: action.payload.isLoaded
      };
    default:
      return state;
  }
}
