import React, { Component } from "react";
import "./Stats.css";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

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
  api = "https://pokeapi.co/api/v2/pokemon/" + this.pokemonName;

  componentDidMount() {
    fetch(this.api)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            id: result.id,
            stats: result.stats
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

  //FiddleUrl for chart
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/6ebcxbx4/";

  render() {
    const { error, isLoaded, stats } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const data = [
        {
          subject: "HP",
          A: stats[5].base_stat,
          fullMark: 255
        },
        {
          subject: "Defense",
          A: stats[3].base_stat,
          fullMark: 250
        },
        {
          subject: "SP. Def",
          A: stats[1].base_stat,
          fullMark: 250
        },
        {
          subject: "Speed",
          A: stats[0].base_stat,
          fullMark: 180
        },
        {
          subject: "Sp. Att",
          A: stats[2].base_stat,
          fullMark: 194
        },
        {
          subject: "Attack",
          A: stats[4].base_stat,
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
              fill="#ffff00"
              fillOpacity={0.6}
            />
          </RadarChart>
        </div>
      );
    }
  }
}

export default Stats;
