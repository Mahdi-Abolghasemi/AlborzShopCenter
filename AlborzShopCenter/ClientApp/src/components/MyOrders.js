import React, { Component } from "react";
import { RestDataSource } from "./RestDataSource";
import { PaginationControls } from "./PaginationControls";
import { StatusOrderEnum } from "../Enumeration/StatusOrderEnum";
import { StatusOrderDetailsEnum } from "../Enumeration/StatusOrderDetailsEnum";
import Modal from "react-bootstrap/Modal";
import { ModalBody } from "react-bootstrap";
import SecurityChack from "./api-authorization/SecurityChack";
import ReactGA from "react-ga4";

export class MyOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      clientId: "",
      showDetailPage: 0,
      result: "",
      formData: {
        id: 0,
        clientId: "00000000-0000-0000-0000-000000000000",
        clientName: "",
        orderDate: new Date(),
        deleted: 0,
        status: 0,
        statusTitle: "",
        shippingCost: 0,
        amountOfOrders: 0,
        totalAmount: 0,
        receiverAddress: "",
        postalCode: 0,
        cityId: 0,
        cityName: "",
        countryName: "",
        deliveryDate: new Date(),
        TimeSendingId: 0,
        deliveryTime: "",
        orderNumber: "",
        orderDetails: [
          {
            id: 0,
            orderId: 0,
            deleted: 0,
            status: 0,
            statusTitle: "",
            productId: 0,
            productTitle: "",
            productImagePath: "",
            number: 0,
            price: 0.0,
            color: "",
            size: "",
          },
        ],
      },
      showDeleteModal: 0,
      deleteData: { orderId: 0, orderNumber: "" },
      sort: "Order Date",
      pageCount: 0,
      pageSizes: [5, 10, 25, 100],
      perPage: 5,
      offset: 0,
      currentPage: 1,
    };

    this.dataSource = new RestDataSource("Order");
  }

  componentDidMount = () => {
    this.getData();
    ReactGA.send({
      hitType: "pageview",
      page: "/myOrders",
      title: "MyOrders page",
    });
  };

  getData = async () => {
    const securityChack = new SecurityChack();
    const _clientId = await securityChack.getUserId();

    let userData = new FormData();
    userData.append("userId", _clientId);
    await this.dataSource.OtherMethod("post", "MyOrders", userData, (res) =>
      this.setState({ data: res })
    );
  };

  sliceData = () => {
    return this.state.data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
  };

  getPageCount = () => {
    return Math.ceil(this.state.data.length / this.state.perPage);
  };

  setPageSize = (value) => {
    this.setState({ perPage: value });
  };

  sortData = (value) => {
    this.setState({ sort: value }, this.compar);
  };

  compar = () => {
    if (this.state.sort === "Order Date") {
      this.setState({
        data: this.state.data.sort((a, b) =>
          a.orderDate > b.orderDate ? 1 : b.orderDate > a.orderDate ? -1 : 0
        ),
      });
    }

    if (this.state.sort === "Delivery Date") {
      this.setState({
        data: this.state.data.sort((a, b) =>
          a.deliveryDate > b.deliveryDate
            ? -1
            : b.deliveryDate > a.deliveryDate
            ? 0
            : 1
        ),
      });
    }
  };

  selectedPage = (value) => {
    this.setState({
      offset: (value - 1) * this.state.perPage,
      currentPage: value,
    });
  };

  detailData = (order) => {
    this.setState({
      formData: {
        id: order.id,
        clientId: order.clientId,
        clientName: order.clientName,
        orderDate: order.orderDate,
        deleted: order.deleted,
        status: order.status,
        statusTitle: order.statusTitle,
        shippingCost: order.shippingCost,
        amountOfOrders: order.amountOfOrders,
        totalAmount: order.totalAmount,
        receiverAddress: order.receiverAddress,
        postalCode: order.postalCode,
        cityId: order.cityId,
        cityName: order.cityName,
        countryName: order.countryName,
        deliveryDate: order.deliveryDate,
        timeSendingId: order.TimeSendingId,
        deliveryTime: order.deliveryTime,
        orderDetails: order.orderDetails,
        orderNumber: order.orderNumber,
      },
      showDetailPage: 1,
    });
  };

  cancel = () => {
    this.clear();
    this.setState({ showDetailPage: 0 });
  };

  clear = () => {
    this.setState({
      formData: {
        id: 0,
        clientId: "00000000-0000-0000-0000-000000000000",
        clientName: "",
        orderDate: new Date(),
        deleted: 0,
        status: 0,
        statusTitle: "",
        shippingCost: 0,
        amountOfOrders: 0,
        totalAmount: 0,
        receiverAddress: "",
        postalCode: 0,
        cityId: 0,
        cityName: "",
        countryName: "",
        deliveryDate: new Date(),
        timeSendingId: 0,
        deliveryTime: "",
        orderNumber: "",
        orderDetails: [
          {
            id: 0,
            orderId: 0,
            deleted: 0,
            status: 0,
            statusTitle: "",
            productId: 0,
            productTitle: "",
            productImagePath: "",
            number: 0,
            price: 0,
            color: "",
            size: "",
          },
        ],
      },
      deleteData: { orderId: 0, orderNumber: "" },
    });
  };

  cancellationOrder = async () => {
    let orderData = new FormData();
    orderData.append("orderId", this.state.deleteData.orderId);
    await this.dataSource.OtherMethod(
      "post",
      "Cancellation",
      orderData,
      (res) => this.setState({ result: res })
    );

    window.location.reload();
  };

  render() {
    if (this.state.showDetailPage) {
      return (
        <section className="page-input d-flex justify-content-center">
          <div className="card card-input">
            <div className="card-header cardH">
              <h1 className="card-title">Details Order</h1>
            </div>
            <div className="card-body">
              <form>
                <div className="d-flex row row-cols-2">
                  <div className="form-group col">
                    <label className="font-weight-bold">Order Number:</label>
                    <label className="m-1">
                      {this.state.formData.orderNumber}
                    </label>
                  </div>
                  <div className="form-group col">
                    <label className="font-weight-bold">Client Name:</label>
                    <label className="m-1">
                      {this.state.formData.clientName}
                    </label>
                  </div>
                  <div className="form-group col">
                    <label className="font-weight-bold">Status:</label>
                    <label className="m-1">
                      {
                        Object.keys(StatusOrderEnum)[
                          Object.values(StatusOrderEnum).indexOf(
                            this.state.formData.status
                          )
                        ]
                      }
                    </label>
                  </div>
                </div>

                <div className="d-flex row row-cols-2">
                  <div className="form-group col">
                    <label className="font-weight-bold">Order Date:</label>
                    <label className="m-1">
                      {new Date(this.state.formData.orderDate).toDateString()}
                    </label>
                  </div>
                  <div className="form-group col">
                    <label className="font-weight-bold">Delivery Date:</label>
                    <label className="m-1">
                      {new Date(
                        this.state.formData.deliveryDate
                      ).toDateString()}
                    </label>
                  </div>
                  <div className="form-group col">
                    <label className="font-weight-bold">Delivery Time:</label>
                    <label className="m-1">
                      {this.state.formData.deliveryTime}
                    </label>
                  </div>
                </div>

                <div className="d-flex row row-cols-2">
                  <div className="form-group col">
                    <label className="font-weight-bold">Country:</label>
                    <label className="m-1">
                      {this.state.formData.countryName}
                    </label>
                  </div>
                  <div className="form-group col">
                    <label className="font-weight-bold">City:</label>
                    <label className="m-1">
                      {this.state.formData.cityName}
                    </label>
                  </div>
                  <div className="form-group col">
                    <label className="font-weight-bold">
                      Receiver Address:
                    </label>
                    <label className="m-1">
                      {this.state.formData.receiverAddress}
                    </label>
                  </div>
                  <div className="form-group col">
                    <label className="font-weight-bold">Postal Code:</label>
                    <label className="m-1">
                      {this.state.formData.postalCode}
                    </label>
                  </div>
                </div>

                <div className="d-flex row row-cols-2">
                  <div className="form-group col">
                    <label className="font-weight-bold">
                      Amount Of Orders:
                    </label>
                    <label className="m-1">
                      $ {this.state.formData.amountOfOrders.toFixed(2)}
                    </label>
                  </div>
                  <div className="form-group col">
                    <label className="font-weight-bold">Shipping Cost:</label>
                    <label className="m-1">
                      $ {this.state.formData.shippingCost.toFixed(2)}
                    </label>
                  </div>
                  <div className="form-group col">
                    <label className="font-weight-bold">Total Amount:</label>
                    <label className="m-1">
                      $ {this.state.formData.totalAmount.toFixed(2)}
                    </label>
                  </div>
                </div>
              </form>
              <hr />
              <div className="d-flex">
                <table className="table table-sm table-striped table-bordered">
                  <thead>
                    <tr>
                      <th
                        colSpan="7"
                        className="bg-info text-white text-center h4 p-2"
                      >
                        Order Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.formData.orderDetails.map((item, index) => (
                      <tr key={item.id}>
                        <td className="col-1">
                          <img
                            className="figure-img img-thumbnail rounded"
                            key={index}
                            alt="art"
                            src={item.productImagePath}
                          />
                        </td>
                        <td className="col-4">
                          <tr>
                            <td className="col-1 font-weight-bold">Status:</td>
                            <td className="col-8">
                              {
                                Object.keys(StatusOrderDetailsEnum)[
                                  Object.values(StatusOrderDetailsEnum).indexOf(
                                    item.status
                                  )
                                ]
                              }
                            </td>
                          </tr>
                          <tr>
                            <td className="col-1 font-weight-bold">
                              ProductTitle:
                            </td>
                            <td className="col-8">{item.productTitle}</td>
                          </tr>
                          <tr>
                            <td className="col-1 font-weight-bold">Number:</td>
                            <td className="col-8">{item.number}</td>
                          </tr>
                          <tr>
                            <td className="col-1 font-weight-bold">Color:</td>
                            <td className="col-8">
                              <label
                                className="label-circle-without-cursor"
                                style={{
                                  backgroundColor: `${item.color.color}`,
                                }}
                              />
                            </td>
                          </tr>
                          {item.size.id != null ? (
                            <tr>
                              <td className="col-1 font-weight-bold">Size:</td>
                              <td className="col-8">{item.size.size}</td>
                            </tr>
                          ) : (
                            ""
                          )}
                          <tr>
                            <td className="col-1 font-weight-bold">Price:</td>
                            <td className="col-8">$ {item.price.toFixed(2)}</td>
                          </tr>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer text-center cardF">
              <button
                class="btn btn-secondary m-1"
                name="back"
                aria-label="Back"
                onClick={this.cancel}
              >
                Back
              </button>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <section className="bodyApp">
          <div className="paddingCart-table">
            <table className="table table-sm table-striped table-bordered">
              <thead>
                <tr>
                  <th colSpan="7" className="table-header text-center h4 p-2">
                    Orders
                  </th>
                </tr>
                <tr className="table-title">
                  <th>Order Number</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Order Date</th>
                  <th>Delivery Date</th>
                  <th>Delivery Time</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.sliceData().map((o) => (
                  <tr key={o.id}>
                    <td>{o.orderNumber}</td>
                    <td>$ {o.totalAmount.toFixed(2)}</td>
                    <td>{o.statusTitle}</td>
                    <td>{new Date(o.orderDate).toDateString()}</td>
                    <td>{new Date(o.deliveryDate).toDateString()}</td>
                    <td>{o.deliveryTime}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-secondary m-1"
                        onClick={() => this.detailData(o)}
                      >
                        Detail
                      </button>
                      <button
                        className="button btn btn-sm btn-danger m-1"
                        style={{ display: o.status !== 1 ? "none" : "inline" }}
                        onClick={() =>
                          this.setState({
                            showDeleteModal: 1,
                            deleteData: {
                              orderId: o.id,
                              orderNumber: o.orderNumber,
                            },
                          })
                        }
                      >
                        Cancellation
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <PaginationControls
              keys={["Order Date", "Delivery Date"]}
              currentPage={this.state.currentPage}
              pageCount={this.getPageCount()}
              pageSizes={this.state.pageSizes}
              sortCallBack={this.sortData}
              pageSizeCallBack={this.setPageSize}
              selectedPageCallBack={this.selectedPage}
            />
          </div>
          <Modal show={this.state.showDeleteModal}>
            <Modal.Header>
              <h5>
                Cancellation Order Number {this.state.deleteData.orderNumber}
              </h5>
              <button
                type="button"
                className="btn btn-danger close"
                onClick={() => this.setState({ showDeleteModal: 0 })}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </Modal.Header>
            <ModalBody>Are You Sure?</ModalBody>
            <Modal.Footer>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  this.setState({ showDeleteModal: 0 }, this.clear)
                }
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.cancellationOrder}
              >
                Yes
              </button>
            </Modal.Footer>
          </Modal>
        </section>
      );
    }
  }
}
