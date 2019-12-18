//first 3 imports required for a single page react app
import React, {useState} from "react";
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Products from './products';
import Checkout from './checkout';
import {products} from '../products';

//create new history instance
const history = createBrowserHistory();

//create a new functional component called app
//app has a state variable which hold selected product
//return a router instance defining all routes and their components
//in the first route, render products component and pass in three props
//in 2nd route, render checkout and pass 2 props
const App = () =>{
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <Router history={history}>
            <Switch>
                <Route
                    exact
                    path="/"
                    render = {() => (
                        <Products
                            products={products}
                            selectProduct = {setSelectedProduct}
                            history = {history}
                        />
                )}
                />
                <Route
                    path="/checkout"
                    render = {() =>(
                        <Checkout
                            selectedProduct = {selectedProduct}
                            history={history}
                        />
                    )}
                />
            </Switch>
        </Router>
    )
};

export default App