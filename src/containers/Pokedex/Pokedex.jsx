import React from "react";
import "./Pokedex.css";
import Pagination from "react-bootstrap/Pagination";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

//(Hay 964 pokemons, de los cuales, 809 tienen imagen)
class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      limit: 9,
      offset: 0,
      isLoaded: false,
      items: []
    };
  }

  changePage = async num => {
    let index = (num - 1) * this.state.limit;
    if (index >= 0 && index < 809) {
      // Nº de pokémons
      await this.setState({ offset: index });
      this.index = 1;
      this.loadPokemons();
    }
  };
  loadPokemons() {
    fetch(
      "https://pokeapi.co/api/v2/pokemon/?limit=" +
        this.state.limit +
        "&offset=" +
        this.state.offset
    )
      .then(res => res.json())
      .then(
        result => {
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

  addDefaultSrc(ev) {
    ev.target.src =
      "https://i.ya-webdesign.com/images/pixel-question-mark-png-5.png";
  }

  index = 1;
  componentDidMount() {
    this.loadPokemons();
  }
  render() {
    this.index = 1;
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
      if (i > 0 && i < Math.floor(809 / limit) + 2) {
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
        onClick={() => this.changePage(Math.floor(809 / limit) + 1)}
      />
    );
    //
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="Pokedex">
          <div className="pokemons">
            <ul>
              {items.map(item => (
                <Nav>
                  <NavLink to={"pokemon/" + item.name + "/"}>
                    <li>
                      <h1>
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                      </h1>
                      <img
                        src={
                          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                          (this.state.offset + this.index < 808
                            ? this.state.offset + this.index
                            : this.state.offset + this.index + 9193) +
                          ".png"
                        }
                        onError={this.addDefaultSrc}
                        className="pokemon"
                        alt={item.name}
                      />
                      <h2>{this.index++ + this.state.offset}</h2>
                    </li>
                  </NavLink>
                </Nav>
              ))}
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

export default Pokedex;
