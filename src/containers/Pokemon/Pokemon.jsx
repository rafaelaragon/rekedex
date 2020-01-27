import React from "react";
import "./Pokemon.css";
import Stats from "../../components/Stats/Stats";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Arrow from "../../assets/images/arrow.png";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { addDefaultSrc, capitalize, pad } from "../../functions/functions";

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
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
  queryString = window.location.pathname;
  pokemonName = this.queryString.substring(9);
  api = "https://pokeapi.co/api/v2/pokemon/" + this.pokemonName;
  pokemonDetailsApi =
    "https://pokeapi.co/api/v2/pokemon-species/" + this.pokemonName;
  //

  toggleShiny = () => {
    this.setState({ isShiny: !this.state.isShiny });
  };

  remount = async () => {
    await this.setState({
      timesMounted: this.state.timesMounted + 1
    });
    window.location.reload();
  };

  componentDidMount() {
    fetch(this.api)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            id: result.id,
            isShiny: false,
            name: result.name,
            types: result.types,
            height: result.height,
            weight: result.weight,
            abilities: result.abilities,
            hasGenderDifferences: result.sprites.front_female
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
    fetch(this.pokemonDetailsApi)
      .then(res => res.json())
      .then(result => {
        let text = result.flavor_text_entries.filter(
          lan => lan.language.name === "en"
        );
        this.setState({
          genera: result.genera[2].genus,
          description: text[0].flavor_text,
          evolutions: result.evolution_chain.url,
          firstEv: "",
          firstImg: "",
          secondEv: "",
          secondImg: "",
          thirdEv: "",
          thirdImg: ""
        });
      });
  }

  num = 0;
  first = "";
  firstImg = "";
  second = "";
  secondImg = "";
  third = "";
  thirdImg = "";
  render() {
    fetch(this.state.evolutions)
      .then(res => res.json())
      .then(result => {
        if (result.chain.species.name !== undefined) {
          this.first = result.chain.species.name;
        }
        if (result.chain.evolves_to[0] !== undefined) {
          this.second = result.chain.evolves_to[0].species.name;
          if (result.chain.evolves_to[0].evolves_to[0] !== undefined) {
            this.third = result.chain.evolves_to[0].evolves_to[0].species.name;
          }
        }
        this.setState({
          firstEv: this.first,
          firstImg: this.firstImg,
          secondEv: this.second,
          secondImg: this.secondImg,
          thirdEv: this.third,
          thirdImg: this.thirdImg
        });
      });
    const {
      error,
      isLoaded,
      hasGenderDifferences,
      name,
      genera,
      id,
      isShiny,
      types,
      height,
      weight,
      description,
      abilities,
      firstEv,
      secondEv,
      thirdEv
    } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <LoadingSpinner/>;
    } else {
      this.num = pad(id, 3);

      return (
        <div className="Pokemon">
          <h2 id="id">N.º{!!id && id < 10001 ? this.num : this.num - 9193}</h2>
          {!isShiny ? (
            <img
              src={this.maleFront + id + ".png"}
              onError={addDefaultSrc}
              className="pokemon"
              alt={name}
            />
          ) : (
            ""
          )}
          {!isShiny ? (
            <img
              src={this.maleBack + id + ".png"}
              onError={addDefaultSrc}
              className="pokemon"
              alt={name}
            />
          ) : (
            ""
          )}
          {!isShiny && hasGenderDifferences ? (
            <img
              src={this.femaleFront + id + ".png"}
              className="pokemon"
              alt={""}
            />
          ) : (
            ""
          )}
          {!isShiny && hasGenderDifferences ? (
            <img
              src={this.femaleBack + id + ".png"}
              className="pokemon"
              alt={""}
            />
          ) : (
            ""
          )}
          {isShiny ? (
            <img
              src={this.maleFrontShiny + id + ".png"}
              onError={addDefaultSrc}
              className="pokemon"
              alt={name}
            />
          ) : (
            ""
          )}
          {isShiny ? (
            <img
              src={this.maleBackShiny + id + ".png"}
              onError={addDefaultSrc}
              className="pokemon"
              alt={name}
            />
          ) : (
            ""
          )}
          {isShiny && hasGenderDifferences ? (
            <img
              src={this.femaleFrontShiny + id + ".png"}
              className="pokemon"
              alt={""}
            />
          ) : (
            ""
          )}
          {isShiny && hasGenderDifferences ? (
            <img
              src={this.femaleBackShiny + id + ".png"}
              className="pokemon"
              alt={""}
            />
          ) : (
            ""
          )}
          <Button variant="danger" onClick={this.toggleShiny}>
            Shiny appearance
          </Button>
          <div className="details">
            <h1 id="name">{!!name ? capitalize(name) : ""}</h1>
            <h2>{!!genera ? genera : ""}</h2>
            <Stats />
            <div className="types">
              {!!types
                ? types.map(type => (
                    <span id={type.type.name}>{type.type.name}</span>
                  ))
                : ""}
            </div>
            <p>{!!description ? description : ""}</p>
            <span>
              Height:
              <span className="info"> {!!height ? height / 10 : ""} m </span>
            </span>
            <span>
              Weight:
              <span className="info"> {!!weight ? weight / 10 : ""} kg </span>
            </span>
            <div className="abilities">
              <br />
              <h1>Abilities</h1>
              <span className="info">
                {!!abilities
                  ? abilities.map(ability => (
                      <div>
                        <a
                          target="_blank"
                          href={
                            "https://pokemon.fandom.com/wiki/" +
                            ability.ability.name
                          }
                        >
                          {capitalize(ability.ability.name).replace(
                            "-",
                            " "
                          )}
                        </a>
                      </div>
                    ))
                  : ""}
              </span>
              <ul>
                <Nav>
                  <NavLink
                    to={"/pokemon/" + firstEv + "/"}
                    onClick={this.remount}
                  >
                    <li>
                      <h1>
                        {!!secondEv
                          ? capitalize(firstEv)
                          : "This pokemon doesn't evolve"}
                      </h1>
                      {firstEv === name && !!secondEv ? (
                        <img
                          src={this.maleFront + id + ".png"}
                          onError={addDefaultSrc}
                          className="pokemon"
                          alt={name}
                        />
                      ) : secondEv === name ? (
                        <img
                          src={this.maleFront + (id - 1) + ".png"}
                          onError={addDefaultSrc}
                          className="pokemon"
                          alt={name}
                        />
                      ) : thirdEv === name ? (
                        <img
                          src={this.maleFront + (id - 2) + ".png"}
                          onError={addDefaultSrc}
                          className="pokemon"
                          alt={name}
                        />
                      ) : (
                        ""
                      )}
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
                      {secondEv === name ? (
                        <img
                          src={this.maleFront + id + ".png"}
                          onError={addDefaultSrc}
                          className="pokemon"
                          alt={name}
                        />
                      ) : firstEv === name && !!secondEv ? (
                        <img
                          src={this.maleFront + (id + 1) + ".png"}
                          onError={addDefaultSrc}
                          className="pokemon"
                          alt={name}
                        />
                      ) : thirdEv === name ? (
                        <img
                          src={this.maleFront + (id - 1) + ".png"}
                          onError={addDefaultSrc}
                          className="pokemon"
                          alt={name}
                        />
                      ) : (
                        ""
                      )}
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
                    <li>
                      <h1>{!!thirdEv ? capitalize(thirdEv) : ""}</h1>
                      {thirdEv === name && !!thirdEv ? (
                        <img
                          src={this.maleFront + id + ".png"}
                          onError={addDefaultSrc}
                          className="pokemon"
                          alt={name}
                        />
                      ) : secondEv === name && !!thirdEv ? (
                        <img
                          src={this.maleFront + (id + 1) + ".png"}
                          onError={addDefaultSrc}
                          className="pokemon"
                          alt={name}
                        />
                      ) : firstEv === name && !!thirdEv ? (
                        <img
                          src={this.maleFront + (id + 2) + ".png"}
                          onError={addDefaultSrc}
                          className="pokemon"
                          alt={name}
                        />
                      ) : (
                        ""
                      )}
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

export default Pokemon;
