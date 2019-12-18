import React, {useState} from "react";
import {link} from 'react-router-dom';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    injectStripe
} from 'react-stripe-elements';
import axios from 'axios';
import './CheckoutForm.scss'

/*  stripe elements are a set of prebuilt UI elements that allows you to collect user card information
* injectstripe takes the stripe object init in stripeProvider component and injects the object into any component
* wrapped with it
* Axios is a promise based HTTP client */

const CheckoutForm = ({selectedProduct, stripe, history}) =>{
    if (selectedProduct == null) history.push('/')

    const [receiptUrl, setReceiptUrl] = useState('');

    const handleSubmit = async event =>{
        event.preventDefault();

        const {token} = await stripe.createToken()

        const order = await axios.post(
            'http://localhost:7000/api/stripe/charge', {
                amount: selectedProduct.price.toString().replace('.', ''),
                source: token,
                receipt_email: 'customer@example.com',

            }
        );
        setReceiptUrl(order.data.charge)

        /*Check if product exist, if not, route user to homepage
        * Define a function, handleSubmit, which will be called when the checkout form is submitted.
        * Handle submit: prevent default behavior of form element so that page doesnt refresh.
        * Destructure a token value from the result of an async call to stripe.createToken which
        * tokenizes the card info and sends to stripe server and returns token object.
        * make a post request
        *  */



    };
    if(receiptUrl){
        return (
            <div className='success'>
                <h2>Payment Successful</h2>
                <a href={receiptUrl}>View Receipt</a>
                <Link to="/">Home</Link>
            </div>
        )
    }

    return (
        <div className="checkout-form">
            <p>Amount: ${selectedProduct.price}</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Card details
                    <CardNumberElement/>
                </label>
                <label>
                    Expiration Date
                    <CardExpiryElement/>
                </label>
                <label>
                    CVC
                    <CardCVCElement/>
                </label>
                <button type="submit" className="order-button">
                    Pay
                </button>
            </form>
        </div>
    )

};

export default injectStripe(CheckoutForm)
