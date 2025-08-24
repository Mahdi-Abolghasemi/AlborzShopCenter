import React, { Component } from "react";
import {
  Trash,
  Plus,
  Dash,
  ChevronCompactLeft,
  ChevronCompactRight,
} from "react-bootstrap-icons";
import { v4 } from "uuid";
import { RestDataSource } from "./RestDataSource";
import { Carousel, initMDB } from "mdb-ui-kit";
import { ProductSizeTypeEnum } from "../Enumeration/ProductSizeTypeEnum";
import { AdverCategoriesAndFeaturesTypeEnum } from "../Enumeration/AdverCategoriesAndFeaturesTypeEnum";
import ReactGA from "react-ga4";

//import { Products, AdverCategoriesAndFeaturesData } from "./Data";

export class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: "",
      divNumber: false,
      lblColor: false,
      lblSize: false,
      iconDash: false,
      btnAddToList: true,
      iconTrash: true,
      pNum: document.location.href
        .split("?")[1]
        .replace(/%20/g, "")
        .replace(/pNum=/g, ""),
      selectedColorId: [],
      selectedSizeId: [],
      data: [],
      formData: {
        id: "",
        productId: 0,
        color: "",
        number: 1,
        colorId: "",
        size: "",
        sizeId: "",
        inventory: 0,
      },
      sizeForColor: [],
      adverCategoriesAndFeaturesData: [],
      saleData: { hasSale: false, price: 0, type: 0 },
      oldPrice: 0,
    };

    this.dataSource = new RestDataSource("Products");
    this.adverFeaturesDataSource = new RestDataSource(
      "AdverCategoriesAndFeatures"
    );
  }

  componentDidMount = () => {
    this.getData();
  };

  getData = async () => {
    let itemData = new FormData();
    itemData.append("productId", this.state.pNum);
    await this.dataSource.Get(itemData, (res) =>
      res.length > 0 ? this.setState({ item: res[0] }, this.checkCart) : ""
    );

    await this.adverFeaturesDataSource.GetAll((res) =>
      this.setState({ adverCategoriesAndFeaturesData: res })
    );

    await this.setState({
      adverCategoriesAndFeaturesData:
        this.state.adverCategoriesAndFeaturesData.filter(
          (i) =>
            i.active !== 0 &&
            (i.type == AdverCategoriesAndFeaturesTypeEnum.AdverbWithCondition ||
              i.type == AdverCategoriesAndFeaturesTypeEnum.Sale_Or_SpacialDays)
        ),
    });

    //****************************************************************** */
    // await this.setState({ item: Products[0] }, this.checkCart);

    // await this.setState({
    //   adverCategoriesAndFeaturesData: AdverCategoriesAndFeaturesData.filter(
    //     (i) =>
    //       i.active != 0 &&
    //       (i.type == AdverCategoriesAndFeaturesTypeEnum.AdverbWithCondition ||
    //         i.type == AdverCategoriesAndFeaturesTypeEnum.Sale_Or_SpacialDays)
    //   ),
    // });
    //****************************************************************** */

    if (this.state.adverCategoriesAndFeaturesData.length > 0) {
      ReactGA.send({
        hitType: "pageview",
        page: "/buy/detail",
        title: `Detail page and product is:${this.state.item.brandName}${" "} ${
          this.state.item.name
        }${" "}${this.state.item.model}`,
      });

      let _adverCategoriesAndFeaturesData =
        this.state.adverCategoriesAndFeaturesData;

      let _saleData = { hasSale: false, price: 0, type: 0 };

      await _adverCategoriesAndFeaturesData.map((i) =>
        i.adverCategoriesAndFeaturesDetails.map((j) =>
          j.active == 1 && j.groupId == this.state.item.groupId
            ? (_saleData = {
                hasSale: true,
                price: i.price,
                type: i.type,
              })
            : ""
        )
      );

      if (_saleData.hasSale) {
        let _oldPrice = this.state.item.price;
        let _newPrice = 0;

        if (
          _saleData.type ==
          AdverCategoriesAndFeaturesTypeEnum.Sale_Or_SpacialDays
        ) {
          _newPrice =
            this.state.item.price -
            (this.state.item.price * _saleData.price) / 100;
        } else {
          _newPrice = this.state.item.price - _saleData.price;
        }

        await this.setState({
          saleData: _saleData,
          oldPrice: _oldPrice,
          item: { ...this.state.item, price: _newPrice },
        });
      }
    }
  };

  checkCart = async () => {
    if (this.props.orders.length > 0) {
      const colorState = this.props.orders.filter(
        (j) => j.productId === this.state.item.id
      );

      for (let i = 0; i < colorState.length; i++) {
        await this.setState({
          selectedColorId: this.state.selectedColorId.concat(
            colorState[i].colorId
          ),
        });
      }

      if (this.state.item.hasSize) {
        for (let i = 0; i < colorState.length; i++) {
          await this.setState({
            selectedSizeId: this.state.selectedSizeId.concat(
              colorState[i].sizeId
            ),
          });
        }
      }

      for (let i = 0; i < colorState.length; i++) {
        await this.setState({
          formData: {
            id: colorState[i].id,
            productId: colorState[i].productId,
            color: colorState[i].color,
            number: colorState[i].number,
            colorId: colorState[i].colorId,
            size: colorState[i].size,
            sizeId: colorState[i].sizeId,
            inventory: colorState[i].inventory,
          },
        });

        await this.setState({
          data: this.state.data.concat(this.state.formData),
        });
      }

      await this.clear();
    }

    initMDB({ Carousel });
  };

  selectColor = async (_colorId, _value, _inventory, _price) => {
    this.state.item.colors.map(
      (value) => (document.getElementById(value.id).style.border = "none")
    );
    document.getElementById(_colorId).style.border = "3px solid green";
    await this.clear();

    if (!this.state.item.hasSize) {
      if (this.state.saleData.hasSale) {
        let _oldPrice = _price;
        let _newPrice = 0;

        if (
          this.state.saleData.type ==
          AdverCategoriesAndFeaturesTypeEnum.Sale_Or_SpacialDays
        ) {
          _newPrice = _price - (_price * this.state.saleData.price) / 100;
        } else {
          _newPrice = _price - this.state.saleData.price;
        }

        await this.setState({
          oldPrice: _oldPrice,
          item: { ...this.state.item, price: _newPrice },
        });
      } else {
        this.setState({ item: { ...this.state.item, price: _price } });
      }

      if (!this.state.selectedColorId.includes(_colorId)) {
        await this.setState({
          formData: {
            id: v4(),
            productId: this.state.item.id,
            color: _value,
            number: this.state.formData.number,
            colorId: _colorId,
            inventory: _inventory,
          },
        });

        this.setState({ divNumber: false, btnAddToList: true });
      } else {
        await this.state.data.map((i) =>
          i.colorId === _colorId
            ? this.setState({
                formData: {
                  id: i.id,
                  productId: i.productId,
                  color: i.color,
                  number: i.number,
                  colorId: i.colorId,
                  inventory: i.inventory,
                },
              })
            : ""
        );
        this.setState({
          divNumber: true,
          btnAddToList: false,
          lblColor: false,
        });
      }

      if (this.state.formData.number > 1) {
        this.setState({ iconDash: true, iconTrash: false });
      } else {
        this.setState({ iconDash: false, iconTrash: true });
      }
    } else {
      await this.setState({
        formData: {
          ...this.state.formData,
          color: _value,
          colorId: _colorId,
        },
        sizeForColor: this.state.item.sizes.filter(
          (i) => i.colorId === _colorId
        ),
      });

      if (this.state.item.sizeType == ProductSizeTypeEnum.little_choice) {
        this.state.sizeForColor.map(
          (i) =>
            (document.getElementById(`btn${i.id}`).className =
              "btn btn-outline-primary mr-1")
        );
      } else {
        document.getElementById("slcSizeForColor").value = "";
      }
    }
  };

  clear = () => {
    this.setState({
      formData: {
        id: "",
        productId: 0,
        color: "",
        number: 1,
        colorId: "",
        size: "",
        sizeId: "",
        inventory: 0,
      },
      divNumber: false,
      lblColor: false,
      lblSize: false,
      iconDash: false,
      btnAddToList: true,
      iconTrash: true,
    });
  };

  checkValidation = async () => {
    if (this.state.formData.colorId === "") {
      this.setState({ lblColor: true });
    } else if (this.state.item.hasSize && this.state.formData.sizeId === "") {
      this.setState({ lblSize: true, lblColor: false });
    } else {
      this.setState({
        divNumber: true,
        lblColor: false,
        lblSize: false,
        btnAddToList: false,
      });

      if (this.state.item.hasSize) {
        await this.setState({
          selectedSizeId: this.state.selectedSizeId.concat(
            this.state.formData.sizeId
          ),
        });
      }

      await this.setState(
        {
          data: this.state.data.concat(this.state.formData),
          selectedColorId: this.state.selectedColorId.concat(
            this.state.formData.colorId
          ),
        },
        this.props.onNewOrder(
          this.state.formData.id,
          this.state.formData.productId,
          this.state.item.name,
          this.state.item.model,
          this.state.item.brandName,
          `Images\\Products\\${this.state.item.folderName}\\${this.state.item.images[0]}`,
          this.state.formData.color,
          this.state.formData.colorId,
          this.state.formData.size,
          this.state.formData.sizeId,
          this.state.item.price,
          this.state.formData.inventory,
          this.state.item.totalInventory
        )
      );
    }
  };

  plusValue = async () => {
    await this.setState({
      formData: {
        ...this.state.formData,
        number: this.state.formData.number + 1,
      },
    });

    await this.setState(
      {
        data: this.state.data.map((i) =>
          i.id === this.state.formData.id ? this.state.formData : i
        ),
      },
      this.props.onEditOrder(
        this.state.formData.id,
        this.state.formData.number,
        this.state.item.price
      )
    );

    this.setState({ iconDash: true, iconTrash: false });
  };

  minusValue = async () => {
    await this.setState({
      formData: {
        ...this.state.formData,
        number: this.state.formData.number - 1,
      },
    });

    if (this.state.formData.number < 2) {
      this.setState({ iconDash: false, iconTrash: true });
    }

    if (this.state.formData.number === 0) {
      this.setState({ divNumber: false, btnAddToList: true });
      document.getElementById(this.state.formData.colorId).style.border =
        "none";

      if (this.state.item.hasSize) {
        await this.setState({
          selectedSizeId: this.state.selectedSizeId.filter(
            (i) => i !== this.state.formData.sizeId
          ),
        });
      } else {
        await this.setState({
          selectedColorId: this.state.selectedColorId.filter(
            (i) => i !== this.state.formData.colorId
          ),
        });
      }

      await this.setState(
        {
          data: this.state.data.filter((i) => i.id !== this.state.formData.id),
        },
        this.props.onDeleteOrder(this.state.formData.id)
      );

      await this.clear();
    } else {
      await this.setState(
        {
          data: this.state.data.map((i) =>
            i.id === this.state.formData.id ? this.state.formData : i
          ),
        },
        this.props.onEditOrder(
          this.state.formData.id,
          this.state.formData.number,
          this.state.item.price
        )
      );
    }
  };

  selectSize = async (_sizeId, _size, _inventory, _price) => {
    if (this.state.saleData.hasSale) {
      let _oldPrice = _price;
      let _newPrice = 0;

      if (
        this.state.saleData.type ==
        AdverCategoriesAndFeaturesTypeEnum.Sale_Or_SpacialDays
      ) {
        _newPrice = _price - (_price * this.state.saleData.price) / 100;
      } else {
        _newPrice = _price - this.state.saleData.price;
      }

      await this.setState({
        oldPrice: _oldPrice,
        item: { ...this.state.item, price: _newPrice },
      });
    } else {
      this.setState({ item: { ...this.state.item, price: _price } });
    }

    if (this.state.item.sizeType == ProductSizeTypeEnum.little_choice) {
      this.state.sizeForColor.map(
        (i) =>
          (document.getElementById(`btn${i.id}`).className =
            "btn btn-outline-primary mr-1")
      );
      document.getElementById(`btn${_sizeId}`).className =
        "btn btn-primary mr-1";
    }

    let _color = this.state.formData.color;
    let _colorId = this.state.formData.colorId;
    await this.clear();

    if (!this.state.selectedSizeId.includes(_sizeId)) {
      await this.setState({
        formData: {
          ...this.state.formData,
          id: v4(),
          productId: this.state.item.id,
          number: this.state.formData.number,
          color: _color,
          colorId: _colorId,
          size: _size,
          sizeId: _sizeId,
          inventory: _inventory,
        },
      });

      this.setState({ divNumber: false, btnAddToList: true });
    } else {
      await this.state.data.map((i) =>
        i.sizeId === _sizeId
          ? this.setState({
              formData: {
                id: i.id,
                productId: i.productId,
                color: i.color,
                number: i.number,
                colorId: i.colorId,
                size: i.size,
                sizeId: i.sizeId,
                inventory: i.inventory,
              },
            })
          : ""
      );

      if (this.state.formData.sizeId === _sizeId) {
        this.setState({ divNumber: true, btnAddToList: false, lblSize: false });
      } else {
        this.setState({ divNumber: false, btnAddToList: true, lblSize: false });
      }

      if (this.state.formData.number > 1) {
        this.setState({ iconDash: true, iconTrash: false });
      } else {
        this.setState({ iconDash: false, iconTrash: true });
      }
    }
  };

  selectSizeOfList = (event) => {
    this.state.sizeForColor.map((i) =>
      i.id == event.target.value
        ? this.selectSize(i.id, i.title, i.inventory, i.price)
        : ""
    );
  };

  render() {
    return this.state.item !== "" ? (
      <div className="bodyApp product-div">
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-3 detail-div">
              <div className="card-body">
                <h4 className="card-title mb-4">
                  {this.state.item.brandName} {this.state.item.name}{" "}
                  {this.state.item.model}
                </h4>

                <div className="m-2">{this.state.item.shopName} Shop</div>
                <div className="m-2">
                  {this.state.saleData.hasSale ? (
                    <div>
                      <del>$ {this.state.oldPrice}</del>
                      <h5>$ {this.state.item.price}</h5>
                    </div>
                  ) : (
                    <h5>$ {this.state.item.price}</h5>
                  )}
                </div>
              </div>
            </div>
            {/* **************************************************************************************** */}
            <div className="card mb-3 detail-div">
              <div className="card-body text-secondary">
                <div className="form-group position-relative">
                  <div>
                    {this.state.item.colors.map((value, index) => (
                      <label
                        className="label-circle"
                        id={value.id}
                        key={index}
                        style={{
                          backgroundColor: `${value.color}`,
                          display: value.inventory > 0 ? "compact" : "none",
                        }}
                        onClick={() =>
                          this.selectColor(
                            value.id,
                            value.color,
                            value.inventory,
                            value.price
                          )
                        }
                      ></label>
                    ))}
                  </div>
                  <div
                    className="invalid-tooltip"
                    style={{
                      display: this.state.lblColor ? "inline" : "none",
                    }}
                  >
                    Please select a color.
                  </div>
                </div>

                {this.state.item.hasSize == 1 ? (
                  <div className="form-group position-relative">
                    <div>
                      {this.state.item.sizeType ==
                      ProductSizeTypeEnum.little_choice
                        ? this.state.sizeForColor.map((i) => (
                            <button
                              className="btn btn-outline-primary mr-1"
                              id={`btn${i.id}`}
                              style={{
                                display: i.inventory > 0 ? "compact" : "none",
                              }}
                              onClick={() =>
                                this.selectSize(
                                  i.id,
                                  i.title,
                                  i.inventory,
                                  i.price
                                )
                              }
                            >
                              {i.title}
                            </button>
                          ))
                        : ""}

                      {this.state.item.sizeType ==
                      ProductSizeTypeEnum.Lots_of_choice ? (
                        <select
                          className="form-control"
                          id="slcSizeForColor"
                          onChange={this.selectSizeOfList}
                        >
                          <option value=""></option>
                          {this.state.sizeForColor.map((i) =>
                            i.inventory > 0 ? (
                              <option value={i.id}>{i.title}</option>
                            ) : (
                              ""
                            )
                          )}
                        </select>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className="invalid-tooltip"
                      style={{
                        display: this.state.lblSize ? "inline" : "none",
                      }}
                    >
                      Please select a size.
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <p>
                  {this.state.item.totalInventory < 5 &&
                  this.state.item.totalInventory > 0 ? (
                    <div className="badge rounded-pill bg-danger text-light">
                      Only {this.state.item.totalInventory} left
                    </div>
                  ) : (
                    ""
                  )}
                </p>

                {this.state.divNumber ? (
                  <div className="form-group" id="divNumber">
                    <div className="input-group">
                      <div className="input-group-prepend" id="divDash">
                        <button
                          className="btn btn-outline-primary"
                          type="button"
                          onClick={this.minusValue}
                        >
                          {this.state.iconTrash ? <Trash id="iconTrash" /> : ""}
                          {this.state.iconDash ? <Dash id="iconDash" /> : ""}
                        </button>
                      </div>
                      <label className="form-control text-center">
                        {this.state.formData.number}
                      </label>
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-primary"
                          type="button"
                          onClick={this.plusValue}
                          disabled={
                            this.state.formData.number <
                            this.state.formData.inventory
                              ? false
                              : true
                          }
                        >
                          <Plus />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {this.state.item.totalInventory > 0 &&
                this.state.item.active ? (
                  this.state.btnAddToList ? (
                    <button
                      className="btn btn-primary"
                      id="btnAddToList"
                      name="addToList"
                      aria-label="Add to list"
                      onClick={this.checkValidation}
                    >
                      Add to list
                    </button>
                  ) : (
                    ""
                  )
                ) : (
                  <div>
                    <p className="bg-secondary text-white text-center">
                      Unavailable
                    </p>
                    <span>This product is not available.</span>
                  </div>
                )}
              </div>
            </div>
            {/* ******************************************************************************** */}
            <div className="card mb-3 detail-div">
              <div className="card-body">
                <table className="table table-borderless">
                  <tbody>
                    {this.state.item.attributes.map((i) => (
                      <tr key={i.id}>
                        <td className="text-secondary">{i.title}</td>
                        <td>{i.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="mb-5">
              <div
                id="carouselExampleCaptions"
                class="carousel slide"
                data-mdb-ride="carousel"
                data-mdb-carousel-init
              >
                <ol class="carousel-indicators">
                  {this.state.item.images.map((value, index) => (
                    <li
                      data-mdb-target="#carouselExampleCaptions"
                      data-mdb-slide-to={index}
                      className={index === 0 ? "active" : ""}
                      aria-current={index === 0 ? "true" : "false"}
                      aria-label={`Slide${index}`}
                    ></li>
                  ))}
                </ol>
                <div className="carousel-inner detail-div">
                  {this.state.item.images.map((v, i) => (
                    <div
                      className={`carousel-item ${i === 0 ? "active" : ""}`}
                      data-mdb-interval="4000"
                    >
                      <div>
                        <img
                          src={`Images\\Products\\${this.state.item.folderName}\\${v}`}
                          className="d-block w-100"
                          alt="Wild Landscape"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-mdb-target="#carouselExampleCaptions"
                  data-mdb-slide="prev"
                >
                  <h1 style={{ color: "black" }}>
                    <ChevronCompactLeft />
                  </h1>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-mdb-target="#carouselExampleCaptions"
                  data-mdb-slide="next"
                >
                  <h1 style={{ color: "black" }}>
                    <ChevronCompactRight />
                  </h1>
                </button>
              </div>
            </div>

            <div className="card mb-3 detail-div">
              <div className="card-body">
                <p>{this.state.item.descriptions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      ""
    );
  }
}
