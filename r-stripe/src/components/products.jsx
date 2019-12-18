/*Responsible for rendering a list of products to the DOM */

import React from "react"
import './Products.scss';

//products is the products hardcorded in products.js
//selectedProduct is a singleFunction that updates app components state that holds product
//history is the history object that allows for safe route navigation
const Products = ({ products, selectProduct, history}) =>{
    const handlePurchase = prod => () =>{
        selectProduct(prod);
        history.push('./checkout')
    };

    return products.map(prod => (
        <div className="product" key={prod.id}>
            <section>
                <h2>{prod.name}</h2>
                <p>{prod.desc}</p>
                <h3>{'$' + prod.price}</h3>
                <button type="button" onClick={handlePurchase(prod)}>
                    PURCHASE
                </button>
            </section>
            <img src={prod.img} alt={prod.name}/>
        </div>
    ))
};

export default Products;
