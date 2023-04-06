import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default class PaypalButton extends React.Component {
    render() {
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
                    onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                            const name = details.payer.name.given_name;
                            const address = details.payer;
                            const transactionId =
                                details.purchase_units[0].payments.captures[0]
                                    .id;
                            data.paymentID = transactionId;
                            const mergedObj = Object.assign({}, data, address);
                            console.log(mergedObj); // { a: 1, b: 2, c: 3, d: 4 }
                            console.log(
                                "The payment was succeeded!",
                                mergedObj,
                                address
                            );
                            this.props.tranSuccess(mergedObj);
                        });
                    }}
                    onError={onError}
                    // onSuccess={(data) => {
                    //     console.log("The payment was succeeded!", data);
                    //     this.props.tranSuccess(data);
                    // }}
                    onCancel={onCancel}
                    style={style}
                />
            </PayPalScriptProvider>
        );
    }
}
