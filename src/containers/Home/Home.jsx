import React from "react";
import "./Home.css";
import logo from "../../assets/images/Rekedex_big.png";

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <h1>
          <img src={logo} className="logo" alt="Rekedex" />
        </h1>
        <p>
          <ul>
            <h2>
              This project was made to learn react basics and redux.{" "}
              <h3>Packages used:</h3>
            </h2>
            <li>react-bootstrap</li>
            <li>node-sass</li>
            <li>react-router-dom</li>
            <li>recharts</li>
            <li>redux</li>
            <li>redux-thunk</li>
          </ul>
          <br />
          Api:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://pokeapi.co/"
          >
            Pokeapi(v2)
          </a>
        </p>
      </div>
    );
  }
}

export default Home;
