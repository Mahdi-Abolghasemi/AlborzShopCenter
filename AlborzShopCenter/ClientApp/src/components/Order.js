import React, { Component } from "react";
import { RestDataSource } from "./RestDataSource";
import { PaginationControls } from "./PaginationControls";
import Modal from "react-bootstrap/Modal";
import { ModalBody } from "react-bootstrap";
import { Link } from "react-router-dom";

//import { OrderData, TimeSending } from "./Data";

export class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      timeSendings: [],
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
        paymentDetails: {
          transactionId: "",
          intent: "",
          status: "",
          name: "",
          email: "",
          countryCode: "",
          createTime: "",
        },
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
      searchData: {
        orderNumber: "",
        status: -1,
        orderDate: "",
        deliveryDate: "",
        timeSendingId: -1,
      },
      showMainPage: 1,
      showEditPage: 0,
      result: "",
      showDeleteModal: 0,
      showPaymentDetailsModal: 0,
      deleteData: { orderId: 0, orderNumber: "" },
      sort: "Order Date",
      pageCount: 0,
      pageSizes: [5, 10, 25, 100],
      perPage: 5,
      offset: 0,
      currentPage: 1,
      cardTitle: "Details order",
    };

    this.fields = [
      {
        Name: "Client Name",
        DataField: "clientName",
      },
      {
        Name: "Order Date",
        DataField: "orderDate",
      },
      {
        Name: "Total Amount",
        DataField: "totalAmount",
      },
      {
        Name: "Delivery Date",
        DataField: "deliveryDate",
      },
      {
        Name: "Delivery Time",
        DataField: "deliveryTime",
      },
    ];

    this.dataSource = new RestDataSource("Order");
    this.timeSendingDataSource = new RestDataSource("TimeSending");
  }

  componentDidMount = () => {
    this.dataSource.GetAll((res) => this.setState({ data: res }));
    this.timeSendingDataSource.GetAll((res) =>
      this.setState({ timeSendings: res })
    );

    //this.setState({ data: OrderData, timeSendings: TimeSending });
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
        paymentDetails: {
          transactionId: "",
          intent: "",
          status: "",
          name: "",
          email: "",
          countryCode: "",
          createTime: "",
        },
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
      searchData: {
        orderNumber: "",
        status: -1,
        orderDate: "",
        deliveryDate: "",
        timeSendingId: -1,
      },
      deleteData: { orderId: 0, orderNumber: "" },
      cardTitle: "Details order",
    });
  };

  deleteData = async () => {
    await this.dataSource.Delete(this.state.deleteData.orderId, (res) =>
      this.setState({ showDeleteModal: 0, result: res })
    );
    window.location.reload();
  };

  editData = (order) => {
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
        timeSendingId: order.timeSendingId,
        deliveryTime: order.deliveryTime,
        orderDetails: order.orderDetails,
        orderNumber: order.orderNumber,
        paymentDetails: order.paymentDetails,
      },
      showEditPage: 1,
      showMainPage: 0,
    });
  };

  detailData = async (order) => {
    await this.editData(order);

    document.getElementById("orderStatus").disabled = true;
    document.getElementById("orderDetailsStatus").disabled = true;

    document.getElementById("btnSave").style.display = "none";
    document.getElementById("btnCancel").innerHTML = "Back";
  };

  setValueOrder = (event) => {
    this.setState({
      formData: {
        ...this.state.formData,
        status: event.target.value,
      },
    });
  };

  setValueOrderDetails = (value, item) => {
    item.status = value;

    this.setState({
      formData: {
        ...this.state.formData,
        orderDetails: this.state.formData.orderDetails.map((oldItem) =>
          oldItem.id === item.id ? item : oldItem
        ),
      },
    });
  };

  cancel = () => {
    this.clear();
    this.setState({ showMainPage: 1, showEditPage: 0 });
  };

  save = async () => {
    if (this.state.formData.id === 0) {
      await this.dataSource.Insert(this.state.formData, (res) =>
        this.setState({ showMainPage: 1, showEditPage: 0, result: res })
      );
      this.clear();
    } else {
      await this.dataSource.Update(this.state.formData, (res) =>
        this.setState({ showMainPage: 1, showEditPage: 0, result: res })
      );
      this.clear();
    }
    window.location.reload();
  };

  setValueSearch = (event) => {
    switch (event.target.name) {
      case "orderNumber":
        this.setState({
          searchData: {
            ...this.state.searchData,
            orderNumber: event.target.value,
          },
        });
        break;
      case "status":
        this.setState({
          searchData: {
            ...this.state.searchData,
            status: event.target.value,
          },
        });
        break;
      case "orderDate":
        this.setState({
          searchData: {
            ...this.state.searchData,
            orderDate: event.target.value,
          },
        });
        break;
      case "deliveryDate":
        this.setState({
          searchData: {
            ...this.state.searchData,
            deliveryDate: event.target.value,
          },
        });
        break;
      case "deliveryTime":
        this.setState({
          searchData: {
            ...this.state.searchData,
            timeSendingId: event.target.value,
          },
        });
        break;
    }
  };

  search = async () => {
    await this.dataSource.Search(this.state.searchData, (res) =>
      this.setState({ data: res, offset: 0, currentPage: 1 })
    );
  };

  paymentData = (data) => {
    this.setState({
      formData: { paymentDetails: data },
      showPaymentDetailsModal: 1,
    });
  };

  render() {
    if (this.state.showMainPage) {
      return (
        <section className="bodyApp">
          <div className="container-fluid p-4">
            <form className="row justify-content-start row-cols-xs-2 row-cols-sm-4 row-cols-md-4 row-cols-lg-6 row-cols-xl-6 d-flex">
              <div className="form-group col-auto m-2">
                <label>Order Number:</label>
                <input
                  className="form-control"
                  name="orderNumber"
                  onChange={this.setValueSearch}
                  type="number"
                  placeholder="Enter Order Number"
                  aria-label="User Order Number"
                />
              </div>
              <div className="form-group col-auto m-2">
                <label>Status:</label>
                <select
                  name="status"
                  className="form-control"
                  onChange={this.setValueSearch}
                  aria-label="Status"
                >
                  <option value="-1">All</option>
                  <option value="1">Active</option>
                  <option value="2">Delivered</option>
                  <option value="3">Returned</option>
                  <option value="4">Inactive</option>
                  <option value="5">Cancellation</option>
                </select>
              </div>
              <div className="form-group col-auto m-2">
                <label>Order Date:</label>
                <input
                  className="form-control"
                  name="orderDate"
                  type="date"
                  onChange={this.setValueSearch}
                  placeholder="Enter Order Date"
                  aria-label="Order Date"
                />
              </div>
              <div className="form-group col-auto m-2">
                <label>Delivery Date:</label>
                <input
                  className="form-control"
                  name="deliveryDate"
                  type="date"
                  onChange={this.setValueSearch}
                  placeholder="Enter Delivery Date"
                  aria-label="Order Delivery Date"
                />
              </div>
              <div className="form-group col-auto m-2">
                <label>Delivery Time:</label>
                <select
                  name="deliveryTime"
                  className="form-control"
                  onChange={this.setValueSearch}
                  aria-label="Delivery Time"
                >
                  <option value="-1">All</option>
                  {this.state.timeSendings.map((t) => (
                    <option value={t.id}>{`${t.of} - ${t.to}`}</option>
                  ))}
                </select>
              </div>
            </form>
            <div className="form-group m-2">
              <button
                className="btn btn-outline-primary mr-2"
                aria-label="Search"
                onClick={this.search}
              >
                Search
              </button>
              <Link
                to={{
                  pathname: "/report",
                  data: this.state.data,
                  reportName: "Order",
                  fields: this.fields,
                }}
                type="button"
                className="btn btn-outline-primary"
              >
                Report
              </Link>
            </div>
            <hr />
          </div>
          <div className="padding-table">
            <table className="table table-sm table-striped table-bordered">
              <thead>
                <tr>
                  <th colSpan="8" className="table-header text-center h4 p-2">
                    Orders
                  </th>
                </tr>
                <tr className="table-title">
                  <th>Order Number</th>
                  <th>Client Name</th>
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
                    <td>{o.clientName}</td>
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
                        className="btn btn-sm btn-warning m-1"
                        onClick={() =>
                          this.setState(
                            { cardTitle: "Edit order" },
                            this.editData(o)
                          )
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="delete button btn btn-sm btn-danger m-1"
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
                        Delete
                      </button>
                      <button
                        className="btn btn-sm btn-info m-1"
                        onClick={() => this.paymentData(o.paymentDetails)}
                      >
                        Payment Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="add-div">
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
          <div>
            <Modal show={this.state.showDeleteModal}>
              <Modal.Header>
                <h5>Delete Order Number {this.state.deleteData.orderNumber}</h5>
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
                  onClick={this.deleteData}
                >
                  Yes
                </button>
              </Modal.Footer>
            </Modal>
          </div>
          <div>
            <Modal show={this.state.showPaymentDetailsModal}>
              <Modal.Header>
                <h5>Payment details</h5>
                <button
                  type="button"
                  className="btn btn-danger close"
                  onClick={() => this.setState({ showPaymentDetailsModal: 0 })}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </Modal.Header>
              <ModalBody>
                <div>
                  <table>
                    <tr>
                      <td className="font-weight-bold">Transaction Id:</td>
                      <td>
                        {this.state.formData.paymentDetails.transactionId}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-weight-bold">Intent:</td>
                      <td>{this.state.formData.paymentDetails.intent}</td>
                    </tr>
                    <tr>
                      <td className="font-weight-bold">Status:</td>
                      <td>{this.state.formData.paymentDetails.status}</td>
                    </tr>
                    <tr>
                      <td className="font-weight-bold">Name:</td>
                      <td>{this.state.formData.paymentDetails.name}</td>
                    </tr>
                    <tr>
                      <td className="font-weight-bold">Email:</td>
                      <td>{this.state.formData.paymentDetails.email}</td>
                    </tr>
                    <tr>
                      <td className="font-weight-bold">Country Code:</td>
                      <td>{this.state.formData.paymentDetails.countryCode}</td>
                    </tr>
                    <tr>
                      <td className="font-weight-bold">Create Time:</td>
                      <td>
                        {this.state.formData.paymentDetails.createTime !== ""
                          ? new Date(
                              this.state.formData.paymentDetails.createTime
                            ).toLocaleString()
                          : ""}
                      </td>
                    </tr>
                  </table>
                </div>
              </ModalBody>
              <Modal.Footer>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    this.setState({ showPaymentDetailsModal: 0 }, this.clear)
                  }
                >
                  Close
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </section>
      );
    } else if (this.state.showEditPage) {
      return (
        <section className="page-input d-flex justify-content-center">
          <div className="card card-input">
            <div className="card-header cardH">
              <h1 className="card-title">{this.state.cardTitle}</h1>
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
                    <select
                      name="orderStatus"
                      id="orderStatus"
                      className="form-control"
                      value={this.state.formData.status}
                      onChange={this.setValueOrder}
                      aria-label="Order Status"
                    >
                      <option value="1">Active</option>
                      <option value="2">Delivered</option>
                      <option value="3">Returned</option>
                      <option value="4">Inactive</option>
                      <option value="5">Cancellation</option>
                    </select>
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
                        className="table-header text-center h4 p-2"
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
                            <td>
                              <select
                                name="orderDetailsStatus"
                                id="orderDetailsStatus"
                                className="form-control"
                                value={item.status}
                                onChange={(e) =>
                                  this.setValueOrderDetails(
                                    e.target.value,
                                    item
                                  )
                                }
                                aria-label="Order Details Status"
                              >
                                <option value="1">Preparing</option>
                                <option value="2">Sending</option>
                                <option value="3">Delivered</option>
                                <option value="4">Inactive</option>
                              </select>
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
                class="btn btn-primary mr-1"
                name="save"
                id="btnSave"
                aria-label="Save"
                onClick={this.save}
              >
                Save
              </button>
              <button
                class="btn btn-secondary"
                name="cancel"
                id="btnCancel"
                aria-label="Cancel"
                onClick={this.cancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </section>
      );
    }
  }
}
