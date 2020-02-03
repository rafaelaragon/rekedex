import React, { Component } from "react";
import "./Stats.css";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";
import { loadStats } from "../../redux/actions";
import { connect } from "react-redux";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  //Datos del pokemon para llamar a la api
  queryString = window.location.pathname;
  pokemonName = this.queryString.substring(9);

  componentDidMount() {
    this.props.loadStats(this.pokemonName);
  }

  //FiddleUrl for chart
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/6ebcxbx4/";

  render() {
    const { isLoaded, speed, spDef, spAtt, defense, attack, health } = this.props;
    if (!isLoaded) {
      return <LoadingSpinner />;
    } else {
      const data = [
        {
          subject: "HP",
          A: health,
          fullMark: 255
        },
        {
          subject: "Defense",
          A: defense,
          fullMark: 250
        },
        {
          subject: "SP. Def",
          A: spDef,
          fullMark: 250
        },
        {
          subject: "Speed",
          A: speed,
          fullMark: 180
        },
        {
          subject: "Sp. Att",
          A: spAtt,
          fullMark: 194
        },
        {
          subject: "Attack",
          A: attack,
          fullMark: 190
        }
      ];

      return (
        <div className="Stats">
          <RadarChart
            cx={300}
            cy={150}
            outerRadius={100}
            width={500}
            height={300}
            data={data}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />

            <Radar
              name="Stat"
              dataKey="A"
              stroke="#000000"
              fill="#b03838"
              fillOpacity={0.8}
            />
          </RadarChart>
        </div>
      );
    }
  }
}

//Redux
function mapState(state) {
  return {
    stats: state.statsReducer.stats,
    speed: state.statsReducer.speed,
    spDef: state.statsReducer.spDef,
    spAtt: state.statsReducer.spAtt,
    defense: state.statsReducer.defense,
    attack: state.statsReducer.attack,
    health: state.statsReducer.health,
    isLoaded: state.statsReducer.isLoaded
  };
}

const mapDispatch = { loadStats };

export default connect(mapState, mapDispatch)(Stats);
