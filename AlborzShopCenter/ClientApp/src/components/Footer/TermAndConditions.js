import React, { Component } from "react";
import { RestDataSource } from "../RestDataSource";
import { PaginationControls } from "../PaginationControls";
import ReactGA from "react-ga4";

export class TermAndConditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sort: "Title",
      pageCount: 0,
      pageSizes: [5, 10, 25, 100],
      perPage: 5,
      offset: 0,
      currentPage: 1,
    };

    this.dataSource = new RestDataSource("TermAndConditions");
  }

  componentDidMount = () => {
    this.dataSource.GetAll((res) => this.setState({ data: res }));
    ReactGA.send({
      hitType: "pageview",
      page: "/footer/editTermAndConditions",
      title: "TermAndConditions page",
    });
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
    if (this.state.sort === "Title") {
      this.setState({
        data: this.state.data.sort((a, b) =>
          a.title > b.title ? 1 : b.title > a.title ? -1 : 0
        ),
      });
    }

    if (this.state.sort === "Content") {
      this.setState({
        data: this.state.data.sort((a, b) =>
          a.content > b.content ? -1 : b.content > a.content ? 0 : 1
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

  render() {
    return (
      <section className="footer-body">
        <div className="footer-content">
          <div className="mb-4">
            <h2>Term and conditions</h2>
          </div>
          <div style={{ paddingLeft: "2%" }}>
            {this.sliceData().map((i) => (
              <div className="mb-2">
                <h5>{i.title}</h5>
                <p>{i.content}</p>
              </div>
            ))}
          </div>
          <PaginationControls
            keys={["Title", "Content"]}
            currentPage={this.state.currentPage}
            pageCount={this.getPageCount()}
            pageSizes={this.state.pageSizes}
            sortCallBack={this.sortData}
            pageSizeCallBack={this.setPageSize}
            selectedPageCallBack={this.selectedPage}
          />
        </div>
      </section>
    );
  }
}
