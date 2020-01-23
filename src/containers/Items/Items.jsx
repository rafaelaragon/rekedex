import React from "react";
import "./Items.css";
import Pagination from "react-bootstrap/Pagination";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      limit: 90,
      offset: 0,
      isLoaded: false,
      items: []
    };
  }

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
      "https://pokeapi.co/api/v2/item/?limit=" +
        this.state.limit +
        "&offset=" +
        this.state.offset
    )
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result.results
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

  componentDidMount() {
    this.loadItems();
  }
  render() {
    const { error, isLoaded, items } = this.state;

    //Pagination
    let pages = [];
    let offset = this.state.offset;
    let limit = this.state.limit;
    let active = offset / limit + 1;

    pages.push(
      <Pagination.First onClick={() => this.changePage(1)} />,
      <Pagination.Prev onClick={() => this.changePage(active - 1)} />
    );
    for (let i = active - 2; i <= active + 2; i++) {
      if (i > 0 && i < Math.floor(900 / limit) + 1) {
        pages.push(
          <Pagination.Item
            key={i}
            active={i === active}
            onClick={() => this.changePage(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    }
    pages.push(
      <Pagination.Next onClick={() => this.changePage(active + 1)} />,
      <Pagination.Last
        onClick={() => this.changePage(Math.floor(900 / limit) )}
      />
    );
    //

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="loading">Loading...</div>;
    } else {
      return (
        <div className="Items">
          <div className="table">
            <ul>
              {items.map(item =>
                !item.name.includes("--") &&
                !item.name.includes("memory") &&
                !item.name.includes("evon-scuba-gear") ? (
                  
                <Nav>
                <NavLink to={"/item/" + item.name + "/"}>
                  <li>
                    <span id="item">{this.capitalize(item.name).replace("-", " ")}</span>
                    <img
                      src={
                        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/" +
                        item.name +
                        ".png"
                      }
                      alt=""
                      onError={this.addDefaultSrc}
                    ></img>
                  </li>
                  </NavLink>
                  </Nav>
                ) : (
                  ""
                )
              )}
            </ul>
          </div>
          <div className="pagination">
            <Pagination>{pages}</Pagination>
          </div>
        </div>
      );
    }
  }
}

export default Items;
