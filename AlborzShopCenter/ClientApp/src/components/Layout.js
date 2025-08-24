import React, { Component } from "react";
import { ContainersHeader } from "./Store/Containers";
import { Footer } from "./Footer";

export class Layout extends Component {
  render() {
    return (
      <div>
        <ContainersHeader />
        <div>{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}
