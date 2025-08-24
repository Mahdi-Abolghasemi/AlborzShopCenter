import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Country } from "./components/BaseInfo/Country";
import { City } from "./components/BaseInfo/City";
import { Category } from "./components/BaseInfo/Category";
import { Brand } from "./components/BaseInfo/Brand";
import { Shop } from "./components/BaseInfo/Shop";
import { TimeSending } from "./components/BaseInfo/TimeSending";
import { Group } from "./components/BaseInfo/Group";
import { Settings } from "./components/BaseInfo/Settings";
import { Product } from "./components/Product";
import { ApplicationUser } from "./components/ApplicationUser";
import { UserAccess } from "./components/UserAccess";
import { Order } from "./components/Order";
import { Buy } from "./components/Buy";
import {
  ContainersDetail,
  ContainersCart,
} from "./components/Store/Containers";
import { Advertising } from "./components/Advertising/Advertising";
import { AdverCategoriesAndFeatures } from "./components/Advertising/AdverCategoriesAndFeatures";
import { AdverDetails } from "./components/Advertising/AdverDetails";
import { TermAndConditions } from "./components/Footer/TermAndConditions";
import { Edit_TermAndConditions } from "./components/Footer/Edit_TermAndConditions";
import { FAQ } from "./components/Footer/FAQ";
import { Edit_FAQ } from "./components/Footer/Edit_FAQ";
import { Edit_Help } from "./components/Footer/Edit_Help";
import { Help } from "./components/Footer/Help";
import { Report } from "./components/Report";
import { Search } from "./components/Search";
import { MyOrders } from "./components/MyOrders";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";
import "./custom.css";

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <AuthorizeRoute path={"/baseInfo/country"} component={Country} />
          <AuthorizeRoute exact path="/baseInfo/city" component={City} />
          <AuthorizeRoute
            exact
            path="/baseInfo/category"
            component={Category}
          />
          <AuthorizeRoute exact path="/baseInfo/brand" component={Brand} />
          <AuthorizeRoute exact path="/baseInfo/shop" component={Shop} />
          <AuthorizeRoute
            exact
            path="/baseInfo/timeSending"
            component={TimeSending}
          />
          <AuthorizeRoute exact path="/baseInfo/group" component={Group} />
          <AuthorizeRoute
            exact
            path="/baseInfo/settings"
            component={Settings}
          />
          <AuthorizeRoute exact path="/product" component={Product} />
          <AuthorizeRoute
            exact
            path="/applicationUser"
            component={ApplicationUser}
          />
          <AuthorizeRoute
            exact
            path="/applicationUser/userAccess"
            component={UserAccess}
          />
          <AuthorizeRoute exact path="/order" component={Order} />
          <Route exact path="/buy" component={Buy} />
          <Route exact path="/buy/detail" component={ContainersDetail} />
          <AuthorizeRoute exact path="/cart" component={ContainersCart} />
          {/* <Route exact path="/cart" component={ContainersCart} /> */}
          <AuthorizeRoute
            exact
            path="/advertising/advertising"
            component={Advertising}
          />
          <AuthorizeRoute
            exact
            path="/advertising/adverCategoriesAndFeatures"
            component={AdverCategoriesAndFeatures}
          />
          <Route
            exact
            path="/advertising/adverDetails"
            component={AdverDetails}
          />
          <Route
            exact
            path="/footer/termAndConditions"
            component={TermAndConditions}
          />
          <AuthorizeRoute
            exact
            path="/footer/editTermAndConditions"
            component={Edit_TermAndConditions}
          />
          <Route exact path="/footer/faq" component={FAQ} />
          <AuthorizeRoute exact path="/footer/editFaq" component={Edit_FAQ} />
          <Route exact path="/footer/help" component={Help} />
          <AuthorizeRoute exact path="/footer/editHelp" component={Edit_Help} />
          <Route exact path="/report" component={Report} />
          <Route exact path="/search" component={Search} />
          <AuthorizeRoute exact path="/myOrders" component={MyOrders} />
          <Route
            path={ApplicationPaths.ApiAuthorizationPrefix}
            component={ApiAuthorizationRoutes}
          />
          <Route path="*" component={() => "404 Not found."} />
        </Switch>
      </Layout>
    );
  }
}
