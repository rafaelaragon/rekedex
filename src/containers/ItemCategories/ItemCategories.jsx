import React from "react";
import "./ItemCategories.css";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { addDefaultSrc, capitalize } from "../../functions/functions";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

class ItemCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      limit: 90,
      offset: 0,
      isLoaded: false,
      items: [],
      timesMounted: 1
    };
  }

  //Item details to get the api call
  queryString = window.location.pathname;
  category = this.queryString.substring(18);
  api = "https://pokeapi.co/api/v2/item-category/" + this.category;

  changePage = async num => {
    let index = (num - 1) * this.state.limit;
    if (index >= 0 && index < 900) {
      // Nº de objetos
      await this.setState({ offset: index });
      this.index = 1;
      this.loadItems();
    }
  };

  remount = async () => {
    await this.setState({
      timesMounted: this.state.timesMounted + 1
    });
    window.location.reload();
  };

  loadItems() {
    fetch(
      !!this.api
        ? this.api + "?limit=43"
        : "https://pokeapi.co/api/v2/item-category/?limit=43"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: !!result.items ? result.items : result.results
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  componentDidMount() {
    this.loadItems();
  }
  render() {
    const { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <LoadingSpinner />;
    } else {
      return (
        <div className="ItemCategories">
          <div className="table">
            <ul>
              {items.map(item =>
                !item.name.includes("--") &&
                !item.name.includes("memory") &&
                !item.name.includes("evon-scuba-gear") ? (
                  <Nav>
                    <NavLink
                      to={
                        !item.url.includes("item-category")
                          ? "/item/" + item.name + "/"
                          : "/items/categories/" + item.name + "/"
                      }
                    >
                      <li onClick={this.remount}
                        id={
                          item.url.includes("item-category") ? "categories" : ""
                        }
                      >
                        <span
                          id={
                            item.url.includes("item-category")
                              ? "categories"
                              : ""
                          }
                        >
                          {capitalize(item.name).replace("-", " ")}
                        </span>
                        {!item.url.includes("item-category") ? (
                          <img
                            src={
                              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/" +
                              item.name +
                              ".png"
                            }
                            alt=""
                            onError={addDefaultSrc}
                          ></img>
                        ) : (
                          ""
                        )}
                      </li>
                    </NavLink>
                  </Nav>
                ) : (
                  ""
                )
              )}
            </ul>
          </div>
        </div>
      );
    }
  }
}

export default ItemCategories;
