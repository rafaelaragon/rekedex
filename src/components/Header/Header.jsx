import React, { Component } from "react";
import "./Header.css";
import logo from "../../assets/images/Rekedex.png";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      timesMounted: 1
    };
  }
  
  remount = async () => {
    await this.setState({
      timesMounted: this.state.timesMounted + 1
    });
    window.location.reload();
  };

  render() {
    return (
      <div className="Header">
        <Navbar>
          <Navbar.Brand target="_blank" href="https://github.com/rafaelaragon">
            <img src={logo} className="logo" alt="Rekedex" />
          </Navbar.Brand>
          <NavLink to="/home" activeClassName="selected">
            Home
          </NavLink>
          <NavLink to="/pokedex" activeClassName="selected">
            Pokedex
          </NavLink>
          <NavLink to="/items/" activeClassName="selected">
            <NavDropdown title="Items">
              <NavDropdown.Item href="/items/">
                <NavLink to="/items/">Item List</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/items/categories/"
                onClick={this.remount}
              >
                <NavLink to="/items/categories/">Item categories</NavLink>
              </NavDropdown.Item>
            </NavDropdown>
          </NavLink>
          <NavLink to="/moves" activeClassName="selected">
            Moves
          </NavLink>
        </Navbar>
      </div>
    );
  }
}

export default Header;
