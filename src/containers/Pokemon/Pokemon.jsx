import React from "react";
import "./Pokemon.css";
import Stats from "../../components/Stats/Stats";
import Nav from "react-bootstrap/Nav";
import { NavLink, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Arrow from "../../assets/images/arrow.png";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {
  addDefaultSrc,
  capitalize,
  pad,
  upperCase
} from "../../functions/functions";
import {
  loadPokemon,
  loadPokemonDetails,
  loadPokemonEvolutionChain
} from "../../redux/actions";
import { connect } from "react-redux";

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: [],
      timesMounted: 1
    };
  }

  //Imágenes
  maleFront =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
  maleBack =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/";
  femaleFront =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/";
  femaleBack =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/";
  maleFrontShiny =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/";
  maleBackShiny =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/";
  femaleFrontShiny =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/";
  femaleBackShiny =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/";

  //Datos del pokemon para llamar a la api
  pokemonName = this.props.match.params.pokemonId;
  //

  remount = async () => {
    await this.setState({
      timesMounted: this.state.timesMounted + 1
    });
    window.location.reload();
  };

  toggleShiny = () => {
    this.setState({ isShiny: !this.state.isShiny });
  };

  addImages = (type, id, name) => {
    return (
      <img
        src={type + id + ".png"}
        onError={addDefaultSrc}
        className="pokemon"
        alt={name}
      />
    );
  };

  getData = () => {
    Promise.all([
      this.props.loadPokemon(this.pokemonName),
      this.props.loadPokemonDetails(this.pokemonName)
    ]).then(() => {
      this.props.loadPokemonEvolutionChain(
        this.props.pokemonDetails[this.props.id].evolution_chain.url
      );
    });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const { isShiny } = this.state;

    const {
      pokemon,
      pokemonDetails,
      isLoaded,
      id,
      firstEv,
      secondEv,
      thirdEv
    } = this.props;

    if (!isLoaded) {
      return <LoadingSpinner />;
    } else {
      this.num = pad(id, 3);

      return (
        <div className="Pokemon">
          {/*Images*/}
          <h2 id="id">N.º{!!id && id < 10001 ? this.num : this.num - 9193}</h2>
          {!isShiny ? this.addImages(this.maleFront, id, pokemon[id].name) : ""}
          {!isShiny ? this.addImages(this.maleBack, id, pokemon[id].name) : ""}
          {!isShiny && !!pokemon[id].sprites.front_female
            ? this.addImages(this.femaleFront, id, pokemon[id].name)
            : ""}
          {!isShiny && !!pokemon[id].sprites.back_female
            ? this.addImages(this.femaleBack, id, pokemon[id].name)
            : ""}
          {isShiny
            ? this.addImages(this.maleFrontShiny, id, pokemon[id].name)
            : ""}
          {isShiny
            ? this.addImages(this.maleBackShiny, id, pokemon[id].name)
            : ""}
          {isShiny && !!pokemon[id].sprites.front_shiny_female
            ? this.addImages(this.femaleFrontShiny, id, pokemon[id].name)
            : ""}
          {isShiny && !!pokemon[id].sprites.back_shiny_female
            ? this.addImages(this.femaleBackShiny, id, pokemon[id].name)
            : ""}

          {/*Button that toggles shiny images from pokemons*/}
          <Button variant="danger" onClick={this.toggleShiny}>
            Shiny appearance
          </Button>

          {/*Details (name, description, stats, height & weight)*/}
          <div className="details">
            <h1 id="name">
              <Link
                to={
                  "/pokemon/" +
                  (id > 1 ? (id !== 10001 ? id - 1 : 807) : id) +
                  "/"
                }
              >
                <img
                  onClick={this.remount}
                  className="arrow prev"
                  src={Arrow}
                  alt="arrow"
                ></img>
              </Link>

              {!!pokemon[id].name
                ? " " + capitalize(pokemon[id].name) + " "
                : ""}

              <Link to={"/pokemon/" + (id !== 807 ? id + 1 : 10001) + "/"}>
                <img
                  onClick={this.remount}
                  className="arrow next"
                  src={Arrow}
                  alt="arrow"
                ></img>
              </Link>
            </h1>
            <h2>
              {!!pokemonDetails[id] ? pokemonDetails[id].genera[2].genus : ""}
            </h2>
            <Stats />
            <div className="types">
              {!!pokemon[id].types
                ? pokemon[id].types.map(type => (
                    <span id={type.type.name}>{type.type.name}</span>
                  ))
                : ""}
            </div>
            <p>
              {!!pokemonDetails[id]
                ? pokemonDetails[id].flavor_text_entries.filter(
                    lan => lan.language.name === "en"
                  )[0].flavor_text
                : ""}
            </p>
            <span>
              Height:
              <span className="info">
                {" "}
                {!!pokemon[id].height ? pokemon[id].height / 10 : ""} m{" "}
              </span>
            </span>
            <span>
              Weight:
              <span className="info">
                {" "}
                {!!pokemon[id].weight ? pokemon[id].weight / 10 : ""} kg{" "}
              </span>
            </span>

            {/*Abilities*/}
            <div className="abilities">
              <br />
              <h1>Abilities</h1>
              <span className="info">
                {!!pokemon[id].abilities
                  ? pokemon[id].abilities.map(ability => (
                      <div>
                        <a
                          target="_blank"
                          href={
                            "https://pokemon.fandom.com/wiki/" +
                            upperCase(ability.ability.name, "_")
                          }
                        >
                          {capitalize(ability.ability.name).replace("-", " ")}
                        </a>
                      </div>
                    ))
                  : ""}
              </span>

              {/*Evolution chain*/}
              <ul>
                <Nav>
                  <NavLink
                    to={"/pokemon/" + firstEv + "/"}
                    onClick={this.remount}
                  >
                    <li>
                      <h1 id={!!secondEv ? "" : "not-evol"}>
                        {!!secondEv
                          ? capitalize(firstEv)
                          : "This pokemon doesn't evolve"}
                      </h1>
                      {firstEv === pokemon[id].name && !!secondEv
                        ? this.addImages(this.maleFront, id, pokemon[id].name)
                        : secondEv === pokemon[id].name
                        ? this.addImages(
                            this.maleFront,
                            id - 1,
                            pokemon[id].name
                          )
                        : thirdEv === pokemon[id].name
                        ? this.addImages(
                            this.maleFront,
                            id - 2,
                            pokemon[id].name
                          )
                        : ""}
                    </li>
                  </NavLink>
                </Nav>
                {!!secondEv ? (
                  <span>
                    <img className="arrow" src={Arrow} alt="arrow"></img>
                  </span>
                ) : (
                  ""
                )}

                <Nav>
                  <NavLink
                    to={"/pokemon/" + secondEv + "/"}
                    onClick={this.remount}
                  >
                    <li>
                      <h1>{!!secondEv ? capitalize(secondEv) : ""}</h1>
                      {secondEv === pokemon[id].name
                        ? this.addImages(this.maleFront, id, pokemon[id].name)
                        : firstEv === pokemon[id].name && !!secondEv
                        ? this.addImages(
                            this.maleFront,
                            id + 1,
                            pokemon[id].name
                          )
                        : thirdEv === pokemon[id].name
                        ? this.addImages(
                            this.maleFront,
                            id - 1,
                            pokemon[id].name
                          )
                        : ""}
                    </li>
                  </NavLink>
                </Nav>
                {!!thirdEv ? (
                  <span>
                    <img className="arrow" src={Arrow} alt="arrow"></img>
                  </span>
                ) : (
                  ""
                )}

                <Nav>
                  <NavLink
                    to={"/pokemon/" + thirdEv + "/"}
                    onClick={this.remount}
                  >
                    <li style={!!thirdEv ? {} : { display: "none" }}>
                      <h1>{!!thirdEv ? capitalize(thirdEv) : ""}</h1>
                      {thirdEv === pokemon[id].name && !!thirdEv
                        ? this.addImages(this.maleFront, id, pokemon[id].name)
                        : secondEv === pokemon[id].name && !!thirdEv
                        ? this.addImages(
                            this.maleFront,
                            id + 1,
                            pokemon[id].name
                          )
                        : firstEv === pokemon[id].name && !!thirdEv
                        ? this.addImages(
                            this.maleFront,
                            id + 2,
                            pokemon[id].name
                          )
                        : ""}
                    </li>
                  </NavLink>
                </Nav>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }
}

//Redux
function mapState(state) {
  return {
    id: state.pokemonReducer.id,
    pokemon: state.pokemonReducer.pokemon,
    pokemonDetails: state.pokemonDetailsReducer.pokemonDetails,
    pokemonEvolutionChain:
      state.pokemonEvolutionChainReducer.pokemonEvolutionChain,
    firstEv: state.pokemonEvolutionChainReducer.firstEv,
    secondEv: state.pokemonEvolutionChainReducer.secondEv,
    thirdEv: state.pokemonEvolutionChainReducer.thirdEv,
    isLoaded: state.pokemonReducer.isLoaded
  };
}
const mapDispatch = {
  loadPokemon,
  loadPokemonDetails,
  loadPokemonEvolutionChain
};

export default connect(mapState, mapDispatch)(Pokemon);
