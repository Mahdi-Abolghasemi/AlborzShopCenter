import React, { Component } from "react";
import { Trash, Plus, Dash, Bag } from "react-bootstrap-icons";
import { RestDataSource } from "./RestDataSource";
import { TimeSending, Cities, Countries, dataSettings } from "./Data";
import { StatusOrderEnum } from "../Enumeration/StatusOrderEnum";
import { StatusOrderDetailsEnum } from "../Enumeration/StatusOrderDetailsEnum";
import { PaypalCheckout } from "./PaypalCheckout";
import SecurityChack from "./api-authorization/SecurityChack";

export class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCompleteBuyPage: false,
      showPaypalCheckout: false,
      showResultPage: false,
      timeSending: [],
      date: [],
      countries: [],
      allCities: [],
      cities: [],
      order: [],
      settings: {
        id: 0,
        boarding: 0,
        daily: 0,
        numbersOfDayForSelect: 0,
        numbersOfDayForSupport: 0,
      },
      result: "",
      formData: {
        status: StatusOrderEnum.Active,
        timeSendingId: 0,
        deliveryTime: "",
        deliveryDate: "",
        countryId: 0,
        countryName: "",
        cityId: 0,
        cityName: "",
        postalCode: "",
        receiverAddress: "",
        clientId: "00000000-0000-0000-0000-000000000000",
        orderDate: "",
        shippingCost: 0,
        amountOfOrders: 0,
        totalAmount: 0,
        paymentDetails: {},
        orderDetails: [
          {
            status: StatusOrderDetailsEnum.Preparing,
            productId: 0,
            productImagePath: "",
            productTitle: "",
            number: 0,
            price: 0.0,
            color: "",
            size: "",
          },
        ],
      },
      searchData: {
        orderNumber: "",
        status: -1,
        orderDate: "",
        deliveryDate: "",
        timeSendingId: -1,
      },
      activeSupport: false,
      fieldValidations: {
        timeSendingId: true,
        countryId: true,
        cityId: true,
        postalCode: true,
        receiverAddress: true,
      },
      alerts: {
        show: false,
        message: "",
        className: "",
      },
    };

    this.orderDataSource = new RestDataSource("Order");
    this.timeSendingDataSource = new RestDataSource("TimeSending");
    this.countryDataSource = new RestDataSource("Countries");
    this.cityDataSource = new RestDataSource("Cities");
    this.settingDataSource = new RestDataSource("Settings");
  }

  componentDidMount = () => {
    this.getActiveTimeSending();
  };

  getActiveTimeSending = async () => {
    await this.settingDataSource.GetAll((res) =>
      this.setState({ settings: res })
    );

    await this.timeSendingDataSource.GetAll((res) =>
      this.setState({ timeSending: res })
    );

    await this.countryDataSource.GetAll((res) =>
      this.setState({ countries: res })
    );

    await this.cityDataSource.GetAll((res) =>
      this.setState({ allCities: res })
    );

    // await this.setState({ countries: Countries });

    // await this.setState({ allCities: Cities });
  };

  checkDeliveryDate = async (_start, _end) => {
    let searchDeliveryDate = {
      status: StatusOrderEnum.Active,
      deliveryDateOf: _start.toDateString(),
      deliveryDateTo: _end.toDateString(),
      daysForSelect: this.state.settings.numbersOfDayForSelect,
    };

    await this.orderDataSource.OtherMethod(
      "post",
      "CheckDeliveryDate",
      searchDeliveryDate,
      (res) => this.setState({ activeSupport: res })
    );
  };

  selectDeliveryDateTime = async () => {
    let systemDate = new FormData();
    systemDate.append("clientSystemDate", new Date().toDateString());
    let resultSystemDate;

    await this.orderDataSource.OtherMethod(
      "post",
      "CheckClientSystemDate",
      systemDate,
      (res) => (resultSystemDate = res)
    );

    if (resultSystemDate) {
      await this.setState({
        alerts: {
          show: false,
          message: "",
          className: "",
        },
      });

      await this.setState({
        timeSending: this.state.timeSending.filter((i) => i.active !== 0),
      });

      await this.setState({
        countries: this.state.countries.filter((i) => i.useOrder !== 0),
      });

      let _start = new Date();
      let _end = new Date();
      let _date = [];
      _end.setDate(_end.getDate() + this.state.settings.numbersOfDayForSelect);

      await this.checkDeliveryDate(_start, _end);

      if (this.state.activeSupport) {
        _end.setDate(
          _end.getDate() + this.state.settings.numbersOfDayForSupport
        );
      }

      while (_start < _end) {
        _date.push(_start.toDateString());
        _start.setDate(_start.getDate() + 1);
      }
      await this.setState({ date: _date });
      this.setState({ showCompleteBuyPage: true });

      let _amountOfOrders = 0.0;
      await this.props.orders.map(
        (i) => (_amountOfOrders = _amountOfOrders + i.amount)
      );

      await this.setState({
        formData: {
          ...this.state.formData,
          amountOfOrders: _amountOfOrders,
          totalAmount: _amountOfOrders + this.state.formData.shippingCost,
        },
      });
    } else {
      await this.setState({
        alerts: {
          show: true,
          message:
            "Your system date is incorrect. Please correct the system date.",
          className: "alert alert-danger text-center",
        },
      });
    }
  };

  // selectDeliveryDateTime = async () => {
  //   this.setState({ showCompleteBuyPage: true });

  //   let _amountOfOrders = 0.0;
  //   await this.props.orders.map(
  //     (i) => (_amountOfOrders = _amountOfOrders + i.amount)
  //   );

  //   await this.setState({
  //     formData: {
  //       ...this.state.formData,
  //       amountOfOrders: _amountOfOrders,
  //       totalAmount: _amountOfOrders + this.state.formData.shippingCost,
  //     },
  //   });
  // };

  selectTimeSending = (_timeSending) => {
    this.setState({
      formData: {
        ...this.state.formData,
        timeSendingId: _timeSending.id,
        deliveryTime: _timeSending.of + "-" + _timeSending.to,
      },
    });
  };

  setCountry = async (event) => {
    await this.setState({
      formData: {
        ...this.state.formData,
        countryId: event.target.value,
        cityId: 0,
        cityName: "",
        totalAmount:
          this.state.formData.totalAmount - this.state.formData.shippingCost,
        shippingCost: 0,
      },
      cities: [],
    });

    this.state.allCities.map((i) =>
      i.countryId == this.state.formData.countryId && i.useOrder !== 0
        ? this.setState({
            cities: this.state.cities.concat(i),
          })
        : ""
    );
  };

  setValue = (event) => {
    switch (event.target.name) {
      case "city":
        this.state.cities.map((i) =>
          i.id == event.target.value
            ? this.setState({
                formData: {
                  ...this.state.formData,
                  cityId: i.id,
                  cityName: i.name,
                  countryName: i.countryName,
                  shippingCost: i.shippingCost,
                  totalAmount: this.state.formData.totalAmount + i.shippingCost,
                },
              })
            : ""
        );
        break;
      case "postalCode":
        this.setState({
          formData: {
            ...this.state.formData,
            postalCode: event.target.value,
          },
        });
        break;
      case "receiverAddress":
        this.setState({
          formData: {
            ...this.state.formData,
            receiverAddress: event.target.value,
          },
        });
        break;
    }
  };

  checkValidation = async () => {
    let error = 0;
    let _fieldValidations = {
      timeSendingId: true,
      countryId: true,
      cityId: true,
      postalCode: true,
      receiverAddress: true,
    };

    Object.keys(this.state.fieldValidations).forEach((field) => {
      if (
        this.state.formData[field] === "" ||
        this.state.formData[field] == 0
      ) {
        error++;
        _fieldValidations[field] = false;
      }
    });

    this.setState({ fieldValidations: _fieldValidations });

    if (error === 0) {
      const securityChack = new SecurityChack();
      const _clientId = await securityChack.getUserId();

      await this.setState({
        formData: {
          ...this.state.formData,
          status: StatusOrderEnum.Active,
          clientId: _clientId,
          orderDate: new Date().toDateString(),
          orderDetails: [],
        },
      });

      this.props.orders.map((i) =>
        this.setState({
          formData: {
            ...this.state.formData,
            orderDetails: this.state.formData.orderDetails.concat({
              status: StatusOrderDetailsEnum.Preparing,
              productId: i.productId,
              productImagePath: i.imagePath,
              productTitle: i.name + " " + i.model,
              number: i.number,
              price: i.price,
              color: {
                id: i.colorId,
                color: i.color,
              },
              size: { id: i.sizeId, size: i.size },
            }),
          },
        })
      );

      this.setState({
        showCompleteBuyPage: false,
        showPaypalCheckout: true,
      });
    }
  };

  resultCheckout = async (data) => {
    await this.setState({
      formData: {
        ...this.state.formData,
        paymentDetails: data,
      },
    });

    this.save();
  };

  save = async () => {
    await this.orderDataSource.Insert(this.state.formData, (res) =>
      this.setState(
        {
          showCompleteBuyPage: false,
          showPaypalCheckout: false,
          showResultPage: true,
          result: res,
        },
        this.clear
      )
    );

    await this.props.orders.map((i) => this.props.onDeleteOrder(i.id));
  };

  backToCart = () => {
    this.setState({
      showCompleteBuyPage: false,
      formData: { ...this.state.formData, timeSendingId: 0 },
    });
  };

  clear = () => {
    this.setState({
      formData: {
        status: StatusOrderEnum.Active,
        timeSendingId: 0,
        deliveryTime: "",
        deliveryDate: "",
        countryId: 0,
        countryName: "",
        cityId: 0,
        cityName: "",
        postalCode: "",
        receiverAddress: "",
        clientId: "00000000-0000-0000-0000-000000000000",
        orderDate: "",
        shippingCost: 0,
        amountOfOrders: 0,
        totalAmount: 0,
        paymentDetails: {},
        orderDetails: [
          {
            status: StatusOrderDetailsEnum.Preparing,
            productId: 0,
            productImagePath: "",
            productTitle: "",
            number: 0,
            price: 0.0,
            color: "",
            size: "",
          },
        ],
      },
      searchData: {
        orderNumber: "",
        status: -1,
        orderDate: "",
        deliveryDate: "",
        timeSendingId: -1,
      },
      timeSending: [],
      date: [],
      countries: [],
      allCities: [],
      cities: [],
      settings: [],
      fieldValidations: {
        timeSendingId: true,
        countryId: true,
        cityId: true,
        postalCode: true,
        receiverAddress: true,
      },
      alerts: {
        show: false,
        message: "",
        className: "",
      },
    });
  };

  selectDeliveryDate = async (_btnValue, _btnId) => {
    for (let i = 0; i < this.state.date.length; i++) {
      document.getElementById(`btn${i}`).className =
        "btn btn-outline-primary m-1";
    }

    document.getElementById(_btnId).className = "btn btn-primary m-1";
    document.getElementById("divflexRadio").style.display = "";

    await this.setState({
      formData: {
        ...this.state.formData,
        timeSendingId: 0,
        deliveryDate: _btnValue,
      },
      searchData: {
        ...this.state.searchData,
        status: StatusOrderEnum.Active,
        deliveryDate: _btnValue,
      },
    });

    await this.orderDataSource.Search(this.state.searchData, (res) =>
      this.setState({ order: res })
    );

    let _counter;
    for (let i = 0; i < this.state.timeSending.length; i++) {
      _counter = 0;
      for (let j = 0; j < this.state.order.length; j++) {
        if (this.state.timeSending[i].id == this.state.order[j].timeSendingId) {
          _counter++;
        }
      }

      document.getElementById(`flexRadioDefault${i}`).disabled =
        _counter == this.state.timeSending[i].maximumNumberOfOrders
          ? true
          : false;
    }

    if (this.state.settings.daily) {
      if (_btnValue == new Date().toDateString()) {
        let currentTime = new Date().getHours();
        let saveTime;
        let result;

        for (let i = 0; i < this.state.timeSending.length; i++) {
          saveTime = this.state.timeSending[i].of.slice(0, 2);
          result =
            currentTime <
            saveTime - this.state.timeSending[i].orderPreparationTime;

          if (!result) {
            document.getElementById(`flexRadioDefault${i}`).disabled = true;
          }
        }
      } else if (_btnValue.substring(8, 10) - new Date().getDate() == 1) {
        let currentTime = new Date().getHours();
        let saveTime;
        let result;

        saveTime = this.state.timeSending[
          this.state.timeSending.length - 1
        ].of.slice(0, 2);
        result =
          currentTime <
          saveTime -
            this.state.timeSending[this.state.timeSending.length - 1]
              .orderPreparationTime;

        if (!result) {
          document.getElementById(`flexRadioDefault${0}`).disabled = true;
        }
      }
    } else if (this.state.settings.boarding) {
      let currentTime = new Date().getHours();
      let saveTime;
      let result;

      for (let i = 0; i < this.state.timeSending.length; i++) {
        saveTime = this.state.timeSending[i].of.slice(0, 2);
        result =
          currentTime <
          saveTime - this.state.timeSending[i].orderPreparationTime;

        if (!result) {
          document.getElementById(`flexRadioDefault${i}`).disabled = true;
        }
      }
    }
  };

  backToCompleteBuyPage = () => {
    this.setState({
      showCompleteBuyPage: true,
      showPaypalCheckout: false,
    });
  };

  render() {
    if (this.props.orders.length > 0) {
      if (this.state.showCompleteBuyPage) {
        return (
          <section className="bodyApp cart-section">
            <div>
              <div
                className={
                  this.state.fieldValidations.timeSendingId
                    ? "cart-div mb-3"
                    : "cart-div mb-3 border border-danger position-relative"
                }
              >
                <div>
                  <h5>Select Time Sending:</h5>
                  {this.state.date.map((value, index) => (
                    <button
                      className="btn btn-outline-primary m-1"
                      id={`btn${index}`}
                      onClick={() =>
                        this.selectDeliveryDate(value, `btn${index}`)
                      }
                    >
                      {value.substring(4, 10)}
                    </button>
                  ))}

                  <div
                    className="form-group mt-2"
                    id="divflexRadio"
                    style={{ display: "none" }}
                  >
                    {this.state.timeSending.map((value, index) => (
                      <div className="custom-control custom-radio">
                        <input
                          className="custom-control-input"
                          type="radio"
                          name="flexRadio"
                          checked={
                            value.id === this.state.formData.timeSendingId
                              ? true
                              : false
                          }
                          id={`flexRadioDefault${index}`}
                          onChange={() => this.selectTimeSending(value)}
                        />
                        <label
                          class="custom-control-label"
                          for={`flexRadioDefault${index}`}
                        >
                          {value.of} - {value.to}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className="invalid-tooltip"
                  style={{
                    display: this.state.fieldValidations.timeSendingId
                      ? "none"
                      : "inline",
                  }}
                >
                  Please select a time sending.
                </div>
              </div>

              <div className="cart-div border-0 mb-3">
                <div className="mb-2">
                  <h5>Address:</h5>
                  <div>
                    <div className="row row-cols-2">
                      <div className="position-relative form-group col">
                        <label>Select Country:</label>
                        <select
                          name="country"
                          className="form-control"
                          value={this.state.formData.countryId}
                          onChange={this.setCountry}
                          aria-label="Country"
                          style={
                            this.state.fieldValidations.countryId
                              ? {
                                  borderColor: "#ced4da",
                                }
                              : { borderColor: "#dc3545" }
                          }
                        >
                          <option value=""></option>
                          {this.state.countries.map((i) => (
                            <option value={i.id}>{i.name}</option>
                          ))}
                        </select>
                        <div
                          className="invalid-tooltip"
                          style={{
                            display: this.state.fieldValidations.countryId
                              ? "none"
                              : "inline",
                          }}
                        >
                          Please select a valid country.
                        </div>
                      </div>
                      <div className="position-relative form-group col">
                        <label>Select City:</label>
                        <select
                          name="city"
                          className="form-control"
                          value={this.state.formData.cityId}
                          onChange={this.setValue}
                          aria-label="CIty"
                          style={
                            this.state.fieldValidations.cityId
                              ? {
                                  borderColor: "#ced4da",
                                }
                              : { borderColor: "#dc3545" }
                          }
                        >
                          <option value=""></option>
                          {this.state.cities.map((i) => (
                            <option value={i.id}>{i.name}</option>
                          ))}
                        </select>
                        <div
                          className="invalid-tooltip"
                          style={{
                            display: this.state.fieldValidations.cityId
                              ? "none"
                              : "inline",
                          }}
                        >
                          Please select a valid city.
                        </div>
                      </div>
                      <div className="position-relative form-group col">
                        <label>Postal Code:</label>
                        <input
                          className="form-control"
                          type="number"
                          name="postalCode"
                          value={this.state.formData.postalCode}
                          onChange={this.setValue}
                          aria-label="Postal Code"
                          style={
                            this.state.fieldValidations.postalCode
                              ? {
                                  borderColor: "#ced4da",
                                }
                              : { borderColor: "#dc3545" }
                          }
                        />
                        <div
                          className="invalid-tooltip"
                          style={{
                            display: this.state.fieldValidations.postalCode
                              ? "none"
                              : "inline",
                          }}
                        >
                          Please fill out this field.
                        </div>
                      </div>
                    </div>
                    <div className="position-relative form-group">
                      <label>Enter Address:</label>
                      <textarea
                        className="form-control"
                        name="receiverAddress"
                        type="text"
                        value={this.state.formData.receiverAddress}
                        onChange={this.setValue}
                        placeholder="Enter Address"
                        aria-label="Address"
                        rows="2"
                        style={
                          this.state.fieldValidations.receiverAddress
                            ? {
                                borderColor: "#ced4da",
                              }
                            : { borderColor: "#dc3545" }
                        }
                      />
                      <div
                        className="invalid-tooltip"
                        style={{
                          display: this.state.fieldValidations.receiverAddress
                            ? "none"
                            : "inline",
                        }}
                      >
                        Please fill out this field.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cart-div border-0">
                <div className="mb-4">
                  <h5>
                    Amount Of Orders: ${this.state.formData.amountOfOrders}
                  </h5>
                  <h5>Shipping Cost: $ {this.state.formData.shippingCost}</h5>
                  <h5>Total: $ {this.state.formData.totalAmount}</h5>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-secondary mr-1"
                    onClick={this.backToCart}
                  >
                    Back
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={this.checkValidation}
                  >
                    Pay
                  </button>
                </div>
              </div>
            </div>
          </section>
        );
      } else if (this.state.showPaypalCheckout) {
        return (
          <div>
            <PaypalCheckout
              totalAmount={this.state.formData.totalAmount}
              checkoutCallBack={this.resultCheckout}
              backCallBack={this.backToCompleteBuyPage}
            />
          </div>
        );
      } else {
        return (
          <div>
            <section class="bodyApp">
              <div class="paddingCart-table">
                <div className="card border-0" style={{ borderRadius: "10px" }}>
                  <div class="card-body">
                    <p className="m-4">
                      <h3>Your Orders</h3>
                    </p>

                    {this.props.orders.map((i) => (
                      <div class="rounded m-4 shadow border-0 bg-white">
                        <div class="p-4">
                          <div className="d-flex justify-content-start align-items-center row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg row-cols-xl">
                            <div class="col-md-2">
                              <img
                                src={i.imagePath}
                                class="img-fluid rounded"
                                alt="Cotton T-shirt"
                              />
                            </div>
                            <div class="col-md-10">
                              <div className="d-flex justify-content-center align-items-center row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 row-cols-xl-4">
                                <div class="col">
                                  <p class="lead fw-normal mb-2">
                                    {`${i.brand} ${i.name} ${i.model}`}
                                  </p>
                                  <p>
                                    {i.size > "" ? (
                                      <span class="text-muted d-flex align-items-center">
                                        Size: {i.size}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                    <span class="text-muted d-flex align-items-center">
                                      Color:
                                      <label
                                        className="label-circle-without-cursor"
                                        style={{
                                          backgroundColor: `${i.color}`,
                                        }}
                                      />
                                    </span>
                                  </p>
                                </div>
                                <div class="col">
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <button
                                        className="btn btn-outline-primary"
                                        type="button"
                                        onClick={() =>
                                          this.props.onEditOrder(
                                            i.id,
                                            i.number - 1,
                                            i.price
                                          )
                                        }
                                        disabled={i.number > 1 ? false : true}
                                      >
                                        <Dash />
                                      </button>
                                    </div>
                                    <label className="form-control text-center">
                                      {i.number}
                                    </label>
                                    <div className="input-group-append">
                                      <button
                                        className="btn btn-outline-primary"
                                        type="button"
                                        onClick={() =>
                                          this.props.onEditOrder(
                                            i.id,
                                            i.number + 1,
                                            i.price
                                          )
                                        }
                                        disabled={
                                          i.number < i.inventory ? false : true
                                        }
                                      >
                                        <Plus />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div class="col">
                                  <h5 class="mb-0">$ {i.amount}</h5>
                                </div>
                                <div class="col">
                                  <button
                                    className="btn btn-outline-danger"
                                    type="button"
                                    onClick={() =>
                                      this.props.onDeleteOrder(i.id)
                                    }
                                  >
                                    <Trash />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

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

                    <div className="d-flex justify-content-end m-4">
                      <button
                        className="btn btn-primary"
                        onClick={this.selectDeliveryDateTime}
                      >
                        Continu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      }
    } else {
      if (this.state.showResultPage) {
        return (
          <div className="bodyApp adverCategories-div text-center">
            <div className="cart-div">
              <h1 className="text-success">
                Your order has been successfully placed.
              </h1>
              <h3>Your order number is: {this.state.result}</h3>
            </div>
          </div>
        );
      } else {
        return (
          <div className="bodyApp adverCategories-div text-center">
            <p className="text-primary">
              <Bag width="100" height="100" />
            </p>
            <h1>Your cart is empty</h1>
          </div>
        );
      }
    }
  }
}
