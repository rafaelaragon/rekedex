import React from "react";
import "./ItemCategories.css";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

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

  addDefaultSrc(ev) {
    ev.target.src =
      "https://i.ya-webdesign.com/images/pixel-question-mark-png-5.png";
  }
  loadItems() {
    fetch(
      !!this.api
        ? this.api + "?limit=43"
        : "https://pokeapi.co/api/v2/item-category/?limit=43"
    )
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
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

  capitalize = name => {
    let result = name.charAt(0).toUpperCase() + name.slice(1);
    return result;
  };
  remount = async () => {
    await this.setState({
      timesMounted: this.state.timesMounted + 1
    });
    window.location.reload();
  };

  componentDidMount() {
    this.loadItems();
  }
  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
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
                      onClick={this.remount}
                    >
                      <li>
                        <span
                          id={
                            item.url.includes("item-category")
                              ? "categories"
                              : ""
                          }
                        >
                          {this.capitalize(item.name).replace("-", " ")}
                        </span>
                        {!item.url.includes("item-category") ? (
                          <img
                            src={
                              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/" +
                              item.name +
                              ".png"
                            }
                            alt=""
                            onError={this.addDefaultSrc}
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
