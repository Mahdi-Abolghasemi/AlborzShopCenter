import React, { Component } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export class PaypalCheckout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: { success: false, details: "" },
      paymentDetails: {
        transactionId: "",
        intent: "",
        status: "",
        name: "",
        email: "",
        countryCode: "",
        createTime: "",
      },
      alerts: {
        show: false,
        message: "",
        className: "",
      },
    };
  }

  createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: "Sum of your shopping",
          amount: {
            currency_code: "USD",
            value: this.props.totalAmount,
          },
        },
      ],
    });
  };

  approveOrder = (data, actions) => {
    return actions.order.capture().then((_details) => {
      this.setState(
        {
          paymentDetails: {
            transactionId: _details.id,
            intent: _details.intent,
            status: _details.status,
            name: `${_details.payer.name.given_name} ${_details.payer.name.surname}`,
            email: _details.payer.email_address,
            countryCode: _details.payer.address.country_code,
            createTime: _details.create_time,
          },
          alerts: {
            show: true,
            message: "Payment successful.",
            className: "alert alert-success text-center col",
          },
        },
        () =>
          setTimeout(() => {
            this.props.checkoutCallBack(this.state.paymentDetails);
          }, 5000)
      );
    });
  };

  errorOrder = () => {
    this.setState({
      alerts: {
        show: true,
        message: "An Error occured with your payment.",
        className: "alert alert-danger text-center col",
      },
    });
  };

  cancelOrder = () => {
    this.setState({
      alerts: {
        show: true,
        message: "Payment Cancel.",
        className: "alert alert-danger text-center col",
      },
    });
  };

  render() {
    return (
      <section className="d-flex justify-content-center">
        <div
          className="card"
          style={{
            width: "40rem",
          }}
        >
          <div className="card-body">
            <PayPalScriptProvider
              className="d-flex row row-cols-1"
              options={{
                "client-id": process.env.REACT_APP_ClientId,
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => this.createOrder(data, actions)}
                onApprove={(data, actions) => this.approveOrder(data, actions)}
                onCancel={() => this.cancelOrder()}
                onError={() => this.errorOrder()}
              />
              <button
                className="btn btn-secondary btn-lg col mb-4"
                onClick={this.props.backCallBack}
              >
                Back
              </button>
              <div
                className={this.state.alerts.className}
                style={
                  this.state.alerts.show
                    ? { display: "block" }
                    : { display: "none" }
                }
                role="alert"
              >
                {this.state.alerts.message}
              </div>
            </PayPalScriptProvider>
          </div>
        </div>
      </section>
    );
  }
}
