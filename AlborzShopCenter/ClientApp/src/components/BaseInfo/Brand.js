import React, { Component } from "react";
import { RestDataSource } from "../RestDataSource";
import Modal from "react-bootstrap/Modal";
import { ModalBody } from "react-bootstrap";
import { PaginationControls } from "../PaginationControls";

export class Brand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      categories: [],
      groups: [],
      activeGroups: [],
      countries: [],
      formData: {
        id: 0,
        name: "",
        groupId: 0,
        categoryName: "",
        deleted: 0,
        active: 1,
        countryId: 0,
      },
      searchData: {
        name: "",
        active: -1,
        groupId: 0,
        categoryId: 0,
      },
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
      fieldValidations: { name: true, groupId: true, countryId: true },
      cardTitle: "New a brand",
    };

    this.categoryDataSource = new RestDataSource("Categories");
    this.groupDataSource = new RestDataSource("Groups");
    this.countryDataSource = new RestDataSource("Countries");
    this.dataSource = new RestDataSource("Brands");
  }

  componentDidMount = () => {
    this.categoryDataSource.GetAll((res) => this.setState({ categories: res }));
    this.groupDataSource.GetAll((res) => this.setState({ groups: res }));
    this.countryDataSource.GetAll((res) => this.setState({ countries: res }));
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

    if (this.state.sort === "Active") {
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
      case "group":
        this.setState({
          searchData: { ...this.state.searchData, groupId: event.target.value },
        });
        break;
      case "category":
        this.setState({
          searchData: {
            ...this.state.searchData,
            categoryId: event.target.value,
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
            active: event.target.value,
          },
        });
        break;
      case "group":
        this.setState({
          formData: {
            ...this.state.formData,
            groupId: event.target.value,
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
    }
  };

  clear = () => {
    this.setState({
      formData: {
        id: 0,
        name: "",
        deleted: 0,
        active: 1,
        groupId: 0,
        countryId: 0,
      },
      searchData: {
        name: "",
        active: -1,
        groupId: 0,
        categoryId: 0,
      },
      fieldValidations: { name: true, groupId: true, countryId: true },
      cardTitle: "New a brand",
    });
  };

  checkValidation = () => {
    let error = 0;
    let _fieldValidations = { name: true, groupId: true, countryId: true };

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
    this.setState(
      {
        formData: {
          id: item.id,
          name: item.name,
          deleted: item.deleted,
          active: item.active,
          groupId: item.groupId,
          countryId: item.countryId,
        },
        showSaveModal: 1,
        cardTitle: "Edit brand",
      },
      this.filterGroups
    );
  };

  deleteData = async () => {
    await this.dataSource.Delete(this.state.deleteData.id, (res) =>
      this.setState({ result: res })
    );
    window.location.reload();
  };

  filterGroups = async () => {
    await this.setState({
      activeGroups: this.state.groups.filter((i) => i.active == true),
    });
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
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
            <div className="form-group m-2">
              <label>Group:</label>
              <select
                name="group"
                className="form-control"
                onChange={this.setValueSearch}
                aria-label="Group"
              >
                <option value="0">All</option>
                {this.state.groups.map((i) => (
                  <option value={i.id}>{i.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group m-2">
              <label>Category:</label>
              <select
                name="category"
                className="form-control"
                onChange={this.setValueSearch}
                aria-label="Category"
              >
                <option value="0">All</option>
                {this.state.categories.map((i) => (
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
                <th colSpan="6" className="table-header text-center h4 p-2">
                  Brand
                </th>
              </tr>
              <tr className="table-title">
                <th>Status</th>
                <th>Name</th>
                <th>Group</th>
                <th>Category</th>
                <th>Country</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.sliceData().map((p) => (
                <tr key={p.id}>
                  <td className="col-1">{p.active ? "Active" : "Inactive"}</td>
                  <td className="col-3">{p.name}</td>
                  <td className="col-2">{p.groupName}</td>
                  <td className="col-2">{p.categoryName}</td>
                  <td className="col-2">{p.countryName}</td>
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
            keys={["Name", "Active"]}
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
              this.setState({ showSaveModal: 1 }, this.filterGroups)
            }
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
              value={this.state.formData.active}
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
            <div className="position-relative">
              <select
                name="group"
                className="form-control mb-4"
                onChange={this.setValues}
                aria-label="Group"
                value={this.state.formData.groupId}
                style={
                  this.state.fieldValidations.groupId
                    ? { borderColor: "#ced4da" }
                    : { borderColor: "#dc3545" }
                }
              >
                <option value="0"></option>
                {this.state.activeGroups.map((i) => (
                  <option value={i.id}>{i.name}</option>
                ))}
              </select>
              <div
                className="invalid-tooltip"
                style={{
                  display: this.state.fieldValidations.groupId
                    ? "none"
                    : "inline",
                }}
              >
                Please select a group.
              </div>
            </div>
            <div className="position-relative">
              <select
                name="country"
                className="form-control"
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
                Please select a country.
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
            <h5>Delete {this.state.deleteData.name} Brand</h5>
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
