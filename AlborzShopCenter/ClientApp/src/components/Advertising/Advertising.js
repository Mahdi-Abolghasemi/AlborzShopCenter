import React, { Component } from "react";
import { RestDataSource } from "../RestDataSource";
import Modal from "react-bootstrap/Modal";
import { ModalBody } from "react-bootstrap";
import { Carousel, initMDB } from "mdb-ui-kit";
import {
  Trash,
  Pencil,
  ChevronCompactLeft,
  ChevronCompactRight,
} from "react-bootstrap-icons";
import MovingText from "react-moving-text";

//import { advertising } from "../Data";

export class Advertising extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      result: "",
      selectFile: null,
      fileUploaded: false,
      formData: {
        id: 0,
        imagesName: "",
        linkPath: "",
        deleted: 0,
        active: 1,
        hasCaption: 0,
        title: "",
        description: "",
        captionStyle: {
          value: 0,
          code: "justify-content-center carousel-caption-b",
          color: "#000000",
        },
        hasTag: 0,
        tagTitle: "",
        tagText: "",
        tagStyle: {
          value: 0,
          code: "justify-content-center tag-b",
          backgroundColor: "#000000",
          fontColor: "#000000",
        },
      },
      showDeleteModal: 0,
      deleteData: { id: "", imagesName: "" },
      showSavePage: 0,
      fieldValidations: { formFileMultiple: true },
      alerts: {
        show: false,
        message: "",
        className: "",
      },
      cardTitle: "New a advertising",
    };

    this.dataSource = new RestDataSource("Advertising");
  }

  componentDidMount = () => {
    this.getData();
  };

  getData = async () => {
    await this.dataSource.GetAll((res) => this.setState({ data: res }));
    //this.setState({ data: advertising });
    initMDB({ Carousel });
  };

  setValues = (event) => {
    switch (event.target.name) {
      case "linkPath":
        this.setState({
          formData: {
            ...this.state.formData,
            linkPath: event.target.value,
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
      case "hasCaption":
        this.setState({
          formData: {
            ...this.state.formData,
            hasCaption: event.target.value,
          },
        });
        if (event.target.value == 1) {
          document.getElementById("txtTitle").disabled = false;
          document.getElementById("txtDescription").disabled = false;
          document.getElementById("slcCaptionPlace").disabled = false;
          document.getElementById("colorPicker").disabled = false;
          document.getElementById("btnSelect").style.display = "inline";
        } else {
          document.getElementById("colorPicker").value = "#000000";

          document.getElementById("txtTitle").disabled = true;
          document.getElementById("txtDescription").disabled = true;
          document.getElementById("slcCaptionPlace").disabled = true;
          document.getElementById("colorPicker").disabled = true;
          document.getElementById("btnSelect").style.display = "none";

          this.setState({
            formData: {
              ...this.state.formData,
              title: "",
              description: "",
              captionStyle: {
                value: 0,
                code: "justify-content-center carousel-caption-b",
                color: "#000000",
              },
            },
          });
        }
        break;
      case "title":
        this.setState({
          formData: {
            ...this.state.formData,
            title: event.target.value,
          },
        });
        break;
      case "description":
        this.setState({
          formData: {
            ...this.state.formData,
            description: event.target.value,
          },
        });
        break;
      case "hasTag":
        this.setState({
          formData: {
            ...this.state.formData,
            hasTag: event.target.value,
          },
        });
        if (event.target.value == 1) {
          document.getElementById("txtTagTitle").disabled = false;
          document.getElementById("txtTagText").disabled = false;
          document.getElementById("slcTagPlace").disabled = false;
          document.getElementById("bTagColorPicker").disabled = false;
          document.getElementById("btnBColorSelect").style.display = "inline";
          document.getElementById("fTagColorPicker").disabled = false;
          document.getElementById("btnFColorSelect").style.display = "inline";
        } else {
          document.getElementById("bTagColorPicker").value = "#000000";
          document.getElementById("fTagColorPicker").value = "#000000";

          document.getElementById("txtTagTitle").disabled = true;
          document.getElementById("txtTagText").disabled = true;
          document.getElementById("slcTagPlace").disabled = true;
          document.getElementById("bTagColorPicker").disabled = true;
          document.getElementById("btnBColorSelect").style.display = "none";
          document.getElementById("fTagColorPicker").disabled = true;
          document.getElementById("btnFColorSelect").style.display = "none";

          this.setState({
            formData: {
              ...this.state.formData,
              tagTitle: "",
              tagText: "",
              tagStyle: {
                value: 0,
                code: "justify-content-center tag-b",
                backgroundColor: "#000000",
                fontColor: "#000000",
              },
            },
          });
        }
        break;
      case "tagTitle":
        this.setState({
          formData: {
            ...this.state.formData,
            tagTitle: event.target.value,
          },
        });
        break;
      case "tagText":
        this.setState({
          formData: {
            ...this.state.formData,
            tagText: event.target.value,
          },
        });
        break;
    }
  };

  setCaptionStyle = (event) => {
    switch (event.target.value) {
      case "0":
        this.setState({
          formData: {
            ...this.state.formData,
            captionStyle: {
              ...this.state.formData.captionStyle,
              value: event.target.value,
              code: "justify-content-center carousel-caption-b",
            },
          },
        });
        break;
      case "1":
        this.setState({
          formData: {
            ...this.state.formData,
            captionStyle: {
              ...this.state.formData.captionStyle,
              value: event.target.value,
              code: "justify-content-center carousel-caption-t",
            },
          },
        });
        break;
      case "2":
        this.setState({
          formData: {
            ...this.state.formData,
            captionStyle: {
              ...this.state.formData.captionStyle,
              value: event.target.value,
              code: "justify-content-center carousel-caption-lrc",
            },
          },
        });
        break;
      case "3":
        this.setState({
          formData: {
            ...this.state.formData,
            captionStyle: {
              ...this.state.formData.captionStyle,
              value: event.target.value,
              code: "flex-row text-left carousel-caption-lrc",
            },
          },
        });
        break;
      case "4":
        this.setState({
          formData: {
            ...this.state.formData,
            captionStyle: {
              ...this.state.formData.captionStyle,
              value: event.target.value,
              code: "flex-row-reverse text-left carousel-caption-lrc",
            },
          },
        });
        break;
    }
  };

  setTagStyle = (event) => {
    switch (event.target.value) {
      case "0":
        this.setState({
          formData: {
            ...this.state.formData,
            tagStyle: {
              ...this.state.formData.tagStyle,
              value: event.target.value,
              code: "justify-content-center text-center tag-b",
            },
          },
        });
        break;
      case "1":
        this.setState({
          formData: {
            ...this.state.formData,
            tagStyle: {
              ...this.state.formData.tagStyle,
              value: event.target.value,
              code: "justify-content-center text-center tag-t",
            },
          },
        });
        break;
      case "2":
        this.setState({
          formData: {
            ...this.state.formData,
            tagStyle: {
              ...this.state.formData.tagStyle,
              value: event.target.value,
              code: "justify-content-center text-center tag-lrc",
            },
          },
        });
        break;
      case "3":
        this.setState({
          formData: {
            ...this.state.formData,
            tagStyle: {
              ...this.state.formData.tagStyle,
              value: event.target.value,
              code: "flex-row text-center tag-lrc",
            },
          },
        });
        break;
      case "4":
        this.setState({
          formData: {
            ...this.state.formData,
            tagStyle: {
              ...this.state.formData.tagStyle,
              value: event.target.value,
              code: "flex-row-reverse text-center tag-lrc",
            },
          },
        });
        break;
    }
  };

  setCaptionColor = () => {
    let element = document.getElementById("colorPicker");
    this.setState({
      formData: {
        ...this.state.formData,
        captionStyle: {
          ...this.state.formData.captionStyle,
          color: element.value,
        },
      },
    });
  };

  setBackgroundTagColor = () => {
    let element = document.getElementById("bTagColorPicker");
    this.setState({
      formData: {
        ...this.state.formData,
        tagStyle: {
          ...this.state.formData.tagStyle,
          backgroundColor: element.value,
        },
      },
    });
  };

  setTagFontColor = () => {
    let element = document.getElementById("fTagColorPicker");
    this.setState({
      formData: {
        ...this.state.formData,
        tagStyle: {
          ...this.state.formData.tagStyle,
          fontColor: element.value,
        },
      },
    });
  };

  clear = () => {
    this.setState({
      result: "",
      selectFile: null,
      fileUploaded: false,
      formData: {
        id: 0,
        imagesName: "",
        linkPath: "",
        deleted: 0,
        active: 1,
        hasCaption: 0,
        title: "",
        description: "",
        captionStyle: {
          value: 0,
          code: "justify-content-center carousel-caption-b",
          color: "#000000",
        },
        hasTag: 0,
        tagTitle: "",
        tagText: "",
        tagStyle: {
          value: 0,
          code: "justify-content-center tag-b",
          backgroundColor: "#000000",
          fontColor: "#000000",
        },
      },
      deleteData: { id: "", imagesName: "" },
      fieldValidations: { formFileMultiple: true },
      alerts: {
        show: false,
        message: "",
        className: "",
      },
      cardTitle: "New a advertising",
    });
  };

  cancel = () => {
    this.clear();
    this.setState({ showSavePage: 0 });
  };

  checkValidation = () => {
    let error = 0;
    let _fieldValidations = { formFileMultiple: true };
    let _alerts = { show: false, message: "", className: "" };

    if (this.state.selectFile === null) {
      _fieldValidations.formFileMultiple = false;
      error++;
    } else if (!this.state.fileUploaded) {
      _alerts = {
        show: true,
        message: "Please uploaded a file",
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
        this.setState({ showSavePage: 0, result: res })
      );
      this.clear();
    } else {
      await this.dataSource.Update(this.state.formData, (res) =>
        this.setState({ showSavePage: 0, result: res })
      );
      this.clear();
    }
    window.location.reload();
  };

  selectImage = async (event) => {
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
      fileLabel.innerText = "Choose file";
      _alerts = {
        show: true,
        message: "Please select a PNG or JPEG image file.",
        className: "alert alert-danger",
      };
    }

    let img = new Image();
    img.src = window.URL.createObjectURL(_selectFile);
    await img.decode();
    if (img.width < 1200 && img.height < 700) {
      error++;
      document.getElementById("formFileMultiple").value = "";
      fileLabel.innerText = "Choose file";
      _alerts = {
        show: true,
        message: "The file size should not be less than 1200*700 pixels.",
        className: "alert alert-danger",
      };
    }

    this.setState({ alerts: _alerts });

    if (error == 0) {
      this.setState({
        selectFile: _selectFile,
      });
    }
  };

  uploadFile = async () => {
    const fileData = new FormData();
    fileData.append("FileUpload", this.state.selectFile);
    fileData.append("FileName", this.state.selectFile.name);

    await this.dataSource.UploadFile(fileData, (res) =>
      this.setState({
        fileUploaded: res,
        formData: {
          ...this.state.formData,
          imagesName: this.state.selectFile.name,
        },
      })
    );
  };

  edit = (item) => {
    let editImg = new Image();
    editImg.src = `Images\\Advertising\\Advertising\\${item.imagesName}`;

    this.setState({
      formData: {
        id: item.id,
        imagesName: item.imagesName,
        linkPath: item.linkPath,
        deleted: item.deleted,
        active: item.active,
        hasCaption: item.hasCaption,
        title: item.title,
        description: item.description,
        captionStyle: {
          value: item.captionStyle.value,
          code: item.captionStyle.code,
          color: item.captionStyle.color,
        },
        hasTag: item.hasTag,
        tagTitle: item.tagTitle,
        tagText: item.tagText,
        tagStyle: {
          value: item.tagStyle.value,
          code: item.tagStyle.code,
          backgroundColor: item.tagStyle.backgroundColor,
          fontColor: item.tagStyle.fontColor,
        },
      },
      selectFile: editImg,
      showSavePage: 1,
      fileUploaded: true,
      cardTitle: "Edit advertising",
    });
  };

  delete = async () => {
    await this.dataSource.Delete(this.state.deleteData.id, (res) =>
      this.setState({ result: res })
    );
    window.location.reload();
  };

  removeUploadFile = () => {
    this.setState({
      formData: { ...this.state.formData, imagesName: "" },
      fileUploaded: false,
    });
  };

  render() {
    if (this.state.showSavePage) {
      return (
        <div className="page-input d-flex justify-content-center">
          <div className="card card-input">
            <div className="card-header cardH">
              <h1 className="card-title">{this.state.cardTitle}</h1>
            </div>
            <div className="card-body">
              <div
                className="row position-relative form-group col"
                style={{
                  display: !this.state.fileUploaded ? "none" : "inline",
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
                      src={`.\\Images\\Advertising\\Advertising\\${this.state.formData.imagesName}`}
                    />
                  </figure>
                </div>
              </div>
              <div className="row row-cols-2">
                <div
                  className="position-relative form-group col"
                  style={{
                    display: this.state.fileUploaded ? "none" : "inline",
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
                        this.state.fieldValidations.formFileMultiple
                          ? { borderColor: "#ced4da" }
                          : { borderColor: "#dc3545" }
                      }
                    >
                      Choose file
                    </label>
                    <div
                      className="invalid-tooltip"
                      style={{
                        display: this.state.fieldValidations.formFileMultiple
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
                    onClick={this.uploadFile}
                    disabled={this.state.selectFile === null ? true : false}
                  >
                    Upload
                  </button>
                </div>

                <div className="form-group col">
                  <label>Link Path:</label>
                  <input
                    className="form-control"
                    name="linkPath"
                    type="text"
                    value={this.state.formData.linkPath}
                    onChange={this.setValues}
                    placeholder="Enter Link Path"
                    aria-label="Link Path"
                  />
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
                  <label>Has Caption:</label>
                  <select
                    className="form-control"
                    name="hasCaption"
                    type="number"
                    value={this.state.formData.hasCaption}
                    onChange={this.setValues}
                    aria-label="Has Caption"
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>

                <div className="form-group col">
                  <label>Title:</label>
                  <input
                    className="form-control"
                    name="title"
                    id="txtTitle"
                    type="text"
                    value={this.state.formData.title}
                    onChange={this.setValues}
                    placeholder="Enter Title"
                    aria-label="Title"
                    disabled={!this.state.formData.hasCaption}
                  />
                </div>

                <div className="form-group col">
                  <label>Description:</label>
                  <input
                    className="form-control"
                    name="description"
                    id="txtDescription"
                    type="text"
                    value={this.state.formData.description}
                    onChange={this.setValues}
                    placeholder="Enter Description"
                    aria-label="Description"
                    disabled={!this.state.formData.hasCaption}
                  />
                </div>

                <div className="form-group col">
                  <label>Caption Place:</label>
                  <select
                    className="form-control"
                    name="captionStyle"
                    id="slcCaptionPlace"
                    type="number"
                    value={this.state.formData.captionStyle.value}
                    onChange={this.setCaptionStyle}
                    aria-label="Caption Style"
                    disabled={!this.state.formData.hasCaption}
                  >
                    <option value="0">Button</option>
                    <option value="1">Top</option>
                    <option value="2">Center</option>
                    <option value="3">Left</option>
                    <option value="4">Right</option>
                  </select>
                </div>

                <div className="form-group col">
                  <label>Caption Colors:</label>
                  <div className="input-group">
                    <input
                      className="form-control m-1"
                      name="captionColors"
                      id="colorPicker"
                      type="color"
                      aria-label="Caption Colors"
                      disabled={!this.state.formData.hasCaption}
                    />
                    <a
                      className="btn btn-primary m-1"
                      name="colorSelect"
                      onClick={this.setCaptionColor}
                      id="btnSelect"
                      style={{
                        display: !this.state.formData.hasCaption
                          ? "none"
                          : "inline",
                      }}
                    >
                      Select
                    </a>
                  </div>
                </div>
                <div className="form-group col">
                  <label>Color Selected:</label>
                  <div className="input-group">
                    <label
                      className="label-circle"
                      style={{
                        backgroundColor: `${this.state.formData.captionStyle.color}`,
                        cursor: "unset",
                      }}
                    />
                  </div>
                </div>

                <div className="form-group col">
                  <label>Has Tag:</label>
                  <select
                    className="form-control"
                    name="hasTag"
                    type="number"
                    value={this.state.formData.hasTag}
                    onChange={this.setValues}
                    aria-label="Has Tag"
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>

                <div className="form-group col">
                  <label>Tag Title:</label>
                  <input
                    className="form-control"
                    name="tagTitle"
                    id="txtTagTitle"
                    type="text"
                    value={this.state.formData.tagTitle}
                    onChange={this.setValues}
                    placeholder="Enter Tag Title"
                    aria-label="Tag Title"
                    disabled={!this.state.formData.hasTag}
                  />
                </div>

                <div className="form-group col">
                  <label>Tag Text:</label>
                  <input
                    className="form-control"
                    name="tagText"
                    id="txtTagText"
                    type="text"
                    value={this.state.formData.tagText}
                    onChange={this.setValues}
                    placeholder="Enter Tag Text"
                    aria-label="Tag Text"
                    disabled={!this.state.formData.hasTag}
                  />
                </div>

                <div className="form-group col">
                  <label>Tag Place:</label>
                  <select
                    className="form-control"
                    name="tagStyle"
                    id="slcTagPlace"
                    type="number"
                    value={this.state.formData.tagStyle.value}
                    onChange={this.setTagStyle}
                    aria-label="Tag Style"
                    disabled={!this.state.formData.hasTag}
                  >
                    <option value="0">Button</option>
                    <option value="1">Top</option>
                    <option value="2">Center</option>
                    <option value="3">Left</option>
                    <option value="4">Right</option>
                  </select>
                </div>

                <div className="form-group col">
                  <label>Background Tag Colors:</label>
                  <div className="input-group">
                    <input
                      className="form-control m-1"
                      name="bTagColors"
                      id="bTagColorPicker"
                      type="color"
                      aria-label="Background Tag Colors"
                      disabled={!this.state.formData.hasTag}
                    />
                    <a
                      className="btn btn-primary m-1"
                      name="bTagColorSelect"
                      onClick={this.setBackgroundTagColor}
                      id="btnBColorSelect"
                      style={{
                        display: !this.state.formData.hasTag
                          ? "none"
                          : "inline",
                      }}
                    >
                      Select
                    </a>
                  </div>
                </div>
                <div className="form-group col">
                  <label>Color Selected:</label>
                  <div className="input-group">
                    <label
                      className="label-circle"
                      style={{
                        backgroundColor: `${this.state.formData.tagStyle.backgroundColor}`,
                        cursor: "unset",
                      }}
                    />
                  </div>
                </div>

                <div className="form-group col">
                  <label>Tag Font Colors:</label>
                  <div className="input-group">
                    <input
                      className="form-control m-1"
                      name="tFontColors"
                      id="fTagColorPicker"
                      type="color"
                      aria-label="Tag Font Colors"
                      disabled={!this.state.formData.hasTag}
                    />
                    <a
                      className="btn btn-primary m-1"
                      name="tFontColorSelect"
                      onClick={this.setTagFontColor}
                      id="btnFColorSelect"
                      style={{
                        display: !this.state.formData.hasTag
                          ? "none"
                          : "inline",
                      }}
                    >
                      Select
                    </a>
                  </div>
                </div>
                <div className="form-group col">
                  <label>Color Selected:</label>
                  <div className="input-group">
                    <label
                      className="label-circle"
                      style={{
                        backgroundColor: `${this.state.formData.tagStyle.fontColor}`,
                        cursor: "unset",
                      }}
                    />
                  </div>
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
              <div className="card-footer text-center cardF">
                <button
                  className="btn btn-primary mr-1"
                  name="save"
                  aria-label="Save"
                  onClick={this.checkValidation}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  name="cancel"
                  aria-label="Cancel"
                  onClick={this.cancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <section className="bodyApp">
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-mdb-ride="carousel"
            data-mdb-carousel-init
          >
            <ol className="carousel-indicators">
              {this.state.data.map((value, index) => (
                <li
                  data-mdb-target="#carouselExampleCaptions"
                  data-mdb-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current="true"
                  aria-label={`Slide${index}`}
                ></li>
              ))}
            </ol>
            <div className="carousel-inner">
              {this.state.data.map((v, i) => (
                <div
                  className={`carousel-item ${i === 0 ? "active" : ""}`}
                  data-mdb-interval="5000"
                >
                  <div className="image">
                    <div class="overlay">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          this.setState({
                            showDeleteModal: 1,
                            deleteData: { id: v.id, imagesName: v.imagesName },
                          })
                        }
                        aria-label="Close"
                      >
                        <Trash />
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning ml-2"
                        onClick={() => this.edit(v)}
                        aria-label="Edit"
                      >
                        <Pencil />
                      </button>
                    </div>
                    {v.linkPath !== "" ? (
                      <a href={v.linkPath} target="_blank">
                        <img
                          src={`.\\Images\\Advertising\\Advertising\\${v.imagesName}`}
                          className="d-block"
                          alt="Wild Landscape"
                          style={{ width: window.screen.width }}
                        />
                      </a>
                    ) : (
                      <img
                        src={`.\\Images\\Advertising\\Advertising\\${v.imagesName}`}
                        className="d-block"
                        alt="Wild Landscape"
                        style={{ width: window.screen.width }}
                      />
                    )}
                    {v.hasTag ? (
                      <div
                        className={
                          "carousel-caption position-absolute row d-flex " +
                          v.tagStyle.code
                        }
                        style={{ color: v.tagStyle.color }}
                      >
                        <div className="col-xs-2 col-sm-3 col-md-4 col-lg-5 col-xl-5">
                          <MovingText
                            type="popIn"
                            duration="1000ms"
                            delay="1s"
                            direction="normal"
                            timing="ease"
                            iteration="1"
                            fillMode="backwards"
                          >
                            <MovingText
                              type="rotateACW"
                              duration="1000ms"
                              delay="3s"
                              direction="normal"
                              timing="ease"
                              iteration="1"
                              fillMode="backwards"
                            >
                              <lable
                                className="label-circle-tag"
                                style={{
                                  background: v.tagStyle.backgroundColor,
                                  color: v.tagStyle.fontColor,
                                }}
                              >
                                <h2>
                                  <span>{v.tagTitle}</span>
                                  <br />
                                  <span>{v.tagText}</span>
                                </h2>
                              </lable>
                            </MovingText>
                          </MovingText>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {v.hasCaption ? (
                      <div
                        className={
                          "carousel-caption position-absolute row d-flex " +
                          v.captionStyle.code
                        }
                        style={{ color: v.captionStyle.color }}
                      >
                        <div className="col-xs-2 col-sm-3 col-md-4 col-lg-5 col-xl-5">
                          <MovingText
                            type="fadeInFromRight"
                            duration="1000ms"
                            delay="1s"
                            direction="normal"
                            timing="ease"
                            iteration="1"
                            fillMode="backwards"
                          >
                            <h1>{v.title}</h1>
                          </MovingText>
                          <MovingText
                            type="fadeInFromRight"
                            duration="1000ms"
                            delay="2s"
                            direction="normal"
                            timing="ease"
                            iteration="1"
                            fillMode="backwards"
                          >
                            <p>{v.description}</p>
                          </MovingText>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
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
          <div className="mt-4 ml-4 add-div">
            <button
              className="btn btn-primary"
              aria-label="Add"
              onClick={() => this.setState({ showSavePage: 1 })}
            >
              Add
            </button>
          </div>
          <Modal show={this.state.showDeleteModal}>
            <Modal.Header>
              <h5>Delete Advertising</h5>
              <button
                type="button"
                className="btn btn-danger close"
                onClick={() => this.setState({ showDeleteModal: 0 })}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </Modal.Header>
            <ModalBody>
              Are you sure to delete {this.state.deleteData.imagesName}?
            </ModalBody>
            <Modal.Footer>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  this.setState({ showDeleteModal: 0 }, this.clear)
                }
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.delete}
              >
                Yes
              </button>
            </Modal.Footer>
          </Modal>
        </section>
      );
    }
  }
}
