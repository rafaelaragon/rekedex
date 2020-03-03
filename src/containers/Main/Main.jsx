import React from "react";
import "./Main.css";
import { Switch, Route } from "react-router-dom";
import {
  Home,
  Pokedex,
  Pokemon,
  Moves,
  Items,
  ItemCategories,
  Item
} from "../../containers";

class Main extends React.Component {
  render() {
    return (
      <div className="Wrapper">
        <div className="Main">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/pokedex/" component={Pokedex} />
            <Route path="/pokemon/:pokemonId" component={Pokemon} />
            <Route exact path="/items" component={Items} />
            <Route exact path="/items/categories" component={ItemCategories} />
            <Route strict path="/items/categories/" component={ItemCategories} />
            <Route path="/item/:itemId" component={Item} />
            <Route path="/moves" component={Moves} />
            <Route path="*" component={Home} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Main;
