import React from "react";
import "./Pokedex.css";
import Pagination from "react-bootstrap/Pagination";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { addDefaultSrc, capitalize } from "../../functions/functions";
import { loadPokemons } from "../../redux/actions";
import { connect } from "react-redux";

//(Hay 964 pokemons, de los cuales, 810 tienen imagen)
class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 9,
      offset: 0
    };
  }

  changePage = async num => {
    
    const { limit } = this.state;
    let index = (num - 1) * limit;
    if (index >= 0 && index < 809) {
      // Nº of pokémons
      await this.setState({ offset: index });
      this.index = 1;
      this.props.loadPokemons(limit, this.state.offset);
    }
  };

  index = 1;
  componentDidMount() {
    const { limit, offset } = this.state;
    this.props.loadPokemons(limit, offset);
  }
  render() {
    const { pokemonsList, isLoaded, page } = this.props;

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
    //END Pagination

    if (!isLoaded) {
      return <LoadingSpinner />;
    } else {
      this.index = 1;
      return (
        <div className="Pokedex">
          <div className="pokemons">
            <ul>
              {pokemonsList[page].map(item => (
                <Nav>
                  <NavLink to={"pokemon/" + item.name + "/"}>
                    <li>
                      <h1>{capitalize(item.name)}</h1>
                      <img
                        src={
                          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                          (this.state.offset + this.index < 808
                            ? this.state.offset + this.index
                            : this.state.offset + this.index + 9193) + //Deoxys
                          ".png"
                        }
                        onError={addDefaultSrc}
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

//Redux
function mapState(state) {
  return {
    page: state.pokemonsListReducer.page,
    pokemonsList: state.pokemonsListReducer.pokemonsList,
    isLoaded: state.pokemonsListReducer.isLoaded
  };
}

const mapDispatch = { loadPokemons };

export default connect(mapState, mapDispatch)(Pokedex);
