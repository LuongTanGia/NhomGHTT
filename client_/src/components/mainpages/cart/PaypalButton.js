import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default class PaypalButton extends React.Component {
    render() {
        const onSuccess = (payment) => {
            console.log("The payment was succeeded!", payment);
            this.props.tranSuccess(payment);
        };

        const onCancel = (data) => {
            console.log("The payment was cancelled!", data);
        };

        const onError = (err) => {
            console.log("Error!", err);
        };

        let env = "sandbox"; // you can set here to 'production' for production
        let currency = "USD";

        const total = this.props.total;
        const client = {
            sandbox:
                "ATOFE04p-KWDXFc-JVVYUGzEZcXnkf_u8X6UKh8YjK8x36PigumvcprlUQ0VRK3l8P1cx5R1dscgbha1",
            production: "YOUR-PRODUCTION-APP-ID",
        };

        let style = {
            size: "small",
            color: "blue",
            shape: "rect",
            label: "checkout",
            tagline: false,
        };

        return (
            <PayPalScriptProvider
                options={{
                    "client-id":
                        "ATOFE04p-KWDXFc-JVVYUGzEZcXnkf_u8X6UKh8YjK8x36PigumvcprlUQ0VRK3l8P1cx5R1dscgbha1",
                }}
            >
                <PayPalButtons
                    env={env}
                    client={client}
                    commit={true}
                    total={total}
                    currency={currency}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: total,
                                    },
                                },
                            ],
                        });
                    }}
                    onError={onError}
                    onSuccess={onSuccess}
                    onCancel={onCancel}
                    style={style}
                />
            </PayPalScriptProvider>
        );
    }
}
