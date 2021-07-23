import _ from "lodash";
import React, { Component } from "react";

class Paginate extends Component {
  render() {
    const { itemcount, pagesize, currentpage } = this.props;
    const pagecount = Math.ceil(itemcount / pagesize);
    if (pagecount === 1) return null;
    const pages = _.range(1, pagecount + 1);
    return (
      <nav>
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentpage ? "page-item active" : "page-item"
              }
            >
              <a
                onClick={() => this.props.onpagechange(page)}
                className="page-link"
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Paginate;
