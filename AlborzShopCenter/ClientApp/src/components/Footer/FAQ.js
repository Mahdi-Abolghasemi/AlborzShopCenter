import React, { Component } from "react";
import { RestDataSource } from "../RestDataSource";
import { PaginationControls } from "../PaginationControls";
import { _FAQ } from "../Data";
import { Accordion } from "../Accordion";
import ReactGA from "react-ga4";

export class FAQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sort: "Question",
      pageCount: 0,
      pageSizes: [5, 10, 25, 100],
      perPage: 5,
      offset: 0,
      currentPage: 1,
    };

    this.dataSource = new RestDataSource("FAQ");
  }

  componentDidMount = () => {
    // this.dataSource.GetAll((res) => this.setState({ data: res }));
    this.setState({ data: _FAQ });
    ReactGA.send({
      hitType: "pageview",
      page: "/footer/faq",
      title: "FAQ page",
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
    if (this.state.sort === "Question") {
      this.setState({
        data: this.state.data.sort((a, b) =>
          a.question > b.question ? 1 : b.question > a.question ? -1 : 0
        ),
      });
    }

    if (this.state.sort === "Answer") {
      this.setState({
        data: this.state.data.sort((a, b) =>
          a.answer > b.answer ? -1 : b.answer > a.answer ? 0 : 1
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
            <div className="mb-4">
              <h2>FAQ</h2>
            </div>
            <div>
              <Accordion hiddenTexts={this.sliceData()} />
            </div>
          </div>
          <PaginationControls
            keys={["Question", "Answer"]}
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
