import React, { Component, Fragment } from "react";

export class PaginationButtons extends Component {
  constructor(props) {
    super(props);
  }

  getPageNumbers = () => {
    if (this.props.pageCount < 4) {
      return [...Array(this.props.pageCount + 1).keys()].slice(1);
    } else if (this.props.currentPage <= 4) {
      return [1, 2, 3, 4, 5];
    } else if (this.props.currentPage > this.props.pageCount - 4) {
      return [...Array(5).keys()]
        .reverse()
        .map((v) => this.props.pageCount - v);
    } else {
      return [
        this.props.currentPage - 1,
        this.props.currentPage,
        this.props.currentPage + 1,
      ];
    }
  };

  render() {
    return (
      <Fragment>
        <button
          onClick={() =>
            this.props.selectedPageCallBack(this.props.currentPage - 1)
          }
          disabled={this.props.currentPage === 1}
          className="btn btn-secondary mx-1"
        >
          Previous
        </button>
        {this.props.currentPage > 4 && (
          <Fragment>
            <button
              className="btn btn-secondary mx-1"
              onClick={() => this.props.selectedPageCallBack(1)}
            >
              1
            </button>
            <span className="h4">...</span>
          </Fragment>
        )}
        {this.getPageNumbers().map((num) => (
          <button
            className={`btn mx-1 ${
              num === this.props.currentPage ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => this.props.selectedPageCallBack(num)}
            key={num}
          >
            {num}
          </button>
        ))}
        {this.props.currentPage <= this.props.pageCount - 4 && (
          <Fragment>
            <span className="h4">...</span>
            <button
              className="btn btn-secondary mx-1"
              onClick={() =>
                this.props.selectedPageCallBack(this.props.pageCount)
              }
            >
              {this.props.pageCount}
            </button>
          </Fragment>
        )}
        <button
          onClick={() =>
            this.props.selectedPageCallBack(this.props.currentPage + 1)
          }
          disabled={this.props.currentPage === this.props.pageCount}
          className="btn btn-secondary mx-1"
        >
          Next
        </button>
      </Fragment>
    );
  }
}
