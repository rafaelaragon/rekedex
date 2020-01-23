import React from "react";
import "./Item.css";
import Card from "react-bootstrap/Card";
import pokeDollar from "../../assets/images/PokémonDollar.png";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  //Item details to get the api call
  queryString = window.location.pathname;
  item = this.queryString.substring(6);
  api = "https://pokeapi.co/api/v2/item/" + this.item;

  //Add zeros to id
  pad(n, width, z) {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
  //

  addDefaultSrc(ev) {
    ev.target.src =
      "https://i.ya-webdesign.com/images/pixel-question-mark-png-5.png";
  }

  loadItem() {
    fetch(this.api)
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          this.setState({
            isLoaded: true,
            id: result.id,
            name: result.names.filter(name => name.language.name === "en")[0]
              .name,
            img: result.sprites.default,
            category: result.category.name,
            desc: result.effect_entries[0].effect,
            cost: result.cost
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
    this.loadItem();
  }
  render() {
    const { error, isLoaded, id, img, name, category, desc, cost } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="Item">
          <Card style={{ width: "30vw" }}>
            <Card.Header id="id">Nº{this.pad(id, 3)}</Card.Header>
            <Card.Img variant="top" src={img} />
            <Card.Body>
              <Card.Title id="name">{name}</Card.Title>
              <Card.Title id="category">
                <Nav>
                  <NavLink to={"/items/categories/" + category + "/"}>
                    {this.capitalize(category).replace("-", " ")}
                  </NavLink>
                </Nav>
              </Card.Title>
              <Card.Text id="desc">
                {!!cost && cost !== 0 ? "Cost: " + cost : "Cannot be bought"}
                {!!cost && cost !== 0 ? (
                  <img id="pokedollar" src={pokeDollar} alt="PokéDollars"></img>
                ) : (
                  ""
                )}
                <br />
                <br />
                {desc}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      );
    }
  }
}

export default Item;
