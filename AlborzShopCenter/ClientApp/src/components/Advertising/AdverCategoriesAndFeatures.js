import React, { Component } from "react";
import { RestDataSource } from "../RestDataSource";
import { AdverCategoriesAndFeaturesTypeEnum } from "../../Enumeration/AdverCategoriesAndFeaturesTypeEnum";
import { AdverStyleTypeEnum } from "../../Enumeration/AdverStyleTypeEnum";

//import { AdverCategoriesAndFeaturesData, Groups, Products } from "../Data";

import Modal from "react-bootstrap/Modal";
import { ModalBody } from "react-bootstrap";
import { Link } from "react-router-dom";

export class AdverCategoriesAndFeatures extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      groups: [],
      activeGroup: [],
      allProduct: [],
      products: [],
      result: "",
      formData: {
        id: 0,
        deleted: 0,
        active: 1,
        title: "",
        type: 0,
        footer: "",
        condition: 0,
        price: "",
        styleType: 0,
        adverCategoriesAndFeaturesDetails: [],
      },
      formAdverCategoriesAndFeaturesDetails: {
        id: 0,
        adverCategoriesAndFeaturesId: 0,
        deleted: 0,
        active: 1,
        groupId: 0,
        groupName: "",
        productId: 0,
        productTitle: "",
        imagePath: "",
      },
      deleteDetailsData: { id: 0 },
      deleteData: { id: 0, title: "" },
      fileUploaded: 0,
      selectFile: null,
      folderName: "",
      showSavePage: 0,
      showSaveDetailsPage: 0,
      showDeleteDetailsModal: 0,
      showDeleteModal: 0,
      fieldValidations: {
        title: true,
        type: true,
        footer: true,
        styleType: true,
        condition: true,
        price: true,
      },
      fieldDetailValidations: {
        groupId: true,
        productId: true,
        imagePath: true,
      },
      alerts: {
        show: false,
        message: "",
        className: "",
      },
      cardTitle: "New a AdverCategories and features",
      cardTitle_Details: "New a AdverCategories and features details",
    };

    this.dataSource = new RestDataSource("AdverCategoriesAndFeatures");
    this.detailsDataSource = new RestDataSource(
      "AdverCategoriesAndFeaturesDetails"
    );
    this.groupDataSource = new RestDataSource("Groups");
    this.productsDataSource = new RestDataSource("Products");
  }

  componentDidMount = () => {
    this.getData();
  };

  getData = async () => {
    await this.dataSource.GetAll((res) => this.setState({ data: res }));
    await this.groupDataSource.GetAll((res) => this.setState({ groups: res }));
    await this.productsDataSource.GetAll((res) =>
      this.setState({ allProduct: res })
    );

    await this.setState({
      activeGroup: this.state.groups.filter((i) => i.active !== 0),
    });

    // await this.setState({
    //   data: AdverCategoriesAndFeaturesData,
    //   groups: Groups,
    //   allProduct: Products,
    // });

    // await this.setState({
    //   activeGroup: this.state.groups.filter((i) => i.active !== 0),
    // });
  };

  setValues = (event) => {
    switch (event.target.name) {
      case "title":
        this.setState({
          formData: { ...this.state.formData, title: event.target.value },
        });
        break;
      case "footer":
        this.setState({
          formData: { ...this.state.formData, footer: event.target.value },
        });
        break;
      case "active":
        this.setState({
          formData: { ...this.state.formData, active: event.target.value },
        });
        break;
      case "type":
        let _type = event.target.value;
        if (
          _type == AdverCategoriesAndFeaturesTypeEnum.AdverbWithCondition ||
          _type == AdverCategoriesAndFeaturesTypeEnum.Sale_Or_SpacialDays
        ) {
          this.setState({
            formData: { ...this.state.formData, type: _type, price: "" },
          });
        } else {
          this.setState({
            formData: {
              ...this.state.formData,
              type: _type,
              condition: 0,
              price: 0,
            },
          });
        }
        break;
      case "condition":
        this.setState({
          formData: {
            ...this.state.formData,
            condition: event.target.value,
          },
        });
        break;
      case "price":
        this.setState({
          formData: { ...this.state.formData, price: event.target.value },
        });
        break;
      case "percent":
        this.setState({
          formData: {
            ...this.state.formData,
            price: event.target.value,
          },
        });
        break;
      case "styleType":
        this.setState({
          formData: { ...this.state.formData, styleType: event.target.value },
        });
        break;
    }
  };

  cancel = () => {
    this.setState({ showSavePage: 0 }, this.clear);
  };

  clear = () => {
    this.setState({
      formData: {
        id: 0,
        deleted: 0,
        active: 1,
        title: "",
        type: 0,
        footer: "",
        condition: 0,
        price: "",
        styleType: 0,
        adverCategoriesAndFeaturesDetails: [],
      },
      formAdverCategoriesAndFeaturesDetails: {
        id: 0,
        adverCategoriesAndFeaturesId: 0,
        deleted: 0,
        active: 1,
        groupId: 0,
        groupName: "",
        productId: 0,
        productTitle: "",
        imagePath: "",
      },
      fileUploaded: 0,
      selectFile: null,
      folderName: "",
      fieldValidations: {
        title: true,
        type: true,
        footer: true,
        styleType: true,
        condition: true,
        price: true,
      },
      fieldDetailValidations: {
        groupId: true,
        productId: true,
        imagePath: true,
      },
      alerts: {
        show: false,
        message: "",
        className: "",
      },
      cardTitle: "New a AdverCategories and features",
      cardTitle_Details: "New a AdverCategories and features details",
    });
  };

  cancelDetails = () => {
    this.setState({
      formAdverCategoriesAndFeaturesDetails: {
        id: 0,
        adverCategoriesAndFeaturesId: 0,
        deleted: 0,
        active: 1,
        groupId: 0,
        groupName: "",
        productId: 0,
        productTitle: "",
        imagePath: "",
      },
      fileUploaded: 0,
      selectFile: null,
      showSavePage: 1,
      showSaveDetailsPage: 0,
      fieldDetailValidations: {
        groupId: true,
        productId: true,
        imagePath: true,
      },
      alerts: {
        show: false,
        message: "",
        className: "",
      },
    });
  };

  setValuesDetails = (event) => {
    let _value = event.target.value;
    switch (event.target.name) {
      case "active":
        this.setState({
          formAdverCategoriesAndFeaturesDetails: {
            ...this.state.formAdverCategoriesAndFeaturesDetails,
            active: _value,
          },
        });
        break;
      case "groupId":
        this.setState({
          formAdverCategoriesAndFeaturesDetails: {
            ...this.state.formAdverCategoriesAndFeaturesDetails,
            groupId: _value,
            groupName:
              _value > 0
                ? document.getElementById("selectGroup").options[_value]
                    .innerHTML
                : "",
          },
          products: this.state.allProduct.filter(
            (p) => p.groupId == _value && p.active == true
          ),
        });
        break;
      case "productId":
        this.setState({
          formAdverCategoriesAndFeaturesDetails: {
            ...this.state.formAdverCategoriesAndFeaturesDetails,
            productId: _value,
            productTitle:
              _value > 0
                ? document.getElementById("selectProduct").options[
                    event.target.value
                  ].innerHTML
                : "",
          },
        });
        break;
    }
  };

  selectImage = (event) => {
    let fileLabel = document.getElementById("file-label");
    fileLabel.innerText = event.target.value
      .replace(/\\/g, "/")
      .replace(/.*\//, "");

    const _selectFile = event.target.files[0];
    let error = 0;
    let _alerts = { show: false, message: "", className: "" };

    if (_selectFile.type !== "image/png" && _selectFile.type !== "image/jpeg") {
      error++;
      document.getElementById("formFileMultiple").value = "";
      document.getElementById("btnUpload").disabled = true;
      fileLabel.innerText = "Choose file";

      _alerts = {
        show: true,
        message: "Please select a png or jpeg image file.",
        className: "alert alert-danger",
      };
    }

    this.setState({ alerts: _alerts });

    if (error == 0) {
      document.getElementById("btnUpload").disabled = false;
      this.setState({ selectFile: _selectFile });
    }
  };

  uploadFile = async () => {
    const fileData = new FormData();
    fileData.append("FileUpload", this.state.selectFile);
    fileData.append("FileName", this.state.selectFile.name);
    fileData.append("FolderName", this.state.folderName);

    await this.detailsDataSource.UploadFile(fileData, (res) =>
      this.setState({ folderName: res })
    );

    if (this.state.folderName != "00000000-0000-0000-0000-000000000000") {
      this.setState({
        fileUploaded: 1,
        formAdverCategoriesAndFeaturesDetails: {
          ...this.state.formAdverCategoriesAndFeaturesDetails,
          imagePath: `\\Images\\Advertising\\AdverCategoriesAndFeaturesDetails\\${this.state.folderName}\\${this.state.selectFile.name}`,
        },
      });
    }
  };

  removeUploadFile = async () => {
    let formData = new FormData();
    formData.append(
      "path",
      this.state.formAdverCategoriesAndFeaturesDetails.imagePath
    );

    let _alerts = { show: false, message: "", className: "" };

    await this.detailsDataSource.RemoveUploadFile(formData, (res) => {
      res == true
        ? this.setState({
            formAdverCategoriesAndFeaturesDetails: {
              ...this.state.formAdverCategoriesAndFeaturesDetails,
              imagePath: "",
            },
            fileUploaded: 0,
          })
        : (_alerts = {
            show: true,
            message: "Image can't remove",
            className: "alert alert-danger",
          });
    });

    this.setState({ alerts: _alerts });
  };

  checkValidationDetails = async () => {
    let error = 0;
    let _fieldDetailValidations = {
      groupId: true,
      productId: true,
      imagePath: true,
    };
    let _alerts = {
      show: false,
      message: "",
      className: "",
    };

    if (this.state.selectFile === null) {
      _fieldDetailValidations.imagePath = false;
      error++;
    } else if (!this.state.fileUploaded) {
      _alerts = {
        show: true,
        message: "Please uploaded a file",
        className: "alert alert-danger",
      };
      error++;
    }

    if (
      this.state.formAdverCategoriesAndFeaturesDetails.groupId == 0 ||
      this.state.formAdverCategoriesAndFeaturesDetails.groupId == ""
    ) {
      _fieldDetailValidations.groupId = false;
      error++;
    }

    if (
      this.state.formData.type ==
      AdverCategoriesAndFeaturesTypeEnum.SpacialProduct
    ) {
      if (
        this.state.formAdverCategoriesAndFeaturesDetails.productId == 0 ||
        this.state.formAdverCategoriesAndFeaturesDetails.productId == ""
      ) {
        _fieldDetailValidations.productId = false;
        error++;
      }
    }

    this.setState({
      fieldDetailValidations: _fieldDetailValidations,
      alerts: _alerts,
    });

    if (error === 0) {
      if (this.state.formAdverCategoriesAndFeaturesDetails.id === 0) {
        let _lenght =
          this.state.formData.adverCategoriesAndFeaturesDetails.length;

        if (_lenght > 0) {
          await this.setState({
            formAdverCategoriesAndFeaturesDetails: {
              ...this.state.formAdverCategoriesAndFeaturesDetails,
              id:
                this.state.formData.adverCategoriesAndFeaturesDetails[
                  _lenght - 1
                ].id + 1,
            },
          });
        } else {
          await this.setState({
            formAdverCategoriesAndFeaturesDetails: {
              ...this.state.formAdverCategoriesAndFeaturesDetails,
              id: 1,
            },
          });
        }

        this.saveNewDetails();
      } else {
        this.saveEditDetails();
      }
    }
  };

  saveNewDetails = () => {
    this.setState(
      {
        formData: {
          ...this.state.formData,
          adverCategoriesAndFeaturesDetails:
            this.state.formData.adverCategoriesAndFeaturesDetails.concat(
              this.state.formAdverCategoriesAndFeaturesDetails
            ),
        },
        showSavePage: 1,
        showSaveDetailsPage: 0,
      },
      this.cancelDetails()
    );
  };

  saveEditDetails = async () => {
    await this.setState({
      formData: {
        ...this.state.formData,
        adverCategoriesAndFeaturesDetails:
          this.state.formData.adverCategoriesAndFeaturesDetails.map((oldItem) =>
            oldItem.id === this.state.formAdverCategoriesAndFeaturesDetails.id
              ? this.state.formAdverCategoriesAndFeaturesDetails
              : oldItem
          ),
      },
      alerts: {
        show: false,
        message: "",
        className: "",
      },
    });

    await this.detailsDataSource.Update(this.state.formData, (res) =>
      this.setState(
        { showSavePage: 1, showSaveDetailsPage: 0, result: res },
        this.cancelDetails()
      )
    );
  };

  addDetails = () => {
    this.setState({
      showSavePage: 0,
      showSaveDetailsPage: 1,
      alerts: {
        show: false,
        message: "",
        className: "",
      },
    });
  };

  checkValidation = () => {
    let error = 0;
    let _fieldValidations = {
      title: true,
      type: true,
      footer: true,
      styleType: true,
      condition: true,
      price: true,
    };
    let _alerts = {
      show: false,
      message: "",
      className: "",
    };

    if (this.state.formData.title === "" || this.state.formData.title == 0) {
      _fieldValidations.title = false;
      error++;
    }

    if (this.state.formData.footer === "" || this.state.formData.footer == 0) {
      _fieldValidations.footer = false;
      error++;
    }

    if (this.state.formData.type === "" || this.state.formData.type == 0) {
      _fieldValidations.type = false;
      error++;
    }

    if (
      this.state.formData.type ==
        AdverCategoriesAndFeaturesTypeEnum.AdverbWithCondition ||
      this.state.formData.type ==
        AdverCategoriesAndFeaturesTypeEnum.Sale_Or_SpacialDays
    ) {
      if (this.state.formData.condition == 0) {
        _fieldValidations.condition = false;
        error++;
      }

      if (this.state.formData.price == "" || this.state.formData.price == 0) {
        _fieldValidations.price = false;
        error++;
      }
    }

    if (this.state.formData.styleType == "") {
      _fieldValidations.styleType = false;
      error++;
    }

    if (this.state.formData.adverCategoriesAndFeaturesDetails.length === 0) {
      _alerts = {
        show: true,
        message: "Please add details",
        className: "alert alert-danger",
      };
      error++;
    }

    this.setState({ fieldValidations: _fieldValidations, alerts: _alerts });

    if (error === 0) {
      this.save();
    }
  };

  save = async () => {
    if (this.state.formData.id === 0) {
      await this.dataSource.Insert(this.state.formData, (res) =>
        this.setState({ showSavePag: 0, showSaveDetailsPag: 0, result: res })
      );
      this.clear();
    } else {
      await this.dataSource.Update(this.state.formData, (res) =>
        this.setState({ showSavePag: 0, showSaveDetailsPag: 0, result: res })
      );
      this.clear();
    }
    window.location.reload();
  };

  checkActiveCondition = () => {
    if (
      this.state.formData.type ==
        AdverCategoriesAndFeaturesTypeEnum.AdverbWithCondition ||
      this.state.formData.type ==
        AdverCategoriesAndFeaturesTypeEnum.Sale_Or_SpacialDays
    ) {
      return true;
    } else {
      return false;
    }
  };

  checkActivePrice = () => {
    if (
      this.state.formData.type ==
      AdverCategoriesAndFeaturesTypeEnum.AdverbWithCondition
    ) {
      return true;
    } else {
      return false;
    }
  };

  checkActivePercent = () => {
    if (
      this.state.formData.type ==
      AdverCategoriesAndFeaturesTypeEnum.Sale_Or_SpacialDays
    ) {
      return true;
    } else {
      return false;
    }
  };

  editDetailData = (item) => {
    let editImg = new Image();
    editImg.src = item.imagePath;

    this.setState({
      products: this.state.allProduct.filter(
        (p) => p.groupId == item.groupId && p.active == true
      ),
      formAdverCategoriesAndFeaturesDetails: {
        id: item.id,
        adverCategoriesAndFeaturesId: item.adverCategoriesAndFeaturesId,
        deleted: item.deleted,
        active: item.active,
        groupId: item.groupId,
        groupName: item.groupName,
        productId: item.productId,
        productTitle: item.productTitle,
        imagePath: item.imagePath,
      },
      selectFile: editImg,
      fileUploaded: 1,
      showSavePage: 0,
      showSaveDetailsPage: 1,
      cardTitle_Details: "Edit AdverCategories and features details",
    });
  };

  deleteDetailsData = async () => {
    await this.detailsDataSource.Delete(
      this.state.deleteDetailsData.id,
      (res) =>
        this.setState({
          result: res,
          formData: {
            ...this.state.formData,
            adverCategoriesAndFeaturesDetails:
              this.state.formData.adverCategoriesAndFeaturesDetails.filter(
                (i) => i.id !== this.state.deleteDetailsData.id
              ),
          },
          showDeleteDetailsModal: 0,
        })
    );
  };

  editData = (item) => {
    this.setState({
      formData: {
        id: item.id,
        deleted: item.deleted,
        active: item.active,
        title: item.title,
        type: item.type,
        footer: item.footer,
        condition: item.condition,
        price: item.price,
        styleType: item.styleType,
        adverCategoriesAndFeaturesDetails:
          item.adverCategoriesAndFeaturesDetails,
      },
      showSavePage: 1,
      cardTitle: "Edit AdverCategories and features",
    });
  };

  deleteData = async () => {
    await this.dataSource.Delete(this.state.deleteData.id, (res) =>
      this.setState({
        result: res,
        data: this.state.data.filter((i) => i.id !== this.state.deleteData.id),
        showDeleteModal: 0,
      })
    );
  };

  render() {
    if (this.state.showSavePage) {
      return (
        <section className="page-input d-flex justify-content-center">
          <div className="card card-input">
            <div className="card-header cardH">
              <h1 className="card-title">{this.state.cardTitle}</h1>
            </div>
            <div className="card-body">
              <div className="row row-cols-2">
                <div className="position-relative form-group col">
                  <label>Title:</label>
                  <input
                    className="form-control"
                    name="title"
                    type="text"
                    value={this.state.formData.title}
                    onChange={this.setValues}
                    placeholder="Enter Title"
                    aria-label="Title"
                    style={
                      this.state.fieldValidations.title
                        ? { borderColor: "#ced4da" }
                        : { borderColor: "#dc3545" }
                    }
                  />
                  <div
                    className="invalid-tooltip"
                    style={{
                      display: this.state.fieldValidations.title
                        ? "none"
                        : "inline",
                    }}
                  >
                    Please fill out this field.
                  </div>
                </div>
                <div className="position-relative form-group col">
                  <label>Footer:</label>
                  <input
                    className="form-control"
                    name="footer"
                    type="text"
                    value={this.state.formData.footer}
                    onChange={this.setValues}
                    placeholder="Enter Footer"
                    aria-label="Footer"
                    style={
                      this.state.fieldValidations.footer
                        ? { borderColor: "#ced4da" }
                        : { borderColor: "#dc3545" }
                    }
                  />
                  <div
                    className="invalid-tooltip"
                    style={{
                      display: this.state.fieldValidations.footer
                        ? "none"
                        : "inline",
                    }}
                  >
                    Please fill out this field.
                  </div>
                </div>
                <div className="position-relative form-group col">
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
                  <label>Type:</label>
                  <select
                    className="form-control"
                    name="type"
                    type="number"
                    value={this.state.formData.type}
                    onChange={this.setValues}
                    aria-label="Type"
                    style={
                      this.state.fieldValidations.type
                        ? { borderColor: "#ced4da" }
                        : { borderColor: "#dc3545" }
                    }
                    disabled={
                      this.state.formData.adverCategoriesAndFeaturesDetails
                        .length == 0
                        ? false
                        : true
                    }
                  >
                    <option value=""></option>
                    <option value="1">Adverb Group</option>
                    <option value="2">Adverb With Condition</option>
                    <option value="3">Spacial Product</option>
                    <option value="4">Sale Or SpacialDays</option>
                  </select>
                  <div
                    className="invalid-tooltip"
                    style={{
                      display: this.state.fieldValidations.type
                        ? "none"
                        : "inline",
                    }}
                  >
                    Please select a valid type.
                  </div>
                </div>
                <div
                  className="position-relative form-group col"
                  style={{ display: this.checkActiveCondition() ? "" : "none" }}
                >
                  <label>Condition:</label>
                  <select
                    className="form-control"
                    name="condition"
                    id="selectCondition"
                    type="number"
                    value={this.state.formData.condition}
                    onChange={this.setValues}
                    aria-label="Condition"
                    style={
                      this.state.fieldValidations.condition
                        ? { borderColor: "#ced4da" }
                        : { borderColor: "#dc3545" }
                    }
                  >
                    <option value=""></option>
                    <option value="1">{"<"}</option>
                    <option value="2">{">"}</option>
                    <option value="3">{"="}</option>
                  </select>
                  <div
                    className="invalid-tooltip"
                    style={{
                      display: this.state.fieldValidations.condition
                        ? "none"
                        : "inline",
                    }}
                  >
                    Please select a valid condition.
                  </div>
                </div>
                <div
                  className="position-relative form-group col"
                  style={{ display: this.checkActivePrice() ? "" : "none" }}
                >
                  <label>Price:</label>
                  <div className="input-group">
                    <input
                      name="price"
                      id="txtPrice"
                      type="number"
                      className="form-control"
                      value={this.state.formData.price}
                      onChange={this.setValues}
                      aria-label="Amount (to the nearest dollar)"
                      placeholder="Enter Price"
                      style={
                        this.state.fieldValidations.price
                          ? { borderColor: "#ced4da" }
                          : { borderColor: "#dc3545" }
                      }
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">$</span>
                      <span className="input-group-text">0.00</span>
                    </div>
                    <div
                      className="invalid-tooltip"
                      style={{
                        display: this.state.fieldValidations.price
                          ? "none"
                          : "inline",
                      }}
                    >
                      Please select a valid price.
                    </div>
                  </div>
                </div>
                <div
                  className="position-relative form-group col"
                  style={{ display: this.checkActivePercent() ? "" : "none" }}
                >
                  <label>Percent:</label>
                  <div className="input-group">
                    <input
                      name="percent"
                      type="number"
                      className="form-control"
                      value={this.state.formData.price}
                      onChange={this.setValues}
                      aria-label="Percent"
                      placeholder="Enter Percent"
                      style={
                        this.state.fieldValidations.price
                          ? { borderColor: "#ced4da" }
                          : { borderColor: "#dc3545" }
                      }
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">%</span>
                    </div>
                    <div
                      className="invalid-tooltip"
                      style={{
                        display: this.state.fieldValidations.price
                          ? "none"
                          : "inline",
                      }}
                    >
                      Please select a valid percent.
                    </div>
                  </div>
                </div>

                <div className="position-relative form-group col">
                  <label>Style Type:</label>
                  <select
                    className="form-control"
                    name="styleType"
                    type="number"
                    value={this.state.formData.styleType}
                    onChange={this.setValues}
                    aria-label="Style Type"
                    style={
                      this.state.fieldValidations.styleType
                        ? { borderColor: "#ced4da" }
                        : { borderColor: "#dc3545" }
                    }
                  >
                    <option value=""></option>
                    <option value="1">Single</option>
                    <option value="2">Double Row</option>
                    <option value="3">Double Row-Double Col</option>
                    <option value="4">Top Single Row-Bottom Third Col</option>
                  </select>
                  <div
                    className="invalid-tooltip"
                    style={{
                      display: this.state.fieldValidations.styleType
                        ? "none"
                        : "inline",
                    }}
                  >
                    Please select a valid type.
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="btn btn-primary"
                  aria-label="Add Details"
                  id="btnAddDetails"
                  name="addDetails"
                  disabled={this.state.formData.type == 0 ? true : false}
                  onClick={this.addDetails}
                >
                  Add Details
                </button>
              </div>
              <div className="mt-4">
                <table className="table table-sm table-striped table-bordered">
                  <thead>
                    <tr>
                      <th
                        colSpan="5"
                        className="table-header text-center h4 p-2"
                      >
                        Adver Categories And Features Details
                      </th>
                    </tr>
                    <tr className="table-title">
                      <th>Active</th>
                      <th>Group Name</th>
                      <th>Product</th>
                      <th>Image Name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.formData.adverCategoriesAndFeaturesDetails.map(
                      (ad) => (
                        <tr key={ad.id}>
                          <td>{ad.active == 1 ? "True" : "False"}</td>
                          <td>{ad.groupName}</td>
                          <td>{ad.productTitle}</td>
                          <td>
                            {ad.imagePath
                              .replace(/\\/g, "/")
                              .replace(/.*\//, "")}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-warning m-1"
                              onClick={() => this.editDetailData(ad)}
                            >
                              Edit
                            </button>
                            <button
                              className="delete button btn btn-sm btn-danger m-1"
                              onClick={() =>
                                this.setState({
                                  showDeleteDetailsModal: 1,
                                  deleteDetailsData: { id: ad.id },
                                })
                              }
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
                <Modal show={this.state.showDeleteDetailsModal}>
                  <Modal.Header>
                    <h5>Delete Item</h5>
                    <button
                      type="button"
                      className="btn btn-danger close"
                      onClick={() =>
                        this.setState({ showDeleteDetailsModal: 0 })
                      }
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
                      onClick={() =>
                        this.setState({ showDeleteDetailsModal: 0 })
                      }
                    >
                      No
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.deleteDetailsData}
                    >
                      Yes
                    </button>
                  </Modal.Footer>
                </Modal>
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
            </div>
            <div className="card-footer text-center cardF">
              <button
                className="btn btn-primary mr-1"
                aria-label="Save"
                onClick={this.checkValidation}
              >
                Save
              </button>
              <button
                className="btn btn-secondary"
                aria-label="Cancel"
                onClick={this.cancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </section>
      );
    } else if (this.state.showSaveDetailsPage) {
      return (
        <section className="page-input d-flex justify-content-center">
          <div className="card card-input">
            <div className="card-header cardH">
              <h1 className="card-title">{this.state.cardTitle_Details}</h1>
            </div>
            <div className="card-body">
              <div className="row row-cols-2">
                <div className="position-relative form-group col">
                  <label>Group:</label>
                  <select
                    className="form-control"
                    name="groupId"
                    type="number"
                    id="selectGroup"
                    value={
                      this.state.formAdverCategoriesAndFeaturesDetails.groupId
                    }
                    onChange={this.setValuesDetails}
                    aria-label="Group"
                    style={
                      this.state.fieldDetailValidations.groupId
                        ? { borderColor: "#ced4da" }
                        : { borderColor: "#dc3545" }
                    }
                  >
                    <option value=""></option>
                    {this.state.activeGroup.map((i) => (
                      <option value={i.id}>{i.name}</option>
                    ))}
                  </select>
                  <div
                    className="invalid-tooltip"
                    style={{
                      display: this.state.fieldDetailValidations.groupId
                        ? "none"
                        : "inline",
                    }}
                  >
                    Please select a valid group.
                  </div>
                </div>
                <div
                  className="position-relative form-group col"
                  style={{
                    display:
                      this.state.formData.type !=
                      AdverCategoriesAndFeaturesTypeEnum.SpacialProduct
                        ? "none"
                        : "",
                  }}
                >
                  <label>Product:</label>
                  <select
                    className="form-control"
                    name="productId"
                    id="selectProduct"
                    type="number"
                    value={
                      this.state.formAdverCategoriesAndFeaturesDetails.productId
                    }
                    onChange={this.setValuesDetails}
                    aria-label="Product"
                    style={
                      this.state.fieldDetailValidations.productId
                        ? { borderColor: "#ced4da" }
                        : { borderColor: "#dc3545" }
                    }
                  >
                    <option value=""></option>
                    {this.state.products.map((i) => (
                      <option value={i.id}>
                        {i.name} {i.model}
                      </option>
                    ))}
                  </select>
                  <div
                    className="invalid-tooltip"
                    style={{
                      display: this.state.fieldDetailValidations.productId
                        ? "none"
                        : "inline",
                    }}
                  >
                    Please select a valid product.
                  </div>
                </div>
                <div className="position-relative form-group col">
                  <label>Active:</label>
                  <select
                    className="form-control"
                    name="active"
                    type="number"
                    value={
                      this.state.formAdverCategoriesAndFeaturesDetails.active
                    }
                    onChange={this.setValuesDetails}
                    aria-label="Active"
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="row row-cols-2">
                <div
                  className="position-relative form-group col"
                  style={{
                    display: this.state.fileUploaded == 1 ? "none" : "",
                  }}
                >
                  <label>Add Image:</label>
                  <div className="custom-file">
                    <input
                      class="custom-file-input"
                      type="file"
                      id="formFileMultiple"
                      accept=".jpg,.png"
                      onChange={this.selectImage}
                    />
                    <label
                      className="custom-file-label"
                      id="file-label"
                      for="formFileMultiple"
                      style={
                        this.state.fieldDetailValidations.imagePath
                          ? { borderColor: "#ced4da" }
                          : { borderColor: "#dc3545" }
                      }
                    >
                      Choose file
                    </label>
                    <div
                      className="invalid-tooltip"
                      style={{
                        display: this.state.fieldDetailValidations.imagePath
                          ? "none"
                          : "inline",
                      }}
                    >
                      Please select a image
                    </div>
                  </div>
                  <button
                    className="btn btn-primary m-1"
                    name="upload"
                    id="btnUpload"
                    onClick={this.uploadFile}
                    disabled={this.state.selectFile == null ? true : false}
                  >
                    Upload
                  </button>
                </div>
              </div>
              <div
                className="row position-relative form-group col"
                style={{
                  display: this.state.fileUploaded == 0 ? "none" : "",
                }}
              >
                <label>Images Uploaded:</label>
                <div>
                  <figure className="figure">
                    <button
                      type="button"
                      className="btn btn-danger close"
                      onClick={this.removeUploadFile}
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <img
                      className="figure-img img-thumbnail rounded"
                      alt="art"
                      src={
                        this.state.formAdverCategoriesAndFeaturesDetails
                          .imagePath
                      }
                    />
                  </figure>
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
            </div>
            <div className="card-footer text-center cardF">
              <button
                className="btn btn-primary mr-1"
                aria-label="Save Details"
                onClick={this.checkValidationDetails}
              >
                Save Details
              </button>
              <button
                className="btn btn-secondary"
                aria-label="Cancel Details"
                onClick={this.cancelDetails}
              >
                Cancel Details
              </button>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <section className="bodyApp container-fluid adverCategories-div">
          <div className="row row justify-content-center row-cols-xs row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
            {this.state.data.map((i) => (
              <div class="col-auto d-flex mb-4">
                <div className="card public-card">
                  <div className="card-body">
                    <h5 className="card-title">{i.title}</h5>

                    {i.styleType == AdverStyleTypeEnum.Single ? (
                      <div>
                        {i.adverCategoriesAndFeaturesDetails.map(
                          (value, index) =>
                            index < 1 ? (
                              <div className="col-height">
                                <Link
                                  to={`/buy/?gNum=${value.groupId}?pNum=${value.productId}`}
                                >
                                  <img
                                    src={value.imagePath}
                                    style={{ width: "100%", height: "100%" }}
                                  />
                                </Link>
                              </div>
                            ) : (
                              ""
                            )
                        )}
                      </div>
                    ) : (
                      ""
                    )}

                    {i.styleType == AdverStyleTypeEnum.DoubleRow
                      ? i.adverCategoriesAndFeaturesDetails.map(
                          (value, index) =>
                            index < 2 ? (
                              <div className="row">
                                <div className="col">
                                  <Link
                                    to={`/buy/?gNum=${value.groupId}?pNum=${value.productId}`}
                                  >
                                    <img
                                      src={value.imagePath}
                                      className="card-img-top"
                                    />
                                  </Link>
                                  <label>{value.groupName}</label>
                                </div>
                              </div>
                            ) : (
                              ""
                            )
                        )
                      : ""}

                    {i.styleType == AdverStyleTypeEnum.DoubleRow_DoubleCol ? (
                      <div className="row row-cols-2">
                        {i.adverCategoriesAndFeaturesDetails.map(
                          (value, index) =>
                            index < 4 ? (
                              <div className="col">
                                <Link
                                  to={`/buy/?gNum=${value.groupId}?pNum=${value.productId}`}
                                >
                                  <img
                                    src={value.imagePath}
                                    className="card-img-top"
                                  />
                                </Link>
                                <label>{value.groupName}</label>
                              </div>
                            ) : (
                              ""
                            )
                        )}
                      </div>
                    ) : (
                      ""
                    )}

                    {i.styleType ==
                    AdverStyleTypeEnum.TopSingleRow_BottomThirdCol ? (
                      <div className="row-xs rox-sm row-md row-lg row-xl">
                        <div className="row">
                          {i.adverCategoriesAndFeaturesDetails.map(
                            (value, index) =>
                              index < 1 ? (
                                <div className="col">
                                  <Link
                                    to={`/buy/?gNum=${value.groupId}?pNum=${value.productId}`}
                                  >
                                    <img
                                      src={value.imagePath}
                                      className="card-img-top"
                                    />
                                  </Link>
                                  <label>{value.groupName}</label>
                                </div>
                              ) : (
                                ""
                              )
                          )}
                        </div>
                        <div className="row row-cols-3">
                          {i.adverCategoriesAndFeaturesDetails.map(
                            (value, index) =>
                              index > 0 && index < 4 ? (
                                <div className="col">
                                  <Link
                                    to={`/buy/?gNum=${value.groupId}?pNum=${value.productId}`}
                                  >
                                    <img
                                      src={value.imagePath}
                                      className="card-img-top"
                                    />
                                  </Link>
                                  <label>{value.groupName}</label>
                                </div>
                              ) : (
                                ""
                              )
                          )}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="container mb-3">
                    <Link to={`/advertising/adverDetails/?adverNum=${i.id}`}>
                      {i.footer}
                    </Link>
                    <div className="mt-2">
                      <button
                        className="btn btn-warning mr-2"
                        onClick={() => this.editData(i)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          this.setState({
                            showDeleteModal: 1,
                            deleteData: { id: i.id, title: i.title },
                          })
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Modal show={this.state.showDeleteModal}>
            <Modal.Header>
              <h5>Delete {this.state.deleteData.title}</h5>
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
                onClick={this.deleteData}
              >
                Yes
              </button>
            </Modal.Footer>
          </Modal>
          <div className="mt-4">
            <button
              className="btn btn-primary"
              aria-label="Add"
              onClick={() => this.setState({ showSavePage: 1 })}
            >
              Add
            </button>
          </div>
        </section>
      );
    }
  }
}
