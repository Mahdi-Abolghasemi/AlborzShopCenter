import React, { Component } from "react";
import { Menu, MenuItem, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { ReactDimmer } from "react-dimmer";
import { List } from "react-bootstrap-icons";
import { RestDataSource } from "./RestDataSource";
import { Link } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap";
import "./NavMenu.css";

//import { Groups, Categories } from "./Data";

export class AllMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      categories: [],
      groups: [],
    };

    this.categoryDataSource = new RestDataSource("Categories");
    this.groupDataSource = new RestDataSource("Groups");
  }

  componentDidMount = () => {
    this.categoryDataSource.GetAll((res) => this.setState({ categories: res }));
    this.groupDataSource.GetAll((res) => this.setState({ groups: res }));
    //this.setState({ categories: Categories, groups: Groups });
  };

  activeDimmer = () => {
    this.setState({
      collapsed: true,
    });
  };

  inActiveDimmer = () => {
    this.setState({
      collapsed: false,
    });
  };

  render() {
    return (
      <header className="allMenu">
        <NavItem>
          <NavLink tag={Link}>
            <ReactDimmer
              isOpen={this.state.collapsed}
              exitDimmer={this.inActiveDimmer}
            />

            <Menu
              menuButton={
                <a className="text-white" onClick={this.activeDimmer}>
                  <span className="d-flex align-items-center">
                    <List size={30} />
                    All
                  </span>
                </a>
              }
              transition
            >
              {this.state.categories.map((c) => (
                <SubMenu label={c.name} className="text-white subMenu">
                  {this.state.groups.map((g) =>
                    g.categoryId === c.id ? (
                      <Link
                        onClick={() => {
                          window.location.replace(`/buy/?gNum=${g.id}?pNum=0`);
                        }}
                        className="text-white"
                        style={{ textDecoration: "none" }}
                      >
                        <MenuItem value={g.id} onClick={this.inActiveDimmer}>
                          {g.name}
                        </MenuItem>
                      </Link>
                    ) : (
                      ""
                    )
                  )}
                </SubMenu>
              ))}
            </Menu>
          </NavLink>
        </NavItem>
      </header>
    );
  }
}
