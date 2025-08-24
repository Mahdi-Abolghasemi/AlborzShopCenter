import React, { Component } from "react";
import { RestDataSource } from "./RestDataSource";
import Modal from "react-bootstrap/Modal";
import { ModalBody } from "react-bootstrap";
import { PaginationControls } from "./PaginationControls";
import validator from "validator";
import { UserRoleTypeEnum } from "../Enumeration/UserRoleTypeEnum";
import { Link } from "react-router-dom";

// import { users } from "./Data";

export class ApplicationUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      country: [],
      formData: {
        id: "00000000-0000-0000-0000-000000000000",
        userName: "",
        email: "",
        phoneNumber: "",
        twoFactorEnabled: 0,
        deleted: 0,
        active: 1,
        countryId: 0,
        countryName: "",
        roleType: 0,
        roleTypeName: "",
        password: "",
      },
      repeatPassword: "",
      searchData: {
        userName: "",
        roleType: -1,
        active: -1,
      },
      alerts: {
        show: false,
        message: "",
        className: "",
      },
      showMainPage: 1,
      showSavePage: 0,
      showEditPage: 0,
      showChangePasswordPage: 0,
      result: "",
      showDeleteModal: 0,
      deleteData: { id: "", userName: "" },
      sort: "User Name",
      pageCount: 0,
      pageSizes: [5, 10, 25, 100],
      perPage: 5,
      offset: 0,
      currentPage: 1,
      fieldValidations: {
        userName: true,
        email: true,
        phoneNumber: true,
        password: true,
        roleType: true,
        countryId: true,
      },
      validRepeatPass: true,
    };

    this.countryDataSource = new RestDataSource("Countries");
    this.dataSource = new RestDataSource("ApplicationUser");
  }

  componentDidMount = () => {
    this.countryDataSource.GetAll((res) => this.setState({ country: res }));
    this.dataSource.GetAll((res) => this.setState({ data: res }));

    // this.setState({ data: users });
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
    if (this.state.sort === "User Name") {
      this.setState({
        data: this.state.data.sort((a, b) =>
          a.userName > b.userName ? 1 : b.userName > a.userName ? -1 : 0
        ),
      });
    }

    if (this.state.sort === "Country") {
      this.setState({
        data: this.state.data.sort((a, b) =>
          a.countryName > b.countryName
            ? -1
            : b.countryName > a.countryName
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
        id: "00000000-0000-0000-0000-000000000000",
        userName: "",
        email: "",
        phoneNumber: "",
        twoFactorEnabled: 0,
        deleted: 0,
        active: 1,
        countryId: 0,
        countryName: "",
        roleType: 0,
        roleTypeName: "",
        password: "",
      },
      repeatPassword: "",
      searchData: {
        userName: "",
        roleType: -1,
        active: -1,
      },
      alerts: {
        show: false,
        message: "",
        className: "",
      },
      fieldValidations: {
        userName: true,
        email: true,
        phoneNumber: true,
        password: true,
        roleType: true,
        countryId: true,
      },
      validRepeatPass: true,
    });
  };

  deleteData = (item) => {
    this.setState({
      formData: {
        id: item.id,
        userName: item.userName,
        email: item.email,
        phoneNumber: item.phoneNumber,
        twoFactorEnabled: item.twoFactorEnabled,
        deleted: 1,
        active: item.active,
        countryId: item.countryId,
        roleType: item.roleType,
        password: item.password,
      },
    });
  };

  approveDeleteData = async () => {
    await this.dataSource.Update(this.state.formData, (res) =>
      this.setState({ showMainPage: 1, showSavePage: 0, result: res })
    );
    this.clear();
    window.location.reload();
  };

  cancel = () => {
    this.clear();
    this.setState({
      showMainPage: 1,
      showSavePage: 0,
      showEditPage: 0,
      showChangePasswordPage: 0,
    });
  };

  checkValidation = () => {
    let error = 0;
    let _fieldValidations = {
      userName: true,
      email: true,
      phoneNumber: true,
      password: true,
      roleType: true,
      countryId: true,
    };
    let _validRepeatPass = true;

    Object.keys(this.state.fieldValidations).forEach((field) => {
      if (
        this.state.formData[field] === "" ||
        this.state.formData[field] == 0
      ) {
        error++;
        _fieldValidations[field] = false;
      }
    });

    if (!validator.isEmail(this.state.formData.email)) {
      _fieldValidations.email = false;
      error++;
    }

    if (this.state.repeatPassword === "" || this.state.repeatPassword == 0) {
      _validRepeatPass = false;
      error++;
    } else {
      if (this.state.formData.password !== this.state.repeatPassword) {
        error++;
        this.setState({
          alerts: {
            show: true,
            message: "The password and repeat password are not the same",
            className: "alert alert-danger",
          },
        });
      } else {
        let lowerCaseLetters = /[a-z]/g;
        let upperCaseLetters = /[A-Z]/g;
        let numbers = /[0-9]/g;
        let character = /[!@#\$%\^&\*]/g;

        if (!this.state.formData.password.match(lowerCaseLetters)) {
          error++;
          this.setState({
            alerts: {
              show: true,
              message: "Password must has lowercase character",
              className: "alert alert-danger",
            },
          });
        } else if (!this.state.formData.password.match(upperCaseLetters)) {
          error++;
          this.setState({
            alerts: {
              show: true,
              message: "Password must has uppercase character",
              className: "alert alert-danger",
            },
          });
        } else if (!this.state.formData.password.match(numbers)) {
          error++;
          this.setState({
            alerts: {
              show: true,
              message: "Password must has number",
              className: "alert alert-danger",
            },
          });
        } else if (!this.state.formData.password.match(character)) {
          error++;
          this.setState({
            alerts: {
              show: true,
              message:
                "Password must has a character ! or @ or # or $ or % or ^ or & or *",
              className: "alert alert-danger",
            },
          });
        } else if (this.state.formData.password.length < 8) {
          error++;
          this.setState({
            alerts: {
              show: true,
              message: "Password should be 8 or up chars",
              className: "alert alert-danger",
            },
          });
        } else {
          this.setState({
            alerts: {
              show: false,
              message: "",
              className: "",
            },
          });
        }
      }
    }

    this.setState({
      fieldValidations: _fieldValidations,
      validRepeatPass: _validRepeatPass,
    });

    if (error === 0) this.save();
  };

  save = async () => {
    if (this.state.formData.id === "00000000-0000-0000-0000-000000000000") {
      await this.dataSource.Insert(this.state.formData, (res) =>
        this.setState({
          showMainPage: 1,
          showSavePage: 0,
          showEditPage: 0,
          showChangePasswordPage: 0,
          result: res,
        })
      );
      this.clear();
    } else {
      await this.dataSource.Update(this.state.formData, (res) =>
        this.setState({
          showMainPage: 1,
          showSavePage: 0,
          showEditPage: 0,
          showChangePasswordPage: 0,

          result: res,
        })
      );
      this.clear();
    }
    window.location.reload();
  };

  setValues = (event) => {
    switch (event.target.name) {
      case "userName":
        this.setState({
          formData: {
            ...this.state.formData,
            userName: event.target.value,
          },
        });
        break;
      case "email":
        this.setState({
          formData: {
            ...this.state.formData,
            email: event.target.value,
          },
        });
        break;
      case "phoneNumber":
        this.setState({
          formData: {
            ...this.state.formData,
            phoneNumber: event.target.value,
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
      case "countryId":
        this.setState({
          formData: {
            ...this.state.formData,
            countryId: event.target.value,
          },
        });
        break;
      case "role":
        this.setState({
          formData: {
            ...this.state.formData,
            roleType: event.target.value,
          },
        });
        break;
      case "password":
        this.setState({
          formData: {
            ...this.state.formData,
            password: event.target.value,
          },
        });
        break;
      case "repeatPassword":
        this.setState({
          repeatPassword: event.target.value,
        });
        break;
    }
  };

  setValueCheckbox = () => {
    if (document.getElementById("twoFactorEnabledCheck").checked) {
      this.setState({
        formData: {
          ...this.state.formData,
          twoFactorEnabled: 1,
        },
      });
    } else {
      this.setState({
        formData: {
          ...this.state.formData,
          twoFactorEnabled: 0,
        },
      });
    }
  };

  editData = (item) => {
    this.setState({
      formData: {
        id: item.id,
        userName: item.userName,
        email: item.email,
        phoneNumber: item.phoneNumber,
        twoFactorEnabled: item.twoFactorEnabled,
        active: item.active,
        countryId: item.countryId,
        roleType: item.roleType,
        password: item.password,
      },
      repeatPassword: item.password,
      showMainPage: 0,
      showSavePage: 0,
      showEditPage: 1,
      showChangePasswordPage: 0,
    });
  };

  Update = () => {
    let error = 0;
    let _fieldValidations = {
      userName: true,
      email: true,
      phoneNumber: true,
      password: true,
      roleType: true,
      countryId: true,
    };

    if (
      this.state.formData.userName === "" ||
      this.state.formData.userName == 0
    ) {
      _fieldValidations.userName = false;
      error++;
    }

    if (!validator.isEmail(this.state.formData.email)) {
      _fieldValidations.email = false;
      error++;
    }

    if (this.state.formData.phoneNumber == 0) {
      _fieldValidations.phoneNumber = false;
      error++;
    }

    if (this.state.formData.countryId == 0) {
      _fieldValidations.countryId = false;
      error++;
    }

    if (this.state.formData.roleType == 0) {
      _fieldValidations.roleType = false;
      error++;
    }

    this.setState({ fieldValidations: _fieldValidations });

    if (error === 0) {
      this.save();
    }
  };

  changePassword = (item) => {
    this.setState({
      formData: {
        id: item.id,
        userName: item.userName,
        email: item.email,
        phoneNumber: item.phoneNumber,
        twoFactorEnabled: item.twoFactorEnabled,
        active: item.active,
        countryId: item.countryId,
        roleType: item.roleType,
        password: "",
      },
      repeatPassword: "",
      showMainPage: 0,
      showSavePage: 0,
      showEditPage: 0,
      showChangePasswordPage: 1,
    });
  };

  updatePassword = async () => {
    let error = 0;
    let _validPass = true;
    let _validRepeatPass = true;

    if (
      this.state.formData.password === "" ||
      this.state.formData.password == 0
    ) {
      _validPass = false;
      error++;
    }

    if (this.state.repeatPassword === "" || this.state.repeatPassword == 0) {
      _validRepeatPass = false;
      error++;
    }

    if (_validPass && _validRepeatPass) {
      if (this.state.formData.password !== this.state.repeatPassword) {
        error++;
        this.setState({
          alerts: {
            show: true,
            message: "The password and repeat password are not the same",
            className: "alert alert-danger",
          },
        });
      } else {
        let lowerCaseLetters = /[a-z]/g;
        let upperCaseLetters = /[A-Z]/g;
        let numbers = /[0-9]/g;
        let character = /[!@#\$%\^&\*]/g;

        if (!this.state.formData.password.match(lowerCaseLetters)) {
          error++;
          this.setState({
            alerts: {
              show: true,
              message: "Password must has lowercase character",
              className: "alert alert-danger",
            },
          });
        } else if (!this.state.formData.password.match(upperCaseLetters)) {
          error++;
          this.setState({
            alerts: {
              show: true,
              message: "Password must has uppercase character",
              className: "alert alert-danger",
            },
          });
        } else if (!this.state.formData.password.match(numbers)) {
          error++;
          this.setState({
            alerts: {
              show: true,
              message: "Password must has number",
              className: "alert alert-danger",
            },
          });
        } else if (!this.state.formData.password.match(character)) {
          error++;
          this.setState({
            alerts: {
              show: true,
              message:
                "Password must has a character ! or @ or # or $ or % or ^ or & or *",
              className: "alert alert-danger",
            },
          });
        } else if (this.state.formData.password.length < 8) {
          error++;
          this.setState({
            alerts: {
              show: true,
              message: "Password should be 8 or up chars",
              className: "alert alert-danger",
            },
          });
        } else {
          this.setState({
            alerts: {
              show: false,
              message: "",
              className: "",
            },
          });
        }
      }
    }

    this.setState({
      fieldValidations: {
        ...this.state.fieldValidations,
        password: _validPass,
      },
      validRepeatPass: _validRepeatPass,
    });

    if (error === 0) {
      await this.dataSource.ChangePassword(this.state.formData, (res) =>
        this.setState({
          showMainPage: 1,
          showChangePasswordPage: 0,
          result: res,
        })
      );
      this.clear();
      window.location.reload();
    }
  };

  setValueSearch = (event) => {
    switch (event.target.name) {
      case "userName":
        this.setState({
          searchData: {
            ...this.state.searchData,
            userName: event.target.value,
          },
        });
        break;
      case "status":
        this.setState({
          searchData: { ...this.state.searchData, active: event.target.value },
        });
        break;
      case "role":
        this.setState({
          searchData: {
            ...this.state.searchData,
            roleType: event.target.value,
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

  render() {
    if (this.state.showMainPage) {
      return (
        <section className="bodyApp">
          <div className="container-fluid p-4">
            <form className="d-flex">
              <div className="form-group m-2">
                <label>User Name:</label>
                <input
                  className="form-control"
                  name="userName"
                  onChange={this.setValueSearch}
                  type="text"
                  placeholder="Enter User Name"
                  aria-label="User Name"
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
                <label>Role:</label>
                <select
                  className="form-control"
                  name="role"
                  type="number"
                  onChange={this.setValueSearch}
                  aria-label="Role"
                >
                  <option value="-1">All</option>
                  <option value="1">Admin</option>
                  <option value="2">User</option>
                  <option value="3">Client</option>
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
                  <th colSpan="8" className="table-header text-center h4 p-2">
                    Users
                  </th>
                </tr>
                <tr className="table-title">
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Active</th>
                  <th>country</th>
                  <th>User Role</th>
                  <th>Two Factor Enabled</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.sliceData().map((u) => (
                  <tr key={u.id}>
                    <td>{u.userName}</td>
                    <td>{u.email}</td>
                    <td>{u.phoneNumber}</td>
                    <td className="col-1">
                      {u.active ? "Active" : "Inactive"}
                    </td>
                    <td>{u.countryName}</td>
                    <td>{u.roleTypeName}</td>
                    <td>{u.twoFactorEnabled ? "True" : "False"}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning m-1"
                        onClick={() => this.editData(u)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete button btn btn-sm btn-danger m-1"
                        onClick={() =>
                          this.setState(
                            {
                              showDeleteModal: 1,
                              deleteData: { id: u.id, userName: u.userName },
                            },
                            this.deleteData(u)
                          )
                        }
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-sm btn-warning m-1"
                        onClick={() => this.changePassword(u)}
                      >
                        Change Password
                      </button>
                      <Link
                        className="btn btn-sm btn-warning m-1"
                        to={{
                          pathname: "applicationUser/userAccess",
                          userId: u.id,
                          userName: u.userName,
                        }}
                        style={{
                          display:
                            u.roleType !== UserRoleTypeEnum.Client
                              ? "block"
                              : "none",
                        }}
                      >
                        Access
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <PaginationControls
              keys={["User Name", "Country"]}
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
              <h5>Delete {this.state.deleteData.userName}</h5>
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
                onClick={() => this.setState({ showDeleteModal: 0 })}
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.approveDeleteData}
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
              <h1 className="card-title">New a user</h1>
            </div>
            <div className="card-body">
              <form>
                <div className="d-flex row row-cols-2">
                  <div className="position-relative form-group col">
                    <label>User Name:</label>
                    <input
                      className="form-control"
                      name="userName"
                      type="text"
                      value={this.state.formData.userName}
                      onChange={this.setValues}
                      placeholder="Enter User Name"
                      aria-label="User Name"
                      style={
                        this.state.fieldValidations.userName
                          ? { borderColor: "#ced4da" }
                          : { borderColor: "#dc3545" }
                      }
                    />
                    <div
                      className="invalid-tooltip"
                      style={{
                        display: this.state.fieldValidations.userName
                          ? "none"
                          : "inline",
                      }}
                    >
                      Please fill out this field.
                    </div>
                  </div>
                  <div className="position-relative form-group col">
                    <label>Email:</label>
                    <input
                      className="form-control"
                      name="email"
                      type="email"
                      pattern="[^\s@]+@[^\s@]+\.[^\s@]+$"
                      value={this.state.formData.email}
                      onChange={this.setValues}
                      placeholder="Enter Email"
                      aria-label="Email"
                      style={
                        this.state.fieldValidations.email
                          ? { borderColor: "#ced4da" }
                          : { borderColor: "#dc3545" }
                      }
                    />
                    <div
                      className="invalid-tooltip"
                      style={{
                        display: this.state.fieldValidations.email
                          ? "none"
                          : "inline",
                      }}
                    >
                      Please provide a valid email.
                    </div>
                  </div>
                  <div className="position-relative form-group col">
                    <label>Phone Number:</label>
                    <input
                      className="form-control"
                      name="phoneNumber"
                      type="number"
                      value={this.state.formData.phoneNumber}
                      onChange={this.setValues}
                      placeholder="Enter Phone Number"
                      aria-label="Phone Number"
                      style={
                        this.state.fieldValidations.phoneNumber
                          ? { borderColor: "#ced4da" }
                          : { borderColor: "#dc3545" }
                      }
                    />
                    <div
                      className="invalid-tooltip"
                      style={{
                        display: this.state.fieldValidations.phoneNumber
                          ? "none"
                          : "inline",
                      }}
                    >
                      Please fill out this field.
                    </div>
                  </div>
                  <div className="form-group col">
                    <label>Active:</label>
                    <select
                      className="form-control"
                      name="active"
                      type="number"
                      value={this.state.formData.active}
                      onChange={this.setValues}
                      aria-label="Active"
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
                  <div className="position-relative form-group col">
                    <label>Country:</label>
                    <select
                      className="form-control"
                      name="countryId"
                      type="number"
                      value={this.state.formData.countryId}
                      onChange={this.setValues}
                      aria-label="Country"
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
                  <div className="form-group col">
                    <label>Role:</label>
                    <select
                      className="form-control"
                      name="role"
                      type="number"
                      value={this.state.formData.roleType}
                      onChange={this.setValues}
                      aria-label="Role"
                      style={
                        this.state.fieldValidations.roleType
                          ? { borderColor: "#ced4da" }
                          : { borderColor: "#dc3545" }
                      }
                    >
                      <option value=""></option>
                      <option value="1">Admin</option>
                      <option value="2">User</option>
                      <option value="3">Client</option>
                    </select>
                    <div
                      className="invalid-tooltip"
                      style={{
                        display: this.state.fieldValidations.roleType
                          ? "none"
                          : "inline",
                      }}
                    >
                      Please select a valid Role.
                    </div>
                  </div>
                  <div className="position-relative form-group col">
                    <label>Password:</label>
                    <input
                      className="form-control"
                      name="password"
                      type="password"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*]).{8,}"
                      value={this.state.formData.password}
                      onChange={this.setValues}
                      placeholder="Enter password"
                      aria-label="Password"
                      style={
                        this.state.fieldValidations.password
                          ? { borderColor: "#ced4da" }
                          : { borderColor: "#dc3545" }
                      }
                    />
                    <div
                      className="align-text-bottom invalid-tooltip"
                      style={{
                        display: this.state.fieldValidations.password
                          ? "none"
                          : "inline",
                      }}
                    >
                      Please enter a valid password.
                    </div>
                  </div>
                  <div className="position-relative form-group col">
                    <label>Repeat Password:</label>
                    <input
                      className="form-control"
                      name="repeatPassword"
                      type="password"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*]).{8,}"
                      value={this.state.repeatPassword}
                      onChange={this.setValues}
                      placeholder="Enter Repeat password"
                      aria-label="Repeat Password"
                      style={
                        this.state.validRepeatPass
                          ? { borderColor: "#ced4da" }
                          : { borderColor: "#dc3545" }
                      }
                    />
                    <div
                      className="invalid-tooltip"
                      style={{
                        display: this.state.validRepeatPass ? "none" : "inline",
                      }}
                    >
                      Please enter a valid password.
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div className="custom-control custom-checkbox col m-1">
                    <input
                      name="twoFactorEnabled"
                      value={this.state.formData.twoFactorEnabled}
                      onChange={this.setValueCheckbox}
                      type="checkbox"
                      className="custom-control-input"
                      aria-label="Two Factor Enabled"
                      id="twoFactorEnabledCheck"
                    />
                    <label
                      className="custom-control-label"
                      for="twoFactorEnabledCheck"
                    >
                      Two Factor Enabled
                    </label>
                  </div>
                </div>
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
              </form>
            </div>

            <div className="card-footer text-center cardF">
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
    } else if (this.state.showEditPage) {
      return (
        <section className="page-input d-flex justify-content-center">
          <div className="card card-input">
            <div className="card-header cardH">
              <h1 className="card-title">Edit user</h1>
            </div>
            <div className="card-body">
              <form>
                <div className="d-flex row row-cols-2">
                  <div className="position-relative form-group col">
                    <label>User Name:</label>
                    <input
                      className="form-control"
                      name="userName"
                      type="text"
                      value={this.state.formData.userName}
                      onChange={this.setValues}
                      placeholder="Enter User Name"
                      aria-label="User Name"
                      style={
                        this.state.fieldValidations.userName
                          ? { borderColor: "#ced4da" }
                          : { borderColor: "#dc3545" }
                      }
                    />
                    <div
                      className="invalid-tooltip"
                      style={{
                        display: this.state.fieldValidations.userName
                          ? "none"
                          : "inline",
                      }}
                    >
                      Please fill out this field.
                    </div>
                  </div>
                  <div className="position-relative form-group col">
                    <label>Email:</label>
                    <input
                      className="form-control"
                      name="email"
                      type="email"
                      pattern="[^\s@]+@[^\s@]+\.[^\s@]+$"
                      value={this.state.formData.email}
                      onChange={this.setValues}
                      placeholder="Enter Email"
                      aria-label="Email"
                      style={
                        this.state.fieldValidations.email
                          ? { borderColor: "#ced4da" }
                          : { borderColor: "#dc3545" }
                      }
                    />
                    <div
                      className="invalid-tooltip"
                      style={{
                        display: this.state.fieldValidations.email
                          ? "none"
                          : "inline",
                      }}
                    >
                      Please provide a valid email.
                    </div>
                  </div>
                  <div className="position-relative form-group col">
                    <label>Phone Number:</label>
                    <input
                      className="form-control"
                      name="phoneNumber"
                      type="number"
                      value={this.state.formData.phoneNumber}
                      onChange={this.setValues}
                      placeholder="Enter Phone Number"
                      aria-label="Phone Number"
                      style={
                        this.state.fieldValidations.phoneNumber
                          ? { borderColor: "#ced4da" }
                          : { borderColor: "#dc3545" }
                      }
                    />
                    <div
                      className="invalid-tooltip"
                      style={{
                        display: this.state.fieldValidations.phoneNumber
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
                      type="number"
                      value={this.state.formData.countryId}
                      onChange={this.setValues}
                      aria-label="Country"
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
                  <div className="form-group col">
                    <label>Active:</label>
                    <select
                      className="form-control"
                      name="active"
                      type="number"
                      value={this.state.formData.active}
                      onChange={this.setValues}
                      aria-label="Active"
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
                  <div className="form-group col">
                    <label>Role:</label>
                    <select
                      className="form-control"
                      name="role"
                      type="number"
                      value={this.state.formData.roleType}
                      onChange={this.setValues}
                      aria-label="Role"
                      style={
                        this.state.fieldValidations.roleType
                          ? { borderColor: "#ced4da" }
                          : { borderColor: "#dc3545" }
                      }
                    >
                      <option value=""></option>
                      <option value="1">Admin</option>
                      <option value="2">User</option>
                      <option value="3">Client</option>
                    </select>
                    <div
                      className="invalid-tooltip"
                      style={{
                        display: this.state.fieldValidations.roleType
                          ? "none"
                          : "inline",
                      }}
                    >
                      Please select a valid Role.
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div className="custom-control custom-checkbox col m-1">
                    <input
                      name="twoFactorEnabled"
                      checked={
                        this.state.formData.twoFactorEnabled ? "checked" : ""
                      }
                      onChange={this.setValueCheckbox}
                      type="checkbox"
                      className="custom-control-input"
                      aria-label="Two Factor Enabled"
                      id="twoFactorEnabledCheck"
                    />
                    <label
                      className="custom-control-label"
                      for="twoFactorEnabledCheck"
                    >
                      Two Factor Enabled
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="card-footer text-center cardF">
              <button
                className="btn btn-primary mr-1"
                name="save"
                id="btnSave"
                aria-label="Save"
                onClick={this.Update}
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
    } else if (this.state.showChangePasswordPage) {
      return (
        <section className="page-input d-flex justify-content-center">
          <div className="card card-input">
            <div className="card-header cardH">
              <h1 className="card-title">Change password</h1>
            </div>
            <div className="card-body">
              <form className="d-flex row row-cols-2">
                <div className="position-relative form-group col">
                  <label>Password:</label>
                  <input
                    className="form-control"
                    name="password"
                    type="password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*]).{8,}"
                    value={this.state.formData.password}
                    onChange={this.setValues}
                    placeholder="Enter password"
                    aria-label="Password"
                    style={
                      this.state.fieldValidations.password
                        ? { borderColor: "#ced4da" }
                        : { borderColor: "#dc3545" }
                    }
                  />
                  <div
                    className="align-text-bottom invalid-tooltip"
                    style={{
                      display: this.state.fieldValidations.password
                        ? "none"
                        : "inline",
                    }}
                  >
                    Please enter a valid password.
                  </div>
                </div>
                <div className="position-relative form-group col">
                  <label>Repeat Password:</label>
                  <input
                    className="form-control"
                    name="repeatPassword"
                    type="password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*]).{8,}"
                    value={this.state.repeatPassword}
                    onChange={this.setValues}
                    placeholder="Enter Repeat password"
                    aria-label="Repeat Password"
                    style={
                      this.state.validRepeatPass
                        ? { borderColor: "#ced4da" }
                        : { borderColor: "#dc3545" }
                    }
                  />
                  <div
                    className="invalid-tooltip"
                    style={{
                      display: this.state.validRepeatPass ? "none" : "inline",
                    }}
                  >
                    Please enter a valid password.
                  </div>
                </div>
              </form>
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
            </div>
            <div className="card-footer text-center cardF">
              <button
                className="btn btn-primary mr-1"
                name="save"
                id="btnSave"
                aria-label="Save"
                onClick={this.updatePassword}
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
    }
  }
}
