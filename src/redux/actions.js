export const POKEMONS_LIST = "POKEMONS_LIST";
export const ITEMS_LIST = "ITEMS_LIST";
export const ITEM_CATEGORIES_LIST = "ITEM_CATEGORIES_LIST";
export const ITEMS_FROM_CATEGORY_LIST = "ITEMS_FROM_CATEGORY_LIST";

export const pokemonsList = (pokemonsList, isLoaded) => ({
  type: POKEMONS_LIST,
  payload: { pokemonsList, isLoaded }
});

export const itemsList = (itemsList, isLoaded) => ({
  type: ITEMS_LIST,
  payload: { itemsList, isLoaded }
});

export const itemCategoriesList = (itemCategoriesList, isLoaded) => ({
  type: ITEM_CATEGORIES_LIST,
  payload: { itemCategoriesList, isLoaded }
});

export const itemsFromCategoryList = (itemsFromCategoryList) => ({
  type: ITEMS_FROM_CATEGORY_LIST,
  payload: { itemsFromCategoryList }
});

export function loadPokemons(limit, offset) {
  return dispatch => {
    return fetch(
      "https://pokeapi.co/api/v2/pokemon/?limit=" + limit + "&offset=" + offset
    )
      .then(res => res.json())
      .then(result => {
        dispatch(pokemonsList(result, true));
      });
  };
}

export function loadItems(limit, offset) {
  return dispatch => {
    return fetch(
      "https://pokeapi.co/api/v2/item/?limit=" + limit + "&offset=" + offset
    )
      .then(res => res.json())
      .then(result => {
        dispatch(itemsList(result, true));
      });
  };
}

export function loadItemCategories() {
  return dispatch => {
    return fetch("https://pokeapi.co/api/v2/item-category/?limit=43")
      .then(res => res.json())
      .then(result => {
        dispatch(itemCategoriesList(result, true));
      });
  };
}

export function loadItemsFromCategory(category) {
  //console.log(category);
  return dispatch => {
    return fetch("https://pokeapi.co/api/v2/item-category/" + category)
      .then(res => res.json())
      .then(result => {
        dispatch(itemsFromCategoryList(result));
      });
  };
}
