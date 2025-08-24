import React, { Component } from "react";
import { RestDataSource } from "../RestDataSource";

// import { dataSettings } from "../Data";

export class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: "",
      formData: {
        id: 0,
        boarding: 0,
        daily: 0,
        numbersOfDayForSelect: "",
        numbersOfDayForSupport: "",
      },
      inValidatTimingWorking: 0,
      fieldValidations: {
        numbersOfDayForSelect: true,
        numbersOfDayForSupport: true,
      },
    };

    this.dataSource = new RestDataSource("Settings");
  }

  componentDidMount = () => {
    this.setData();
  };

  setData = async () => {
    await this.dataSource.GetAll((res) => this.setState({ formData: res }));

    // await this.setState({ formData: dataSettings });
  };

  setValue = (event) => {
    switch (event.target.name) {
      case "radioBoarding":
        if (event.target.value) {
          this.setState({
            formData: { ...this.state.formData, boarding: 1, daily: 0 },
          });
        } else {
          this.setState({
            formData: { ...this.state.formData, boarding: 0, daily: 1 },
          });
        }
        break;
      case "radioDaily":
        if (event.target.value) {
          this.setState({
            formData: { ...this.state.formData, daily: 1, boarding: 0 },
          });
        } else {
          this.setState({
            formData: { ...this.state.formData, daily: 0, boarding: 1 },
          });
        }
        break;
      case "slcTimeWorking":
        if (event.target.value == 1) {
          this.setState({
            formData: { ...this.state.formData, boarding: 0, daily: 1 },
          });
        } else if (event.target.value == 0) {
          this.setState({
            formData: { ...this.state.formData, boarding: 1, daily: 0 },
          });
        } else {
          this.setState({
            formData: { ...this.state.formData, boarding: 0, daily: 0 },
          });
        }
        break;
      case "numbersOfDayForSelect":
        this.setState({
          formData: {
            ...this.state.formData,
            numbersOfDayForSelect: event.target.value,
          },
        });
        break;
      case "numbersOfDayForSupport":
        this.setState({
          formData: {
            ...this.state.formData,
            numbersOfDayForSupport: event.target.value,
          },
        });
        break;
    }
  };

  checkValidation = () => {
    let error = 0;
    let _inValidatTimingWorking = false;
    let _fieldValidations = {
      numbersOfDayForSelect: true,
      numbersOfDayForSupport: true,
    };

    Object.keys(this.state.fieldValidations).forEach((field) => {
      if (
        this.state.formData[field] === "" ||
        this.state.formData[field] == 0
      ) {
        error++;
        _fieldValidations[field] = false;
      }
    });

    if (this.state.formData.boarding === 0 && this.state.formData.daily === 0) {
      error++;
      _inValidatTimingWorking = true;
    }

    this.setState({
      fieldValidations: _fieldValidations,
      inValidatTimingWorking: _inValidatTimingWorking,
    });
    if (error === 0) this.save();
  };

  save = async () => {
    await this.dataSource.Update(this.state.formData, (res) =>
      this.setState({ result: res }, (window.location.href = "/"))
    );
  };

  cancel = () => {
    window.location.href = "/";
  };

  getValue = () => {
    if (this.state.formData.boarding) {
      return "0";
    } else if (this.state.formData.daily) {
      return "1";
    } else {
      return "-1";
    }
  };

  render() {
    return (
      <section className="bodyApp">
        <div className="p-2 table-header mb-4">
          <h4 className="ml-4">Settings</h4>
        </div>
        <div className="container">
          <div className="position-relative">
            <label>Timing Working:</label>
            <div className="container changeToHightSize">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radioBoarding"
                  checked={this.state.formData.boarding}
                  id="flexRadioBoarding"
                  onChange={this.setValue}
                />

                <label className="form-check-label" for="flexRadioBoarding">
                  Boarding
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radioDaily"
                  checked={this.state.formData.daily}
                  id="flexRadioDaily"
                  onChange={this.setValue}
                />
                <label className="form-check-label" for="flexRadioDaily">
                  Daily
                </label>
              </div>
            </div>
            <div className="form-group changeToLowSize">
              <select
                className="form-control"
                name="slcTimeWorking"
                onChange={this.setValue}
                value={this.getValue()}
              >
                <option value="-1"></option>
                <option value="0">Boarding</option>
                <option value="1">Daily</option>
              </select>
            </div>
            <div
              className="invalid-tooltip"
              style={{
                display: this.state.inValidatTimingWorking ? "inline" : "none",
              }}
            >
              Please select a time working.
            </div>
          </div>
          <div className="row row-cols-2 mt-2">
            <div className="form-group col">
              <label>Numbers Of Day For Select:</label>
              <input
                className="form-control"
                name="numbersOfDayForSelect"
                onChange={this.setValue}
                value={this.state.formData.numbersOfDayForSelect}
                type="number"
                placeholder="Enter Numbers Of Day For Select"
                aria-label="Numbers Of Day For Select"
                style={
                  this.state.fieldValidations.numbersOfDayForSelect
                    ? { borderColor: "#ced4da" }
                    : { borderColor: "#dc3545" }
                }
              />
              <div
                className="invalid-tooltip"
                style={{
                  display: this.state.fieldValidations.numbersOfDayForSelect
                    ? "none"
                    : "inline",
                }}
              >
                Please fill out this field.
              </div>
            </div>
            <div className="form-group col">
              <label>Numbers Of Day For Support:</label>
              <input
                className="form-control"
                name="numbersOfDayForSupport"
                onChange={this.setValue}
                value={this.state.formData.numbersOfDayForSupport}
                type="number"
                placeholder="Enter Numbers Of Day For Support"
                aria-label="Numbers Of Day For Support"
                style={
                  this.state.fieldValidations.numbersOfDayForSupport
                    ? { borderColor: "#ced4da" }
                    : { borderColor: "#dc3545" }
                }
              />
              <div
                className="invalid-tooltip"
                style={{
                  display: this.state.fieldValidations.numbersOfDayForSupport
                    ? "none"
                    : "inline",
                }}
              >
                Please fill out this field.
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid text-center add-div mt-3">
          <button
            className="btn btn-primary mr-1"
            name="save"
            id="btnSave"
            aria-label="Save"
            onClick={this.checkValidation}
          >
            Save
          </button>
          <button
            className="btn btn-secondary"
            name="cancel"
            id="btnCancel"
            aria-label="Cancel"
            onClick={this.cancel}
          >
            Cancel
          </button>
        </div>
      </section>
    );
  }
}
