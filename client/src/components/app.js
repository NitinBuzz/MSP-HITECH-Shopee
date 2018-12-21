import React, { Component } from "react";
import ProductList from "./ProductList";
import Footer from "./footer";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <ProductList />
        <Footer />
      </div>
    );
  }
}
