import React, { Component } from "react";

class Listgroup extends Component {
  state = {};
  render() {
    const { valueproperty, textproperty, selecteditem } = this.props;
    return (
      <ul className="list-group">
        {this.props.items.map((x) => (
          <li
            onClick={() => this.props.onitemselect(x)}
            key={x[valueproperty]}
            className={
              x === selecteditem ||
              (x[textproperty] === "All Genres" && selecteditem === null)
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {x[textproperty]}
          </li>
        ))}
      </ul>
    );
  }
}

export default Listgroup;
