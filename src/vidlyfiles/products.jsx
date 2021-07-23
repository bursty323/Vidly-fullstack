import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class Products extends Component {
    state={
        products : [
            {id:1, name: "Product 1"},
            {id:2, name: "Product 2"},
            {id:3, name: "Product 3"},
        ]
    }

    render() { 
        return ( 
        <React.Fragment >
            <h2>Choose yours from our wide variety of option</h2>
            <ul>
                {this.state.products.map(product => (
                    <li key={product.id}>
                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </li>
                ))}
            </ul>
        </React.Fragment>


        );
    }
}
 
export default Products;