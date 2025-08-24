import React, { Component } from "react";
import { PaginationButtons } from "./PaginationButtons";

export class PaginationControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSizes: [],
      sortKeys: [],
    };
  }

  componentDidMount() {
    this.setState({
      pageSizes: this.props.pageSizes,
      sortKeys: this.props.keys,
    });
  }

  handlePageSizeChange = (ev) => {
    this.props.pageSizeCallBack(ev.target.value);
  };

  handleSortPropertyChange = (ev) => {
    this.props.sortCallBack(ev.target.value);
  };

  render() {
    return (
      <div className="m-2">
        <div className="text-center m-1">
          <PaginationButtons
            currentPage={this.props.currentPage}
            pageCount={this.props.pageCount}
            selectedPageCallBack={this.props.selectedPageCallBack}
          />
        </div>
        <div className="form-inline d-flex justify-content-center">
          <div className="form-group m-1">
            <select
              className="form-control"
              onChange={this.handlePageSizeChange}
            >
              {this.state.pageSizes.map((s) => (
                <option value={s} key={s}>
                  {s} per page
                </option>
              ))}
            </select>
          </div>
          <div className="form-group m-1">
            <select
              className="form-control"
              onChange={this.handleSortPropertyChange}
            >
              {this.state.sortKeys.map((k) => (
                <option value={k} key={k}>
                  Sort By {k}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
}
