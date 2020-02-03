export const POKEMONS_LIST = "POKEMONS_LIST";
export const POKEMON = "POKEMON";
export const POKEMON_DETAILS = "POKEMON_DETAILS";
export const POKEMON_EVOLUTION_CHAIN = "POKEMON_EVOLUTION_CHAIN";
export const STATS = "STATS";
export const ITEMS_LIST = "ITEMS_LIST";
export const ITEM = "ITEM";
export const ITEM_CATEGORIES_LIST = "ITEM_CATEGORIES_LIST";
export const ITEMS_FROM_CATEGORY_LIST = "ITEMS_FROM_CATEGORY_LIST";

export const pokemonsList = (page, pokemonsList, isLoaded) => ({
  type: POKEMONS_LIST,
  payload: { page, pokemonsList, isLoaded }
});

export const pokemon = (pokemon, isLoaded) => ({
  type: POKEMON,
  payload: {
    pokemon,
    isLoaded
  }
});

export const pokemonDetails = (pokemonDetails, isLoaded) => ({
  type: POKEMON_DETAILS,
  payload: {
    pokemonDetails,
    isLoaded
  }
});

export const pokemonEvolutionChain = (
  pokemonEvolutionChain,
  first,
  second,
  third,
  isLoaded
) => ({
  type: POKEMON_EVOLUTION_CHAIN,
  payload: {
    pokemonEvolutionChain,
    first,
    second,
    third,
    isLoaded
  }
});

export const stats = (
  stats,
  speed,
  spDef,
  spAtt,
  defense,
  attack,
  health,
  isLoaded
) => ({
  type: STATS,
  payload: { stats, speed, spDef, spAtt, defense, attack, health, isLoaded }
});

export const itemsList = (page, itemsList, isLoaded) => ({
  type: ITEMS_LIST,
  payload: { page, itemsList, isLoaded }
});

export const object = (item, isLoaded) => ({
  type: ITEM,
  payload: { item, isLoaded }
});

export const itemCategoriesList = (itemCategoriesList, isLoaded) => ({
  type: ITEM_CATEGORIES_LIST,
  payload: { itemCategoriesList, isLoaded }
});

export const itemsFromCategoryList = itemsFromCategoryList => ({
  type: ITEMS_FROM_CATEGORY_LIST,
  payload: { itemsFromCategoryList }
});

//
export function loadPokemons(limit, offset) {
  return dispatch => {
    return fetch(
      "https://pokeapi.co/api/v2/pokemon/?limit=" + limit + "&offset=" + offset
    )
      .then(res => res.json())
      .then(result => {
        const page = (offset + limit) / limit;
        dispatch(pokemonsList(page, result, true));
      });
  };
}

export function loadPokemon(name) {
  return dispatch => {
    name = name.slice(0, -1);
    return fetch("https://pokeapi.co/api/v2/pokemon/" + name)
      .then(res => res.json())
      .then(result => {
        dispatch(pokemon(result, true));
      });
  };
}

export function loadPokemonDetails(name) {
  return dispatch => {
    name = name.slice(0, -1);
    return fetch("https://pokeapi.co/api/v2/pokemon-species/" + name)
      .then(res => res.json())
      .then(result => {
        dispatch(pokemonDetails(result, true));
      });
  };
}

export function loadPokemonEvolutionChain(api) {
  return dispatch => {
    let first,
      second,
      third = "";
    return fetch(api)
      .then(res => res.json())
      .then(result => {
        if (result.chain.species.name !== undefined) {
          first = result.chain.species.name;
        }
        if (result.chain.evolves_to[0] !== undefined) {
          second = result.chain.evolves_to[0].species.name;
          if (result.chain.evolves_to[0].evolves_to[0] !== undefined) {
            third = result.chain.evolves_to[0].evolves_to[0].species.name;
          }
        }
        dispatch(pokemonEvolutionChain(result, first, second, third, true));
      });
  };
}

export function loadStats(name) {
  return dispatch => {
    return fetch("https://pokeapi.co/api/v2/pokemon/" + name)
      .then(res => res.json())
      .then(result => {
        const speed = result.stats[0].base_stat;
        const spDef = result.stats[1].base_stat;
        const spAtt = result.stats[2].base_stat;
        const defense = result.stats[3].base_stat;
        const attack = result.stats[4].base_stat;
        const health = result.stats[5].base_stat;
        dispatch(
          stats(result, speed, spDef, spAtt, defense, attack, health, true)
        );
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
        const page = (offset + limit) / limit;
        dispatch(itemsList(page, result, true));
      });
  };
}

export function loadItem(item) {
  return dispatch => {
    item = item.slice(0, -1);
    return fetch("https://pokeapi.co/api/v2/item/" + item)
      .then(res => res.json())
      .then(result => {
        dispatch(object(result, true));
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
  return dispatch => {
    return fetch("https://pokeapi.co/api/v2/item-category/" + category)
      .then(res => res.json())
      .then(result => {
        dispatch(itemsFromCategoryList(result));
      });
  };
}
