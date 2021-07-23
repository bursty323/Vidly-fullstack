import React, { Component } from "react";

//columns array
//onsort
//sortcolumn

class Tableheader extends Component {
  handlesort = (item) => {
    if (!item) return null;
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === item)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = item;
      sortColumn.order = "asc";
    }
    this.props.onsort(sortColumn);
  };
  rendersorticon(column) {
    if (column.path !== this.props.sortColumn.path) return null;
    if (this.props.sortColumn.order === "asc") {
      return <i className="fa fa-sort-asc" aria-hidden="true"></i>;
    }
    return <i className="fa fa-sort-desc" aria-hidden="true"></i>;
  }
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((x) => (
            <th key={x.path || x.key} onClick={() => this.handlesort(x.path)}>
              {x.label} {this.rendersorticon(x)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default Tableheader;
