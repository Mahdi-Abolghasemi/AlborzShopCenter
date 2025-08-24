import React, { Component } from "react";
import { RestDataSource } from "../RestDataSource";
import Modal from "react-bootstrap/Modal";
import { ModalBody } from "react-bootstrap";
import { PaginationControls } from "../PaginationControls";

export class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      country: [],
      formData: {
        id: 0,
        name: "",
        countryId: 0,
        deleted: 0,
        useOrder: 1,
        shippingCost: "",
      },
      searchData: { name: "", countryId: 0, useOrder: -1 },
      showSaveModal: 0,
      result: "",
      showDeleteModal: 0,
      deleteData: { id: "", name: "" },
      sort: "Name",
      pageCount: 0,
      pageSizes: [5, 10, 25, 100],
      perPage: 5,
      offset: 0,
      currentPage: 1,
      fieldValidations: { name: true, countryId: true, shippingCost: true },
      cardTitle: "New a city",
    };

    this.countryDataSource = new RestDataSource("Countries");
    this.dataSource = new RestDataSource("Cities");
  }

  componentDidMount = () => {
    this.countryDataSource.GetAll((res) => this.setState({ country: res }));
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
    if (this.state.sort === "Name") {
      this.setState({
        data: this.state.data.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        ),
      });
    }

    if (this.state.sort === "Use Order") {
      this.setState({
        data: this.state.data.sort((a, b) =>
          a.useOrder > b.useOrder ? -1 : b.useOrder > a.useOrder ? 0 : 1
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

  setValueSearch = (event) => {
    switch (event.target.name) {
      case "name":
        this.setState({
          searchData: { ...this.state.searchData, name: event.target.value },
        });
        break;
      case "status":
        this.setState({
          searchData: {
            ...this.state.searchData,
            useOrder: event.target.value,
          },
        });
        break;
      case "country":
        this.setState({
          searchData: {
            ...this.state.searchData,
            countryId: event.target.value,
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

  setValues = (event) => {
    switch (event.target.name) {
      case "name":
        this.setState({
          formData: {
            ...this.state.formData,
            name: event.target.value,
          },
        });
        break;
      case "status":
        this.setState({
          formData: {
            ...this.state.formData,
            useOrder: event.target.value,
          },
        });
        break;
      case "country":
        this.setState({
          formData: {
            ...this.state.formData,
            countryId: event.target.value,
          },
        });
        break;
      case "shippingCost":
        this.setState({
          formData: {
            ...this.state.formData,
            shippingCost: event.target.value,
          },
        });
        break;
    }
  };

  clear = () => {
    this.setState({
      formData: {
        id: 0,
        name: "",
        deleted: 0,
        useOrder: 1,
        countryId: 0,
        shippingCost: 0,
      },
      fieldValidations: { name: true, countryId: true, shippingCost: true },
      cardTitle: "New a city",
    });
  };

  checkValidation = () => {
    let error = 0;
    let _fieldValidations = { name: true, countryId: true, shippingCost: true };

    Object.keys(this.state.fieldValidations).forEach((field) => {
      if (
        this.state.formData[field] === "" ||
        this.state.formData[field] == 0 ||
        this.state.formData[field] == -1
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
        this.setState({ showSaveModal: 0, result: res })
      );
      this.clear();
    } else {
      await this.dataSource.Update(this.state.formData, (res) =>
        this.setState({ showSaveModal: 0, result: res })
      );
      this.clear();
    }
    window.location.reload();
  };

  editData = (item) => {
    this.setState({
      formData: {
        id: item.id,
        name: item.name,
        deleted: item.deleted,
        useOrder: item.useOrder,
        countryId: item.countryId,
        shippingCost: item.shippingCost,
      },
      showSaveModal: 1,
      cardTitle: "Edit city",
    });
  };

  deleteData = async () => {
    await this.dataSource.Delete(this.state.deleteData.id, (res) =>
      this.setState({ result: res })
    );
    window.location.reload();
  };

  render() {
    return (
      <section className="bodyApp">
        <div className="container-fluid p-4">
          <form className="d-flex">
            <div className="form-group m-2">
              <label>Name:</label>
              <input
                className="form-control"
                name="name"
                onChange={this.setValueSearch}
                type="text"
                placeholder="Enter Name"
                aria-label="Name"
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
                <option value="1">Use Order</option>
                <option value="0">Not Use Order</option>
              </select>
            </div>
            <div className="form-group m-2">
              <label>Country:</label>
              <select
                name="country"
                className="form-control"
                onChange={this.setValueSearch}
                aria-label="Country"
              >
                <option value="0"></option>
                {this.state.country.map((i) => (
                  <option value={i.id}>{i.name}</option>
                ))}
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
                  City
                </th>
              </tr>
              <tr className="table-title">
                <th>Status</th>
                <th>Name</th>
                <th>Country</th>
                <th>Shipping Cost</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.sliceData().map((p) => (
                <tr key={p.id}>
                  <td className="col-1">
                    {p.useOrder ? "Use Order" : "Not Use Order"}
                  </td>
                  <td className="col-3">{p.name}</td>
                  <td className="col-3">{p.countryName}</td>
                  <td className="col-2">$ {p.shippingCost.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning m-1"
                      onClick={() => this.editData(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete button btn btn-sm btn-danger m-1"
                      onClick={() =>
                        this.setState({
                          showDeleteModal: 1,
                          deleteData: { id: p.id, name: p.name },
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
            keys={["Name", "Use Order"]}
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
            onClick={() => this.setState({ showSaveModal: 1 })}
          >
            Add
          </button>
        </div>
        <Modal show={this.state.showSaveModal}>
          <Modal.Header>
            <h5>{this.state.cardTitle}</h5>
            <button
              type="button"
              className="btn btn-danger close"
              onClick={() => this.setState({ showSaveModal: 0 }, this.clear)}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </Modal.Header>
          <Modal.Body>
            <div className="position-relative">
              <input
                className="form-control mb-4"
                id="name"
                name="name"
                type="text"
                placeholder="Enter Name"
                onChange={this.setValues}
                value={this.state.formData.name}
                style={
                  this.state.fieldValidations.name
                    ? { borderColor: "#ced4da" }
                    : { borderColor: "#dc3545" }
                }
              />
              <div
                className="invalid-tooltip"
                style={{
                  display: this.state.fieldValidations.name ? "none" : "inline",
                }}
              >
                Please fill out this field.
              </div>
            </div>
            <select
              name="status"
              className="form-control mb-4"
              onChange={this.setValues}
              aria-label="Status"
              value={this.state.formData.useOrder}
            >
              <option value="1">Use Order</option>
              <option value="0">Not Use Order</option>
            </select>
            <div className="position-relative">
              <select
                name="country"
                className="form-control mb-4"
                onChange={this.setValues}
                aria-label="Country"
                value={this.state.formData.countryId}
                style={
                  this.state.fieldValidations.countryId
                    ? { borderColor: "#ced4da" }
                    : { borderColor: "#dc3545" }
                }
              >
                <option value="0"></option>
                {this.state.country.map((i) => (
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
                Please select a country.
              </div>
            </div>
            <div className="input-group position-relative">
              <span className="input-group-text">$</span>
              <input
                className="form-control"
                name="shippingCost"
                type="number"
                placeholder="Enter Shipping Cost"
                onChange={this.setValues}
                value={this.state.formData.shippingCost}
                style={
                  this.state.fieldValidations.shippingCost
                    ? { borderColor: "#ced4da" }
                    : { borderColor: "#dc3545" }
                }
              />
              <span className="input-group-text">0.00</span>
              <div
                className="invalid-tooltip"
                style={{
                  display: this.state.fieldValidations.shippingCost
                    ? "none"
                    : "inline",
                }}
              >
                Please fill out this field.
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => this.setState({ showSaveModal: 0 }, this.clear)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.checkValidation}
            >
              Save
            </button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.showDeleteModal}>
          <Modal.Header>
            <h5>Delete {this.state.deleteData.name} City</h5>
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
              onClick={() => this.setState({ showDeleteModal: 0 }, this.clear)}
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
