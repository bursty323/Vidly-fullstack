import React, { Component } from 'react';

class Productdetails extends Component {

    handlesave = () =>{
        //this.props.history.push('/products'); on clicking back button you can undo action
        this.props.history.replace('/products');
    }
    render() { 
        return ( 
            <div>
                <h1>Product Details</h1>
                <button onClick={this.handlesave}>Save</button>
            </div>
        );
    }
}
 
export default Productdetails;