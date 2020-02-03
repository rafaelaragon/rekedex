import React from "react";
import "./Item.css";
import Card from "react-bootstrap/Card";
import pokeDollar from "../../assets/images/PokémonDollar.png";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { addDefaultSrc, capitalize, pad } from "../../functions/functions";
import { loadItem } from "../../redux/actions";
import { connect } from "react-redux";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  //Item details to get the api call
  queryString = window.location.pathname;
  item = this.queryString.substring(6);
  api = "https://pokeapi.co/api/v2/item/" + this.item;

  /*
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
        }
      );*/
  componentDidMount() {
    this.props.loadItem(this.item);
  }

  render() {
    const { isLoaded, item, id } = this.props;
    if (!isLoaded) {
      return <LoadingSpinner />;
    } else {
      return (
        <div className="Item">
          <Card style={{ width: "30vw" }}>
            <Card.Header id="id">Nº{pad(this.props.id, 3)}</Card.Header>
            <Card.Img
              variant="top"
              src={item[id].sprites.default}
              onError={addDefaultSrc}
            />
            <Card.Body>
              <Card.Title id="name">{capitalize(item[id].name).replace("-", " ")}</Card.Title>
              <Card.Title id="category">
                <Nav>
                  <NavLink
                    to={"/items/categories/" + item[id].category.url + "/"}
                  >
                    {capitalize(item[id].category.name).replace("-", " ")}
                  </NavLink>
                </Nav>
              </Card.Title>
              <Card.Text id="desc">
                {!!item[id].cost && item[id].cost !== 0
                  ? "Cost: " + item[id].cost
                  : "Cannot be bought"}
                {!!item[id].cost && item[id].cost !== 0 ? (
                  <img id="pokedollar" src={pokeDollar} alt="PokéDollars"></img>
                ) : (
                  ""
                )}
                <br />
                <br />
                {item[id].effect_entries[0].effect}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      );
    }
  }
}

//Redux
function mapState(state) {
  return {
    id: state.itemReducer.id,
    item: state.itemReducer.item,
    isLoaded: state.itemReducer.isLoaded
  };
}

const mapDispatch = { loadItem };

export default connect(mapState, mapDispatch)(Item);
