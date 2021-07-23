import React, { Component } from "react";

class Like extends Component {
  render() {
    let classes = "fa fa-heart";
    if (!this.props.liked) classes += "-o";
    return (
      <div>
        <i
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={this.props.onlike}
          className={classes}
          aria-hidden="true"
        ></i>
      </div>
    );
  }
}

export default Like;
