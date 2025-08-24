import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import { Link } from "react-router-dom";
import { NavMenu } from "./NavMenu";
import { Search, CartFill } from "react-bootstrap-icons";
import { LoginMenu } from "./api-authorization/LoginMenu";
import "./NavMenu.css";
import { RestDataSource } from "./RestDataSource";

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: "",
      suggestions: [],
      data: [],
      linkHref: "",
    };

    this.dataSource = new RestDataSource("Products");
  }

  setValue = (event) => {
    if (this.state.data.length == 0) {
      this.dataSource.GetAll((res) => this.setState({ data: res }));
    }

    const value = event.target.value;
    this.setState({ searchInput: value });

    if (value.length > 0) {
      const filteredSuggestions = this.state.data.filter((suggestion) =>
        (
          suggestion.name.toLowerCase() +
          " " +
          suggestion.model.toLowerCase()
        ).includes(value.toLowerCase())
      );

      this.setState({ suggestions: filteredSuggestions });
    } else {
      this.setState({ suggestions: [] });
    }
  };

  selectSuggestionItem = (value) => {
    this.setState({
      searchInput: value,
      suggestions: [],
      linkHref: `/search/?${value}`,
    });
  };

  render() {
    return (
      <header>
        <Navbar
          // className="navbar-expand-sm navbar-toggleable-sm header border-bottom"
          className="navbar-expand-sm navbar-toggleable-sm header border-bottom"
          light
        >
          <NavbarBrand
            className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2"
            tag={Link}
            to="/"
          >
            <img
              src="Images\\Icon\\logo.png"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </NavbarBrand>
          <div className="input-group col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
            <div className="autocomplete-wrapper">
              <input
                id="inSearch"
                type="text"
                className="form-control"
                placeholder="Search"
                value={this.state.searchInput}
                onChange={this.setValue}
                aria-autocomplete="list"
                aria-controls="autocomplete-list"
              />
              {this.state.suggestions.length > 0 && (
                <ul
                  id="autocomplete-list"
                  className="suggestions-list"
                  role="listbox"
                >
                  {this.state.suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() =>
                        this.selectSuggestionItem(
                          suggestion.name + " " + suggestion.model
                        )
                      }
                      role="option"
                    >
                      {suggestion.name + " " + suggestion.model}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="input-group-append">
              <a
                className="btn btn-warning text-white"
                type="button"
                href={this.state.linkHref}
              >
                <Search />
              </a>
            </div>
          </div>
          <ul className="navbar-nav flex-grow ml-4">
            <LoginMenu className="col-1" />
          </ul>
          <div className="ml-auto mr-4">
            <a className="notification" href="/cart">
              <CartFill className="text-body h5" />
              {this.props.size > 0 ? (
                <span className="badge">{this.props.size}</span>
              ) : (
                ""
              )}
            </a>
          </div>
        </Navbar>
        <NavMenu />
      </header>
    );
  }
}
