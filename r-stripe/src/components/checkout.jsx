import React,{useEffect} from "react";
import {StripeProvider, Elements} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm'

const Checkout = ({selectedProduct, history}) =>{
    useEffect( () =>{
        window.scrollTo(0,0)
    }, [])
    return (
        <StripeProvider apiKey="pk_test_QThgjrBUL3MZvSXw08n7rRRk00Cc9L97lu">
            <Elements>
                <CheckoutForm
                    selectedProduct = {selectedProduct}
                    history = {history}
                />
            </Elements>
        </StripeProvider>
    )
};

export default Checkout