import React, { Component } from "react";
import { RestDataSource } from "../RestDataSource";
import Modal from "react-bootstrap/Modal";
import { ModalBody } from "react-bootstrap";
import { PaginationControls } from "../PaginationControls";

export class TimeSending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      formData: {
        id: 0,
        of: "",
        to: "",
        deleted: 0,
        active: 1,
        maximumNumberOfOrders: "",
        orderPreparationTime: "",
      },
      searchData: { of: "", to: "", active: -1 },
      showInputPage: 0,
      result: "",
      showDeleteModal: 0,
      deleteData: { id: 0, of: "", to: "" },
      sort: "Default",
      pageCount: 0,
      pageSizes: [5, 10, 25, 100],
      perPage: 5,
      offset: 0,
      currentPage: 1,
      fieldValidations: {
        of: true,
        to: true,
        maximumNumberOfOrders: true,
        orderPreparationTime: true,
      },
      cardTitle: "New a time sending",
    };

    this.dataSource = new RestDataSource("TimeSending");
  }

  componentDidMount = () => {
    this.dataSource.GetAll((res) => this.setState({ data: res }));
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
    if (this.state.sort === "Default") {
      this.setState({
        data: this.state.data.sort((a, b) =>
          a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        ),
      });
    }

    if (this.state.sort === "Status") {
      this.setState({
        data: this.state.data.sort((a, b) =>
          a.active > b.active ? -1 : b.active > a.active ? 0 : 1
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
        of: "",
        to: "",
        deleted: 0,
        active: 1,
        maximumNumberOfOrders: "",
        orderPreparationTime: "",
      },
      deleteData: { id: 0, of: "", to: "" },
      searchData: { of: "", to: "", active: -1 },
      fieldValidations: {
        of: true,
        to: true,
        maximumNumberOfOrders: true,
        orderPreparationTime: true,
      },
      cardTitle: "New a time sending",
    });
  };

  editData = (item) => {
    this.setState({
      formData: {
        id: item.id,
        of: item.of,
        to: item.to,
        deleted: item.deleted,
        active: item.active,
        maximumNumberOfOrders: item.maximumNumberOfOrders,
        orderPreparationTime: item.orderPreparationTime,
      },
      showInputPage: 1,
      cardTitle: "Edit time sending",
    });
  };

  deleteData = async () => {
    await this.dataSource.Delete(this.state.deleteData.id, (res) =>
      this.setState({ result: res })
    );
    window.location.reload();
  };

  checkValidation = () => {
    let error = 0;
    let _fieldValidations = {
      of: true,
      to: true,
      maximumNumberOfOrders: true,
      orderPreparationTime: true,
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
    if (error === 0) this.save();
  };

  save = async () => {
    if (this.state.formData.id === 0) {
      await this.dataSource.Insert(this.state.formData, (res) =>
        this.setState({ showInputPage: 0, result: res })
      );
      this.clear();
    } else {
      await this.dataSource.Update(this.state.formData, (res) =>
        this.setState({ showInputPage: 0, result: res })
      );
      this.clear();
    }
    window.location.reload();
  };

  setValues = (event) => {
    switch (event.target.name) {
      case "of":
        this.setState({
          formData: {
            ...this.state.formData,
            of: event.target.value,
          },
        });
        break;
      case "to":
        this.setState({
          formData: {
            ...this.state.formData,
            to: event.target.value,
          },
        });
        break;
      case "status":
        this.setState({
          formData: {
            ...this.state.formData,
            active: event.target.value,
          },
        });
        break;
      case "maximumNumberOfOrders":
        this.setState({
          formData: {
            ...this.state.formData,
            maximumNumberOfOrders: event.target.value,
          },
        });
        break;
      case "orderPreparationTime":
        this.setState({
          formData: {
            ...this.state.formData,
            orderPreparationTime: event.target.value,
          },
        });
        break;
    }
  };

  setValueSearch = (event) => {
    switch (event.target.name) {
      case "of":
        this.setState({
          searchData: { ...this.state.searchData, of: event.target.value },
        });
        break;
      case "to":
        this.setState({
          searchData: { ...this.state.searchData, to: event.target.value },
        });
        break;
      case "status":
        this.setState({
          searchData: { ...this.state.searchData, active: event.target.value },
        });
        break;
    }
  };

  search = async () => {
    await this.dataSource.Search(this.state.searchData, (res) =>
      this.setState({ data: res, offset: 0, currentPage: 1 })
    );
  };

  cancel = () => {
    this.clear();
    this.setState({ showInputPage: 0 });
  };

  render() {
    if (this.state.showInputPage) {
      return (
        <section className="page-input d-flex justify-content-center">
          <div className="card card-input">
            <div className="card-header cardH">
              <h1 className="card-title">{this.state.cardTitle}</h1>
            </div>
            <div className="card-body">
              <form>
                <div className="d-flex row row-cols-2">
                  <div className="position-relative form-group col">
                    <label>Of:</label>
                    <input
                      className="form-control"
                      name="of"
                      type="time"
                      placeholder="Enter Of Time"
                      onChange={this.setValues}
                      value={this.state.formData.of}
                      style={
                        this.state.fieldValidations.of
                          ? { borderColor: "#ced4da" }
                          : { borderColor: "#dc3545" }
                      }
                    />
                    <div
                      className="invalid-tooltip"
                      style={{
                        display: this.state.fieldValidations.of
                          ? "none"
                          : "inline",
                      }}
                    >
                      Please fill out this field.
                    </div>
                  </div>
                  <div className="position-relative form-group col">
                    <label>To:</label>
                    <input
                      className="form-control"
                      name="to"
                      type="time"
                      placeholder="Enter To Time"
                      onChange={this.setValues}
                      value={this.state.formData.to}
                      style={
                        this.state.fieldValidations.to
                          ? { borderColor: "#ced4da" }
                          : { borderColor: "#dc3545" }
                      }
                    />
                    <div
                      className="invalid-tooltip"
                      style={{
                        display: this.state.fieldValidations.to
                          ? "none"
                          : "inline",
                      }}
                    >
                      Please fill out this field.
                    </div>
                  </div>
                </div>
                <div className="d-flex row row-cols-2">
                  <div className="position-relative form-group col">
                    <label>Status:</label>
                    <select
                      name="status"
                      className="form-control"
                      onChange={this.setValues}
                      aria-label="Status"
                      value={this.state.formData.active}
                    >
                      <option value="1">Active</option>
                      <option value="0">In Active</option>
                    </select>
                  </div>
                </div>
                <div className="d-flex row row-cols-2">
                  <div className="position-relative form-group col">
                    <label>Maximum Number Of Orders:</label>
                    <input
                      className="form-control"
                      name="maximumNumberOfOrders"
                      type="number"
                      placeholder="Enter Maximum Number Of Orders"
                      onChange={this.setValues}
                      value={this.state.formData.maximumNumberOfOrders}
                      style={
                        this.state.fieldValidations.maximumNumberOfOrders
                          ? { borderColor: "#ced4da" }
                          : { borderColor: "#dc3545" }
                      }
                    />
                    <div
                      className="invalid-tooltip"
                      style={{
                        display: this.state.fieldValidations
                          .maximumNumberOfOrders
                          ? "none"
                          : "inline",
                      }}
                    >
                      Please fill out this field.
                    </div>
                  </div>
                  <div className="position-relative form-group col">
                    <label>Order Preparation Time:</label>
                    <input
                      className="form-control"
                      name="orderPreparationTime"
                      type="number"
                      placeholder="Enter Order Preparation Time"
                      onChange={this.setValues}
                      value={this.state.formData.orderPreparationTime}
                      style={
                        this.state.fieldValidations.orderPreparationTime
                          ? { borderColor: "#ced4da" }
                          : { borderColor: "#dc3545" }
                      }
                    />
                    <div
                      className="invalid-tooltip"
                      style={{
                        display: this.state.fieldValidations
                          .orderPreparationTime
                          ? "none"
                          : "inline",
                      }}
                    >
                      Please fill out this field.
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="form-group text-center cardF">
              <button
                className="btn btn-primary mr-1"
                name="save"
                id="btnSave"
                aria-label="Save"
                onClick={this.checkValidation}
              >
                Save
              </button>
              <button
                className="btn btn-secondary"
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
    } else {
      return (
        <section className="bodyApp">
          <div className="container-fluid p-4">
            <form className="d-flex">
              <div className="form-group m-2">
                <label>Of Time:</label>
                <input
                  className="form-control"
                  name="of"
                  onChange={this.setValueSearch}
                  type="time"
                  placeholder="Enter Of Time"
                  aria-label="Of Time"
                />
              </div>
              <div className="form-group m-2">
                <label>To Time:</label>
                <input
                  className="form-control"
                  name="to"
                  onChange={this.setValueSearch}
                  type="time"
                  placeholder="Enter To Time"
                  aria-label="To Time"
                />
              </div>
              <div className="form-group m-2">
                <label>Status:</label>
                <select
                  name="status"
                  className="form-control"
                  onChange={this.setValueSearch}
                  aria-label="Status"
                >
                  <option value="-1">All</option>
                  <option value="1">Active</option>
                  <option value="0">In Active</option>
                </select>
              </div>
            </form>
            <div className="form-group m-2">
              <button
                className="btn btn-outline-primary"
                aria-label="Search"
                onClick={this.search}
              >
                Search
              </button>
            </div>
            <hr />
          </div>
          <div className="padding-table">
            <table className="table table-sm table-striped table-bordered">
              <thead>
                <tr>
                  <th colSpan="5" className="table-header text-center h4 p-2">
                    Time Sending
                  </th>
                </tr>
                <tr className="table-title">
                  <th>Status</th>
                  <th>Title</th>
                  <th>Maximum Number Of Orders</th>
                  <th>Order Preparation Time</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.sliceData().map((t) => (
                  <tr key={t.id}>
                    <td className="col-1">
                      {t.active ? "Active" : "In Active"}
                    </td>
                    <td className="col-3">{`${t.of} - ${t.to}`}</td>
                    <td className="col-3">{t.maximumNumberOfOrders}</td>
                    <td className="col-3">{t.orderPreparationTime}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning m-1"
                        onClick={() => this.editData(t)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete button btn btn-sm btn-danger m-1"
                        onClick={() =>
                          this.setState({
                            showDeleteModal: 1,
                            deleteData: { id: t.id, of: t.of, to: t.to },
                          })
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <PaginationControls
              keys={["Default", "Status"]}
              currentPage={this.state.currentPage}
              pageCount={this.getPageCount()}
              pageSizes={this.state.pageSizes}
              sortCallBack={this.sortData}
              pageSizeCallBack={this.setPageSize}
              selectedPageCallBack={this.selectedPage}
            />
          </div>
          <div className="container-fluid add-div">
            <button
              className="btn btn-primary"
              aria-label="Add"
              onClick={() => this.setState({ showInputPage: 1 })}
            >
              Add
            </button>
          </div>
          <Modal show={this.state.showDeleteModal}>
            <Modal.Header>
              <h5>
                Delete {this.state.deleteData.of} - {this.state.deleteData.to}{" "}
                Time Sending
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
                onClick={this.deleteData}
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
