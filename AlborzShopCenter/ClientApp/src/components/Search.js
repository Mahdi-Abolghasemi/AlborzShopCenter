import React, { Component } from "react";
import { RestDataSource } from "./RestDataSource";
import { Link } from "react-router-dom";
import { PaginationControls } from "./PaginationControls";
import ReactGA from "react-ga4";

// import { Products } from "./Data";

export class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      alerts: {
        show: false,
        message: "",
        className: "",
      },
      sort: "Name",
      pageCount: 0,
      pageSizes: [4, 8, 16, 100],
      perPage: 4,
      offset: 0,
      currentPage: 1,
    };

    this.dataSource = new RestDataSource("Products");
  }

  componentDidMount = () => {
    this.search();
    // this.setState({ data: Products });
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

    if (this.state.sort === "Price") {
      this.setState({
        data: this.state.data.sort((a, b) =>
          a.price > b.price ? -1 : b.price > a.price ? 0 : 1
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

  search = async () => {
    const valueSearch = document.location.href
      .split("?")[1]
      .replace(/%20/g, " ");
    let formData = new FormData();
    formData.append("valueSearch", valueSearch);

    await this.dataSource.OtherMethod(
      "post",
      "Search_Visitor",
      formData,
      (res) => this.setState({ data: res })
    );

    if (this.state.data.length == 0) {
      await this.setState({
        alerts: {
          show: true,
          message: "No products were found with this feature.",
          className: "alert alert-info",
        },
      });
    } else {
      ReactGA.send({
        hitType: "pageview",
        page: "/search",
        title: `Search page and product is:${
          this.state.data[0].brandName
        }${" "} ${this.state.data[0].name}${" "}${this.state.data[0].model}`,
      });
    }
  };

  render() {
    return this.state.data.length > 0 ? (
      <section className="bodyApp">
        <div className="container-fluid adverCategories-div">
          <div className="row justify-content-center row-cols-xs row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
            {this.sliceData().map((item) => (
              <div className="col-auto d-flex mb-4">
                <div className="card public-card">
                  <Link to={`/buy/detail/?pNum=${item.id}`}>
                    <img
                      className="card-img-top"
                      style={{ width: "100%", height: "100%" }}
                      src={`Images\\Products\\${item.folderName}\\${item.images[0]}`}
                      alt="Card image cap"
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">
                      {item.name} {item.model}
                    </p>
                    <p>$ {item.price}.00</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <PaginationControls
            keys={["Name", "Price"]}
            currentPage={this.state.currentPage}
            pageCount={this.getPageCount()}
            pageSizes={this.state.pageSizes}
            sortCallBack={this.sortData}
            pageSizeCallBack={this.setPageSize}
            selectedPageCallBack={this.selectedPage}
          />
        </div>
      </section>
    ) : (
      <div
        className={this.state.alerts.className}
        style={
          this.state.alerts.show ? { display: "block" } : { display: "none" }
        }
        role="alert"
      >
        {this.state.alerts.message}
      </div>
    );
  }
}
