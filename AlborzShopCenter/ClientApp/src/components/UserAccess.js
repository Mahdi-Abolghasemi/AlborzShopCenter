import React, { Component } from "react";
import { RestDataSource } from "./RestDataSource";
import { UserAccessCodeEnum } from "../Enumeration/UserAccessCodeEnum";
import { Link } from "react-router-dom";
import { PaginationControls } from "./PaginationControls";
//import { UserAccessCode } from "./Data";

export class UserAccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      formData: {
        userId: this.props.location.userId,
        accessCode: [],
      },
      allAccessCode: [],
      result: "",
      sort: "Title",
      pageCount: 0,
      pageSizes: [5, 10, 25, 100],
      perPage: 5,
      offset: 0,
      currentPage: 1,
    };

    this.dataSource = new RestDataSource("UserAccess");
  }

  componentDidMount = () => {
    this.getData();
  };

  getData = async () => {
    const userData = new FormData();
    userData.append("userId", this.props.location.userId);
    await this.dataSource.Get(userData, (res) =>
      this.setState({ data: res }, () => this.setData())
    );

    // this.setState({ data: UserAccessCode });
  };

  setData = async () => {
    this.setState({
      formData: { ...this.state.formData, accessCode: this.state.data },
    });

    let _accessCode = {
      title: "",
      value: "",
      active: false,
    };

    let _allAccessCode = [];

    await Object.keys(UserAccessCodeEnum).forEach((field) => {
      _accessCode = {
        title: field.replace(/_/g, " "),
        value: UserAccessCodeEnum[field],
        active: false,
      };
      _allAccessCode.push(_accessCode);
    });

    await _allAccessCode.map((i) =>
      this.state.data.map((j) => (i.value == j ? (i.active = true) : ""))
    );

    await this.setState({ allAccessCode: _allAccessCode });
  };

  sliceData = () => {
    return this.state.allAccessCode.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
  };

  getPageCount = () => {
    return Math.ceil(this.state.allAccessCode.length / this.state.perPage);
  };

  setPageSize = (value) => {
    this.setState({ perPage: value });
  };

  sortData = (value) => {
    this.setState({ sort: value }, this.compar);
  };

  compar = () => {
    if (this.state.sort === "Title") {
      this.setState({
        allAccessCode: this.state.allAccessCode.sort((a, b) =>
          a.title > b.title ? 1 : b.title > a.title ? -1 : 0
        ),
      });
    }

    if (this.state.sort === "Active") {
      this.setState({
        allAccessCode: this.state.allAccessCode.sort((a, b) =>
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

  setValueCheckbox = (input) => {
    if (input.active) {
      input.active = false;
      this.setState({
        allAccessCode: this.state.allAccessCode.map((i) =>
          i.value == input.value ? input : i
        ),
        formData: {
          ...this.state.formData,
          accessCode: this.state.formData.accessCode.filter(
            (i) => i !== input.value
          ),
        },
      });
    } else {
      input.active = true;
      this.setState({
        allAccessCode: this.state.allAccessCode.map((i) =>
          i.value == input.value ? input : i
        ),
        formData: {
          ...this.state.formData,
          accessCode: this.state.formData.accessCode.concat(input.value),
        },
      });
    }
  };

  save = async () => {
    await this.dataSource.Insert(this.state.formData, (res) =>
      this.setState({ result: res })
    );
  };

  render() {
    return (
      <section className="bodyApp">
        <div className="paddingCart-table">
          <table className="table table-sm table-striped table-bordered">
            <thead>
              <tr>
                <th colSpan="2" className="table-header text-center h4 p-2">
                  User Access
                </th>
              </tr>
              <tr className="table-title">
                <th>Title</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.sliceData().map((i) => (
                <tr>
                  <td>{i.title}</td>
                  <td className="text-center">
                    <input
                      name="accessCode"
                      checked={i.active ? "checked" : ""}
                      onChange={() => this.setValueCheckbox(i)}
                      type="checkbox"
                      aria-label="Access Code"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <PaginationControls
              keys={["Title", "Active"]}
              currentPage={this.state.currentPage}
              pageCount={this.getPageCount()}
              pageSizes={this.state.pageSizes}
              sortCallBack={this.sortData}
              pageSizeCallBack={this.setPageSize}
              selectedPageCallBack={this.selectedPage}
            />
          </div>
          <div className="text-center">
            <Link
              className="btn btn-primary mr-1"
              to={"/applicationUser"}
              name="save"
              aria-label="Save"
              onClick={this.save}
            >
              Save
            </Link>
            <Link
              className="btn btn-secondary"
              to={"/applicationUser"}
              name="cancel"
              aria-label="Cancel"
            >
              Cancel
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
