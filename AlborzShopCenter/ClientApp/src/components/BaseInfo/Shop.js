import React, { Component } from "react";
import { RestDataSource } from "../RestDataSource";
import Modal from "react-bootstrap/Modal";
import { ModalBody } from "react-bootstrap";
import { PaginationControls } from "../PaginationControls";
//import validator from "validator";

export class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      allCity: [],
      cities: [],
      country: [],
      formData: {
        id: 0,
        name: "",
        managerName: "",
        cellPhone: "",
        phone: "",
        cityId: 0,
        cityName: "",
        countryId: 0,
        countryName: "",
        address: "",
        deleted: 0,
        active: 1,
        startDate: new Date(),
        endDate: new Date().getDate,
        rank: 0.0,
        rankGreat: 0.0,
        rankGood: 0.0,
        rankBad: 0.0,
      },
      searchData: {
        name: "",
        countryId: -1,
        cityId: -1,
        active: -1,
      },
      showMainPage: 1,
      showSavePage: 0,
      result: "",
      showDeleteModal: 0,
      deleteData: { id: "", name: "" },
      sort: "Name",
      pageCount: 0,
      pageSizes: [5, 10, 25, 100],
      perPage: 5,
      offset: 0,
      currentPage: 1,
      fieldValidations: {
        name: true,
        managerName: true,
        cellPhone: true,
        phone: true,
        cityId: true,
        countryId: true,
      },
      cardTitle: "New a shop",
    };

    this.cityDataSource = new RestDataSource("Cities");
    this.countryDataSource = new RestDataSource("Countries");
    this.dataSource = new RestDataSource("Shops");
  }

  componentDidMount = () => {
    this.cityDataSource.GetAll((res) => this.setState({ allCity: res }));
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

  setValueSearch = (event) => {
    switch (event.target.name) {
      case "name":
        this.setState({
          searchData: { ...this.state.searchData, name: event.target.value },
        });
        break;
      case "status":
        this.setState({
          searchData: { ...this.state.searchData, active: event.target.value },
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
      case "city":
        this.setState({
          searchData: { ...this.state.searchData, cityId: event.target.value },
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
      case "managerName":
        this.setState({
          formData: {
            ...this.state.formData,
            managerName: event.target.value,
          },
        });
        break;
      case "cellPhone":
        this.setState({
          formData: {
            ...this.state.formData,
            cellPhone: event.target.value,
          },
        });
        break;
      case "phone":
        this.setState({
          formData: {
            ...this.state.formData,
            phone: event.target.value,
          },
        });
        break;
      case "cityId":
        this.setState({
          formData: {
            ...this.state.formData,
            cityId: event.target.value,
          },
        });
        break;
      case "address":
        this.setState({
          formData: {
            ...this.state.formData,
            address: event.target.value,
          },
        });
        break;
      case "active":
        this.setState({
          formData: {
            ...this.state.formData,
            active: event.target.value,
          },
        });
        break;
      case "startDate":
        this.setState({
          formData: {
            ...this.state.formData,
            startDate: event.target.value,
          },
        });
        break;
      case "endDate":
        this.setState({
          formData: {
            ...this.state.formData,
            endDate: event.target.value,
          },
        });
        break;
      case "rank":
        this.setState({
          formData: {
            ...this.state.formData,
            rank: event.target.value,
          },
        });
        break;
      case "rankGreat":
        this.setState({
          formData: {
            ...this.state.formData,
            rankGreat: event.target.value,
          },
        });
        break;
      case "rankGood":
        this.setState({
          formData: {
            ...this.state.formData,
            rankGood: event.target.value,
          },
        });
        break;
      case "rankBad":
        this.setState({
          formData: {
            ...this.state.formData,
            rankBad: event.target.value,
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
        managerName: "",
        cellPhone: "",
        phone: "",
        cityId: 0,
        cityName: "",
        countryId: 0,
        countryName: "",
        address: "",
        deleted: 0,
        active: 1,
        startDate: new Date(),
        endDate: new Date().getDate,
        rank: 0.0,
        rankGreat: 0.0,
        rankGood: 0.0,
        rankBad: 0.0,
      },
      cities: [],
      fieldValidations: {
        name: true,
        managerName: true,
        cellPhone: true,
        phone: true,
        cityId: true,
        countryId: true,
      },
      cardTitle: "New a shop",
    });
  };

  save = async () => {
    if (this.state.formData.id === 0) {
      await this.dataSource.Insert(this.state.formData, (res) =>
        this.setState({ showMainPage: 1, showSavePage: 0, result: res })
      );
      this.clear();
    } else {
      await this.dataSource.Update(this.state.formData, (res) =>
        this.setState({ showMainPage: 1, showSavePage: 0, result: res })
      );
      this.clear();
    }
    window.location.reload();
  };

  editData = (item) => {
    this.setState({
      cities: this.state.allCity.filter((c) => c.countryId === item.countryId),
      formData: {
        id: item.id,
        name: item.name,
        managerName: item.managerName,
        cellPhone: item.cellPhone,
        phone: item.phone,
        cityId: item.cityId,
        cityName: item.cityName,
        countryId: item.countryId,
        countryName: item.countryName,
        address: item.address,
        deleted: item.deleted,
        active: item.active,
        startDate: item.startDate,
        endDate: item.endDate,
        rank: item.rank,
        rankGreat: item.rankGreat,
        rankGood: item.rankGood,
        rankBad: item.rankBad,
      },
      showMainPage: 0,
      showSavePage: 1,
    });
  };

  deleteData = async () => {
    await this.dataSource.Delete(this.state.deleteData.id, (res) =>
      this.setState({ showDeleteModal: 0, result: res })
    );
    window.location.reload();
  };

  checkValidation = () => {
    let error = 0;
    let _fieldValidations = {
      name: true,
      managerName: true,
      cellPhone: true,
      phone: true,
      cityId: true,
      countryId: true,
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

    // if (
    //   this.rules[field].email &&
    //   !validator.isEmail(this.state[field])
    // )
    //   error++;
    //});

    this.setState({ fieldValidations: _fieldValidations });
    if (error === 0) this.save();
  };

  cancel = () => {
    this.clear();
    this.setState({ showMainPage: 1, showSavePage: 0 });
  };

  changeCountry = (event) => {
    this.setState({
      cities: this.state.allCity.filter(
        (c) => c.countryId == event.target.value
      ),
      formData: {
        ...this.state.formData,
        countryId: event.target.value,
        cityId: 0,
      },
    });
  };

  detailData = async (item) => {
    await this.editData(item);
    this.setState({ cardTitle: "Detail shop" });

    let form = document.getElementById("inputForm");
    let elements = form.elements;
    for (let i = 0, len = elements.length; i < len; ++i) {
      elements[i].disabled = true;
    }

    let btnSave = document.getElementById("btnSave");
    btnSave.style.display = "none";

    let btnCancel = document.getElementById("btnCancel");
    btnCancel.innerHTML = "Back";
  };

  render() {
    if (this.state.showMainPage) {
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
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
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
                  <option value="-1"></option>
                  {this.state.country.map((i) => (
                    <option value={i.id}>{i.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group m-2">
                <label>City:</label>
                <select
                  name="city"
                  className="form-control"
                  onChange={this.setValueSearch}
                  aria-label="City"
                >
                  <option value="-1"></option>
                  {this.state.allCity.map((i) => (
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
                  <th colSpan="7" className="table-header text-center h4 p-2">
                    Shops
                  </th>
                </tr>
                <tr className="table-title">
                  <th>Status</th>
                  <th>Name</th>
                  <th>Manager Name</th>
                  <th>Cell Phone</th>
                  <th>City</th>
                  <th>Country</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.sliceData().map((p) => (
                  <tr key={p.id}>
                    <td className="col-1">
                      {p.active ? "Active" : "Inactive"}
                    </td>
                    <td>{p.name}</td>
                    <td>{p.managerName}</td>
                    <td>{p.cellPhone}</td>
                    <td>{p.cityName}</td>
                    <td>{p.countryName}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-secondary m-1"
                        onClick={() => this.detailData(p)}
                      >
                        Detail
                      </button>
                      <button
                        className="btn btn-sm btn-warning m-1"
                        onClick={() =>
                          this.setState(
                            { cardTitle: "Edit shop" },
                            this.editData(p)
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
              keys={["Name", "Status"]}
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
              onClick={() =>
                this.setState({ showSavePage: 1, showMainPage: 0 }, () =>
                  this.clear()
                )
              }
            >
              Add
            </button>
          </div>
          <Modal show={this.state.showDeleteModal}>
            <Modal.Header>
              <h5>Delete {this.state.deleteData.name} Shop</h5>
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
    } else if (this.state.showSavePage) {
      return (
        <section className="page-input d-flex justify-content-center">
          <div className="card card-input">
            <div className="card-header cardH">
              <h1 className="card-title">{this.state.cardTitle}</h1>
            </div>
            <div className="card-body">
              <form className="d-flex row row-cols-2" id="inputForm">
                <div className="position-relative form-group col">
                  <label>Name:</label>
                  <input
                    className="form-control"
                    name="name"
                    type="text"
                    value={this.state.formData.name}
                    onChange={this.setValues}
                    placeholder="Enter Name"
                    aria-label="Name"
                    style={
                      this.state.fieldValidations.name
                        ? { borderColor: "#ced4da" }
                        : { borderColor: "#dc3545" }
                    }
                  />
                  <div
                    className="invalid-tooltip"
                    style={{
                      display: this.state.fieldValidations.name
                        ? "none"
                        : "inline",
                    }}
                  >
                    Please fill out this field.
                  </div>
                </div>
                <div className="position-relative form-group col">
                  <label>Manager Name:</label>
                  <input
                    className="form-control"
                    name="managerName"
                    type="text"
                    value={this.state.formData.managerName}
                    onChange={this.setValues}
                    placeholder="Enter Manager Name"
                    aria-label="Manager Name"
                    style={
                      this.state.fieldValidations.managerName
                        ? { borderColor: "#ced4da" }
                        : { borderColor: "#dc3545" }
                    }
                  />
                  <div
                    className="invalid-tooltip"
                    style={{
                      display: this.state.fieldValidations.managerName
                        ? "none"
                        : "inline",
                    }}
                  >
                    Please fill out this field.
                  </div>
                </div>
                <div className="position-relative form-group col">
                  <label>Cell Phone:</label>
                  <input
                    className="form-control"
                    name="cellPhone"
                    type="number"
                    value={this.state.formData.cellPhone}
                    onChange={this.setValues}
                    placeholder="Enter Cell Phone"
                    aria-label="Cell Phone"
                    style={
                      this.state.fieldValidations.cellPhone
                        ? { borderColor: "#ced4da" }
                        : { borderColor: "#dc3545" }
                    }
                  />
                  <div
                    className="invalid-tooltip"
                    style={{
                      display: this.state.fieldValidations.cellPhone
                        ? "none"
                        : "inline",
                    }}
                  >
                    Please fill out this field.
                  </div>
                </div>
                <div className="position-relative form-group col">
                  <label>Phone:</label>
                  <input
                    className="form-control"
                    name="phone"
                    type="number"
                    value={this.state.formData.phone}
                    onChange={this.setValues}
                    placeholder="Enter Phone"
                    aria-label="Phone"
                    style={
                      this.state.fieldValidations.phone
                        ? { borderColor: "#ced4da" }
                        : { borderColor: "#dc3545" }
                    }
                  />
                  <div
                    className="invalid-tooltip"
                    style={{
                      display: this.state.fieldValidations.phone
                        ? "none"
                        : "inline",
                    }}
                  >
                    Please fill out this field.
                  </div>
                </div>
                <div className="position-relative form-group col">
                  <label>Country:</label>
                  <select
                    className="form-control"
                    name="countryId"
                    value={this.state.formData.countryId}
                    onChange={this.changeCountry}
                    aria-label="Country Name"
                    style={
                      this.state.fieldValidations.countryId
                        ? { borderColor: "#ced4da" }
                        : { borderColor: "#dc3545" }
                    }
                  >
                    <option value=""></option>
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
                    Please select a valid country.
                  </div>
                </div>
                <div className="position-relative form-group col">
                  <label>City:</label>
                  <select
                    className="form-control"
                    name="cityId"
                    value={this.state.formData.cityId}
                    onChange={this.setValues}
                    aria-label="City Name"
                    style={
                      this.state.fieldValidations.cityId
                        ? { borderColor: "#ced4da" }
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
                <div className="form-group col">
                  <label>Address:</label>
                  <input
                    className="form-control"
                    name="address"
                    type="text"
                    value={this.state.formData.address}
                    onChange={this.setValues}
                    placeholder="Enter Address"
                    aria-label="Address"
                  />
                </div>
                <div className="form-group col">
                  <label>Active:</label>
                  <select
                    className="form-control"
                    name="active"
                    type="number"
                    value={this.state.formData.active}
                    onChange={this.setValues}
                    placeholder="Enter Active"
                    aria-label="Active"
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
                <div className="form-group col">
                  <label>Start Date:</label>
                  <input
                    className="form-control"
                    name="startDate"
                    type="datetime-local"
                    value={this.state.formData.startDate}
                    onChange={this.setValues}
                    placeholder="Enter Start Date"
                    aria-label="Start Date"
                  />
                </div>
                <div className="form-group col">
                  <label>End Date:</label>
                  <input
                    className="form-control"
                    name="endDate"
                    type="datetime-local"
                    value={this.state.formData.endDate}
                    onChange={this.setValues}
                    placeholder="Enter End Date"
                    aria-label="End Date"
                  />
                </div>
                <div className="form-group col">
                  <label>Rank:</label>
                  <input
                    className="form-control"
                    name="rank"
                    type="number"
                    value={this.state.formData.rank}
                    onChange={this.setValues}
                    placeholder="Enter Rank"
                    aria-label="Rank"
                  />
                </div>
                <div className="form-group col">
                  <label>Rank Great:</label>
                  <input
                    className="form-control"
                    name="rankGreat"
                    type="number"
                    value={this.state.formData.rankGreat}
                    onChange={this.setValues}
                    placeholder="Enter Rank Great"
                    aria-label="Rank Great"
                  />
                </div>
                <div className="form-group col">
                  <label>Rank Good:</label>
                  <input
                    className="form-control"
                    name="rankGood"
                    type="number"
                    value={this.state.formData.rankGood}
                    onChange={this.setValues}
                    placeholder="Enter Rank Good"
                    aria-label="Rank Good"
                  />
                </div>
                <div className="form-group col">
                  <label>Rank Bad:</label>
                  <input
                    className="form-control"
                    name="rankBad"
                    type="number"
                    value={this.state.formData.rankBad}
                    onChange={this.setValues}
                    placeholder="Enter Rank Bad"
                    aria-label="Rank Bad"
                  />
                </div>
              </form>
            </div>
            <div className="card-footer text-center cardF">
              <button
                class="btn btn-primary mr-1"
                name="save"
                id="btnSave"
                aria-label="Save"
                onClick={this.checkValidation}
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
