import _ from "lodash";
import React, { Component } from "react";

class Tablebody extends Component {
  state = {};
  rendercell = (item, column) => {
    if (column.content) {
      return column.content(item);
    } else {
      return _.get(item, column.path);
    }
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={column.path || column.key}>
                {this.rendercell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default Tablebody;
