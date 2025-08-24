import React, { Component } from "react";
import { RestDataSource } from "../RestDataSource";
import Modal from "react-bootstrap/Modal";
import { ModalBody } from "react-bootstrap";
import { PaginationControls } from "../PaginationControls";

export class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      category: [],
      activeCategorys: [],
      formData: {
        id: 0,
        name: "",
        deleted: 0,
        active: 1,
        categoryId: 0,
        categoryName: "",
      },
      searchData: { id: 0, name: "", deleted: 0, active: -1, categoryId: 0 },
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
      fieldValidations: { name: true, categoryId: true },
      cardTitle: "New a group",
    };

    this.dataSource = new RestDataSource("Groups");
    this.categorydataSource = new RestDataSource("Categories");
  }

  componentDidMount = () => {
    this.dataSource.GetAll((res) => this.setState({ data: res }));
    this.categorydataSource.GetAll((res) => this.setState({ category: res }));
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
      case "category":
        this.setState({
          formData: {
            ...this.state.formData,
            categoryId: event.target.value,
          },
        });
        break;
    }
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

  clear = () => {
    this.setState({
      formData: { id: 0, name: "", deleted: 0, active: 1, categoryId: 0 },
      searchData: { id: 0, name: "", deleted: 0, active: -1, categoryId: 0 },
      deleteData: { id: 0, name: "" },
      fieldValidations: { name: true, categoryId: true },
      cardTitle: "New a group",
    });
  };

  editData = (item) => {
    this.setState(
      {
        formData: {
          id: item.id,
          name: item.name,
          deleted: item.deleted,
          active: item.active,
          categoryId: item.categoryId,
        },
        showSaveModal: 1,
        cardTitle: "Edit group",
      },
      this.filterCategory
    );
  };

  deleteData = async () => {
    await this.dataSource.Delete(this.state.deleteData.id, (res) =>
      this.setState({ result: res })
    );
    window.location.reload();
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

  checkValidation = () => {
    let error = 0;
    let _fieldValidations = { name: true, categoryId: true };

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

  filterCategory = async () => {
    await this.setState({
      activeCategorys: this.state.category.filter((i) => i.active == true),
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
              <label>Category:</label>
              <select
                name="category"
                className="form-control"
                onChange={this.setValueSearch}
                aria-label="Status"
              >
                <option value="0">All</option>
                {this.state.category.map((i) => (
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
                  Group
                </th>
              </tr>
              <tr className="table-title">
                <th>Status</th>
                <th>Name</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.sliceData().map((p) => (
                <tr key={p.id}>
                  <td className="col-1">{p.active ? "Active" : "Inactive"}</td>
                  <td className="col-4">{p.name}</td>
                  <td className="col-4">{p.categoryName}</td>
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
              this.setState({ showSaveModal: 1 }, this.filterCategory)
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
                name="category"
                className="form-control"
                onChange={this.setValues}
                aria-label="Status"
                value={this.state.formData.categoryId}
                style={
                  this.state.fieldValidations.categoryId
                    ? { borderColor: "#ced4da" }
                    : { borderColor: "#dc3545" }
                }
              >
                <option value="0"></option>
                {this.state.activeCategorys.map((i) => (
                  <option value={i.id}>{i.name}</option>
                ))}
              </select>
              <div
                className="invalid-tooltip"
                style={{
                  display: this.state.fieldValidations.categoryId
                    ? "none"
                    : "inline",
                }}
              >
                Please select a category.
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
            <h5>Delete {this.state.deleteData.name} Group</h5>
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
