import React, { Component } from "react";
import "./LoadingSpinner.css";
import Spinner from "react-bootstrap/Spinner";

class LoadingSpinner extends Component {
  render() {
    return (
      <div className="LoadingSpinner">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }
}

export default LoadingSpinner;
