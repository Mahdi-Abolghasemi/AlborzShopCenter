import React, { Component } from "react";
import { Collapse, Navbar, NavbarToggler, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import { UserAccessCodeEnum } from "../Enumeration/UserAccessCodeEnum";
import SecurityChack from "./api-authorization/SecurityChack";
import { NavDropdown } from "react-bootstrap";
import { AllMenu } from "./AllMenu";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      show: [],
    };
  }

  componentDidMount() {
    const securityChack = new SecurityChack();
    securityChack
      .getAccessCode()
      .then((result) => this.setState({ show: result }));
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  HasAccess = (code) => {
    if (this.state.show.includes(code)) return "block";
    else return "none";
  };

  render() {
    return (
      <header className="navMenu">
        {/* <Navbar className="navbar-expand-sm navbar-toggleable-sm" light> */}
        <Navbar className="navbar-expand navbar-toggleable" light>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          {/* <Collapse isOpen={!this.state.collapsed} navbar> */}
          <span className="navbar-nav d-flex align-items-center">
            <AllMenu />
            <NavDropdown
              className="menu-dropdown"
              title={<span className="text-white">Base Info</span>}
              to="/BaseInfo"
              style={{
                display: this.HasAccess(UserAccessCodeEnum.View_Base_Info_Menu),
              }}
            >
              <NavDropdown.Item
                as={Link}
                className="text-white"
                to={"/baseInfo/country"}
                style={{
                  display: this.HasAccess(UserAccessCodeEnum.Manage_Countrys),
                }}
              >
                Countries
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                className="text-white"
                to={"/baseInfo/city"}
                style={{
                  display: this.HasAccess(UserAccessCodeEnum.Manage_Cities),
                }}
              >
                Cities
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                className="text-white"
                to={"/baseInfo/Category"}
                style={{
                  display: this.HasAccess(UserAccessCodeEnum.Manage_Categories),
                }}
              >
                Categories
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                className="text-white"
                to={"/baseInfo/Brand"}
                style={{
                  display: this.HasAccess(UserAccessCodeEnum.Manage_Brands),
                }}
              >
                Brands
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                className="text-white"
                to={"/baseInfo/Shop"}
                style={{
                  display: this.HasAccess(UserAccessCodeEnum.Manage_Shop),
                }}
              >
                Shop
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                className="text-white"
                to={"/baseInfo/TimeSending"}
                style={{
                  display: this.HasAccess(
                    UserAccessCodeEnum.Manage_Time_Sending
                  ),
                }}
              >
                Time Sending
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                className="text-white"
                to={"/baseInfo/Group"}
                style={{
                  display: this.HasAccess(UserAccessCodeEnum.Manage_Group),
                }}
              >
                Group
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                className="text-white"
                to={"/baseInfo/settings"}
                style={{
                  display: this.HasAccess(UserAccessCodeEnum.Manage_Settings),
                }}
              >
                Settings
              </NavDropdown.Item>
            </NavDropdown>
            <NavItem>
              <NavLink
                tag={Link}
                className="text-white"
                to="/Product"
                style={{
                  display: this.HasAccess(UserAccessCodeEnum.Manage_Product),
                }}
              >
                Product
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={Link}
                className="text-white"
                to="/ApplicationUser"
                style={{
                  display: this.HasAccess(
                    UserAccessCodeEnum.Manage_ApplicationUser
                  ),
                }}
              >
                ApplicationUser
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={Link}
                className="text-white"
                to="/Order"
                style={{
                  display: this.HasAccess(UserAccessCodeEnum.Manage_Order),
                }}
              >
                Order
              </NavLink>
            </NavItem>
            <NavDropdown
              className="menu-dropdown"
              title={<span className="text-white">Advertising</span>}
              to="/Advertising"
              style={{
                display: this.HasAccess(
                  UserAccessCodeEnum.View_Advertising_Menu
                ),
              }}
            >
              <NavDropdown.Item
                as={Link}
                className="text-white"
                to={"/advertising/advertising"}
                style={{
                  display: this.HasAccess(
                    UserAccessCodeEnum.Manage_Advertising
                  ),
                }}
              >
                Advertising
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                className="text-white"
                to={"/advertising/adverCategoriesAndFeatures"}
                style={{
                  display: this.HasAccess(
                    UserAccessCodeEnum.Manage_Adver_Categories_And_Features
                  ),
                }}
              >
                Adver Categories And Features
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              className="menu-dropdown"
              title={<span className="text-white">Footer</span>}
              to="/Footer"
              style={{
                display: this.HasAccess(UserAccessCodeEnum.View_Footer_Menu),
              }}
            >
              <NavDropdown.Item
                as={Link}
                className="text-white"
                to={"/footer/editTermAndConditions"}
                style={{
                  display: this.HasAccess(
                    UserAccessCodeEnum.Manage_Edit_Term_And_Conditions
                  ),
                }}
              >
                Edit Term And Conditions
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                className="text-white"
                to={"/footer/editFaq"}
                style={{
                  display: this.HasAccess(UserAccessCodeEnum.Manage_Edit_FAQ),
                }}
              >
                Edit FAQ
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                className="text-white"
                to={"/footer/editHelp"}
                style={{
                  display: this.HasAccess(UserAccessCodeEnum.Manage_Edit_Help),
                }}
              >
                Edit Help
              </NavDropdown.Item>
            </NavDropdown>
          </span>
          {/* </Collapse> */}
        </Navbar>
      </header>
    );
  }
}
