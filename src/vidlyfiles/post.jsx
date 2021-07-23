import React, { Component } from 'react';

class Posts extends Component {
    render() { 
        return ( 
            <div>
                <h2>Welcome to Post Section</h2>
                year:{this.props.match.params.year}, month:{this.props.match.params.month}
            </div>
        );
    }
}
 
export default Posts;