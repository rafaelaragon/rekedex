import React from "react";
import "./Items.css";
import Pagination from "react-bootstrap/Pagination";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { addDefaultSrc, capitalize } from "../../functions/functions";
import { loadItems } from "../../redux/actions";
import { connect } from "react-redux";

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 90,
      offset: 0
    };
  }

  changePage = async num => {
    const { limit } = this.state;
    let index = (num - 1) * limit;
    if (index >= 0 && index < 900) {
      // Nº of objects
      await this.setState({ offset: index });
      this.index = 1;
      this.props.loadItems(limit, this.state.offset);
    }
  };

  componentDidMount() {
    const { limit, offset } = this.state;
    this.props.loadItems(limit, offset);
  }

  render() {
    const { itemsList, isLoaded } = this.props;

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
        onClick={() => this.changePage(Math.floor(900 / limit))}
      />
    );
    //

    if (!isLoaded) {
      return <LoadingSpinner />;
    } else {
      return (
        <div className="Items">
          <div className="table">
            <ul>
              {itemsList.map(item =>
                !item.name.includes("--") &&
                !item.name.includes("memory") &&
                !item.name.includes("evon-scuba-gear") ? (
                  <Nav>
                    <NavLink to={"/item/" + item.name + "/"}>
                      <li>
                        <span id="item">
                          {capitalize(item.name).replace("-", " ")}
                        </span>
                        <img
                          src={
                            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/" +
                            item.name +
                            ".png"
                          }
                          alt=""
                          onError={addDefaultSrc}
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

function mapState(state) {
  return {
    itemsList: state.itemsListReducer.itemsList,
    isLoaded: state.itemsListReducer.isLoaded
  };
}

const mapDispatch = { loadItems };

export default connect(mapState, mapDispatch)(Items);
