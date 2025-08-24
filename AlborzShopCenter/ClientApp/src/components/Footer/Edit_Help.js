import React, { Component } from "react";
import { RestDataSource } from "../RestDataSource";
import { Trash, Pencil } from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import { ModalBody } from "react-bootstrap";
import { PaginationControls } from "../PaginationControls";

export class Edit_Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        id: "00000000-0000-0000-0000-000000000000",
        title: "",
        content: "",
      },
      data: [],
      result: "",
      showSavePage: 0,
      deleteData: { id: "", title: "" },
      showDeleteModal: 0,
      sort: "Title",
      pageCount: 0,
      pageSizes: [5, 10, 25, 100],
      perPage: 5,
      offset: 0,
      currentPage: 1,
      cardTitle: "New a subject",
    };

    this.dataSource = new RestDataSource("Help");
  }

  componentDidMount = () => {
    this.dataSource.GetAll((res) => this.setState({ data: res }));
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

  setValue = (event) => {
    switch (event.target.name) {
      case "title":
        this.setState({
          formData: { ...this.state.formData, title: event.target.value },
        });
        break;
      case "content":
        this.setState({
          formData: { ...this.state.formData, content: event.target.value },
        });
        break;
    }
  };

  save = async () => {
    await this.dataSource.Update(this.state.formData, (res) =>
      this.setState({ showSavePage: 0, result: res }, this.clear())
    );
    window.location.reload();
  };

  edit = (item) => {
    this.setState({
      formData: {
        id: item.id,
        title: item.title,
        content: item.content,
      },
      showSavePage: 1,
      cardTitle: "Edit subject",
    });
  };

  clear = () => {
    this.setState({
      formData: {
        id: "00000000-0000-0000-0000-000000000000",
        title: "",
        content: "",
      },
      deleteData: { id: "", title: "" },
      result: "",
      cardTitle: "New a subject",
    });
  };

  delete = async () => {
    await this.dataSource.Delete(this.state.deleteData.id, (res) =>
      this.setState({ showDeleteModal: 0, result: res })
    );
    window.location.reload();
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
              <div className="m-2">
                <label>Title:</label>
                <input
                  className="form-control"
                  name="title"
                  type="text"
                  value={this.state.formData.title}
                  onChange={this.setValue}
                  placeholder="Enter Title"
                  aria-label="Title"
                />
              </div>
              <div className="m-2">
                <label>Content:</label>
                <textarea
                  className="form-control"
                  name="content"
                  type="text"
                  value={this.state.formData.content}
                  onChange={this.setValue}
                  placeholder="Enter Content"
                  aria-label="Content"
                  rows="10"
                />
              </div>
              <div className="text-center mt-4">
                <button
                  type="button"
                  className="btn btn-primary mr-1"
                  onClick={this.save}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  name="cancel"
                  id="btnCancel"
                  aria-label="Cancel"
                  onClick={() =>
                    this.setState({ showSavePage: 0 }, this.clear())
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <section className="bodyApp">
          <div className="footer-content justify-content-center">
            <div className="mb-4">
              <h2>Subjects</h2>
            </div>
            {this.sliceData().map((i) => (
              <div class="card mb-2" style={{ width: "100%" }}>
                <div class="card-body">
                  <h5 class="card-title">{i.title}</h5>
                  <p class="card-text">{i.content}</p>
                  <a
                    className="text-danger mr-2"
                    onClick={() =>
                      this.setState({
                        showDeleteModal: 1,
                        deleteData: { id: i.id, title: i.title },
                      })
                    }
                  >
                    <Trash />
                  </a>
                  <a className="text-warning mr-2" onClick={() => this.edit(i)}>
                    <Pencil />
                  </a>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.setState({ showSavePage: 1 })}
              >
                Add
              </button>
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
