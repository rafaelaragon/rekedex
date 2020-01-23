import React from "react";
import "./Home.css";
import logo from "../../assets/images/Rekedex_big.png";

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <h1><img src={logo} className="logo" alt="Rekedex" /></h1>
        <p>
          <ul>
            <h2>Known issues:</h2>
            <li>The evolution chains of the pokemons whose evolutions were added in different generations are wrong (e.g. Pikachu)</li>
            <li>Pagination style must be fixed</li>
            <li>Moves is not complete</li>
          </ul>
          <br/>
          Api: <a target="_blank" rel="noopener noreferrer" href="https://pokeapi.co/">Pokeapi(v2)</a>
        </p>
      </div>
    );
  }
}

export default Home;
