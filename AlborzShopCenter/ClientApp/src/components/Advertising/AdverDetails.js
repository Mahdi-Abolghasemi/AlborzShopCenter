import React, { Component } from "react";
import { AdverCategoriesAndFeaturesTypeEnum } from "../../Enumeration/AdverCategoriesAndFeaturesTypeEnum";
import { Link } from "react-router-dom";
import { RestDataSource } from "../RestDataSource";
import ReactGA from "react-ga4";

//import { AdverCategoriesAndFeaturesData1 } from "../Data";

export class AdverDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      adverId: document.location.href
        .split("?")[1]
        .replace(/%20/g, "")
        .replace(/adverNum=/g, ""),
    };

    this.dataSource = new RestDataSource("AdverCategoriesAndFeatures");
  }

  componentDidMount = () => {
    this.getData();
  };

  getData = async () => {
    const adverData = new FormData();
    adverData.append("adverId", this.state.adverId);
    await this.dataSource.Get(adverData, (res) => this.setState({ data: res }));

    if (this.state.data !== "" && this.state.data.active) {
      let _adverCategoriesAndFeaturesDetails =
        this.state.data.adverCategoriesAndFeaturesDetails;

      _adverCategoriesAndFeaturesDetails =
        _adverCategoriesAndFeaturesDetails.filter((i) => i.active !== 0);

      await this.setState({
        data: {
          ...this.state.data,
          adverCategoriesAndFeaturesDetails: _adverCategoriesAndFeaturesDetails,
        },
      });

      ReactGA.send({
        hitType: "pageview",
        page: "/advertising/adverDetails",
        title: `adverDetails page and title is:${this.state.data.title}`,
      });
    }

    // await this.setState({ data: AdverCategoriesAndFeaturesData1 });
  };

  render() {
    return (
      <section className="bodyApp">
        <div className="container-fluid adverDetails-div">
          <div className="row justify-content-center row-cols-xs row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
            {this.state.data !== ""
              ? this.state.data.adverCategoriesAndFeaturesDetails.map((i) => (
                  <div className="col-auto d-flex mb-4 border-0">
                    <div className="card border-0">
                      <Link to={`/buy/?gNum=${i.groupId}?pNum=${i.productId}`}>
                        <img
                          src={i.imagePath}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </Link>
                      <div className="card-body text-center">
                        {this.state.data.type ==
                        AdverCategoriesAndFeaturesTypeEnum.SpacialProduct ? (
                          <h5>{i.productTitle}</h5>
                        ) : (
                          <h5>{i.groupName}</h5>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </section>
    );
  }
}
