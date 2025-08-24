import React, { Component } from "react";
import { RestDataSource } from "./RestDataSource";
import { PaginationControls } from "./PaginationControls";
import { Link } from "react-router-dom";
import ReactGA from "react-ga4";

import { Products } from "./Data";

export class Buy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      searchData: {
        name: "",
        model: "",
        active: -1,
        brandId: -1,
        shopId: -1,
        groupId: document.location.href
          .split("?")[1]
          .replace(/%20/g, "")
          .replace(/gNum=/g, ""),
      },
      productId: document.location.href
        .split("?")[2]
        .replace(/%20/g, "")
        .replace(/pNum=/g, ""),
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
    this.getData();
  };

  getData = async () => {
    if (this.state.searchData.groupId > 0 && this.state.productId == 0) {
      await this.dataSource.Search(this.state.searchData, (res) =>
        this.setState({ data: res, offset: 0, currentPage: 1 })
      );

      if (this.state.data.length > 0) {
        ReactGA.send({
          hitType: "pageview",
          page: "/buy",
          title: `Buy page and group title is: ${this.state.data[0].groupName}`,
        });
      }
    } else if (this.state.searchData.groupId > 0 && this.state.productId > 0) {
      const itemData = new FormData();
      itemData.append("productId", this.state.productId);
      await this.dataSource.Get(itemData, (res) =>
        this.setState({ data: res, offset: 0, currentPage: 1 })
      );

      if (this.state.data.length > 0) {
        ReactGA.send({
          hitType: "pageview",
          page: "/buy",
          title: `Buy page and product is:${
            this.state.data[0].brandName
          }${" "} ${this.state.data[0].name}${" "}${this.state.data[0].model}`,
        });
      }
    } else {
      await this.dataSource.GetAll((res) => this.setState({ data: res }));

      if (this.state.data.length > 0) {
        ReactGA.send({
          hitType: "pageview",
          page: "/buy",
          title: "Buy page and show all products",
        });
      }
    }

    //this.setState({ data: Products });
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

  render() {
    return (
      <section className="bodyApp">
        <div className="container-fluid adverCategories-div">
          <div className="row row justify-content-center row-cols-xs row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
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
                    <p>
                      {item.totalInventory < 5 && item.totalInventory > 0 ? (
                        <span className="badge rounded-pill bg-danger text-light">
                          Only {item.totalInventory} left
                        </span>
                      ) : (
                        ""
                      )}
                    </p>
                    <h5>$ {item.price}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5">
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
        </div>
      </section>
    );
  }
}
