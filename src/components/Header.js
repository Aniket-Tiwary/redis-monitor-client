import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <p className="breadcrumb">
      <Link to="/"> Home </Link> &gt;{" "}
      {/* <Link to={this.state.url}> {this.state.title} </Link> */}
    </p>
  );
}

export default Header;
