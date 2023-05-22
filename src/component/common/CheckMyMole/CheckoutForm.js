import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

import logo from '../../../assets/image/logo.png';
import stripe_logo from '../../../assets/image/stripe-payment-checkmyskin.png';

const CheckoutForm = (props) => {
    const { data } = props;
    const stripe = useStripe();
    const elements = useElements();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUrl, setUrl] = useState("");

    useEffect(() => {

    }, [])

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        let url = data.status === "mole" ? `${data.url}/check-my-mole` : `${data.url}/check-my-rash`
        setUrl(url);

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: isUrl,
                receipt_email: email,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    return (
        <React.Fragment>
            <div className="d-flex justify-content-center">
                <img src={stripe_logo} alt="powered by stripe" width="85%" height="130px" />
            </div>
            <div className="d-flex align-items-center justify-content-center mb-4 mt-4">
                <img src={logo} alt="logo" style={{ marginRight: "10px", width: "35px", height: "35px" }} />
                <span className="logo-check">check</span>
                <span className="logo-myskin">myskin</span>
            </div>
            <form id="payment-form" onSubmit={handleSubmit}>
                <input
                    id="email"
                    type="text"
                    className="checkout-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                />
                <PaymentElement id="payment-element" />
                <button disabled={isLoading || !stripe || !elements} id="submit" className="pay-now-btn">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
            </form>
        </React.Fragment>
    );
}

export default CheckoutForm;