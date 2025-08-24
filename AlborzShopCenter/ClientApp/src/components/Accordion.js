import React, { Component } from "react";
import { ChevronCompactUp, ChevronCompactDown } from "react-bootstrap-icons";

export class Accordion extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="accordion">
        {this.props.hiddenTexts.map((hiddenText) => (
          <AccordionItem key={hiddenText.question} hiddenText={hiddenText} />
        ))}
      </div>
    );
  }
}

export class AccordionItem extends Component {
  constructor(props) {
    super(props);
    this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
    this.state = {
      visibility: false,
    };
  }

  handleToggleVisibility = () => {
    this.setState((prevState) => {
      return {
        visibility: !prevState.visibility,
      };
    });
  };
  render() {
    const activeStatus = this.state.visibility ? "active" : "";

    return (
      <div>
        <button
          className="accordion__button"
          onClick={this.handleToggleVisibility}
        >
          {this.props.hiddenText.question}
          <span>
            {this.state.visibility ? (
              <ChevronCompactUp />
            ) : (
              <ChevronCompactDown />
            )}
          </span>
        </button>
        <p className={`accordion__content ${activeStatus}`}>
          {this.props.hiddenText.answer}
        </p>
      </div>
    );
  }
}
