import React, { Component } from "react";
//import { advertising, AdverCategoriesAndFeaturesData } from "./Data";
import { Carousel, initMDB } from "mdb-ui-kit";
import { AdverStyleTypeEnum } from "../Enumeration/AdverStyleTypeEnum";
import { Link } from "react-router-dom";
import { RestDataSource } from "./RestDataSource";
import ReactGA from "react-ga4";
import MovingText from "react-moving-text";
import { ChevronCompactLeft, ChevronCompactRight } from "react-bootstrap-icons";
import FloatingWhatsApp from "react-floating-whatsapp";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      advertisingData: [],
      adverCategoriesAndFeaturesData: [],
    };

    this.advertisingDataSource = new RestDataSource("Advertising");
    this.featuresDataSource = new RestDataSource("AdverCategoriesAndFeatures");
  }

  componentDidMount = () => {
    this.getData();
    ReactGA.send({ hitType: "pageview", page: "/", title: "Home page" });
  };

  getData = async () => {
    await this.advertisingDataSource.GetAll((res) =>
      this.setState({ advertisingData: res.filter((i) => i.active !== 0) })
    );

    await this.featuresDataSource.GetAll((res) =>
      this.setState({
        adverCategoriesAndFeaturesData: res.filter((i) => i.active !== 0),
      })
    );

    //******************************************************************* */
    // await this.setState({
    //   advertisingData: advertising.filter((i) => i.active !== 0),
    // });

    // await this.setState({
    //   adverCategoriesAndFeaturesData: AdverCategoriesAndFeaturesData.filter(
    //     (i) => i.active !== 0
    //   ),
    // });
    //******************************************************************* */
    let _adverCategoriesAndFeaturesData =
      this.state.adverCategoriesAndFeaturesData;

    await _adverCategoriesAndFeaturesData.map(
      (i) =>
        (i.adverCategoriesAndFeaturesDetails =
          i.adverCategoriesAndFeaturesDetails.filter((i) => i.active !== 0))
    );

    await this.setState({
      adverCategoriesAndFeaturesData: _adverCategoriesAndFeaturesData,
    });
  };

  render() {
    return (
      <section className="bodyApp">
        {/* Advertising Data */}
        {this.state.advertisingData.length > 0
          ? (initMDB({ Carousel }),
            (
              <div
                id="carouselExampleCaptions"
                class="carousel slide"
                data-mdb-ride="carousel"
                data-mdb-carousel-init
              >
                <ol class="carousel-indicators">
                  {this.state.advertisingData.map((value, index) => (
                    <li
                      data-mdb-target="#carouselExampleCaptions"
                      data-mdb-slide-to={index}
                      class={index === 0 ? "active" : ""}
                      aria-current={index === 0 ? "true" : "false"}
                      aria-label={`Slide${index}`}
                    ></li>
                  ))}
                </ol>
                <div class="carousel-inner">
                  {this.state.advertisingData.map((v, i) => (
                    <div
                      class={`carousel-item ${i === 0 ? "active" : ""}`}
                      data-mdb-interval="4000"
                    >
                      <div class="image">
                        {v.linkPath !== "" ? (
                          <a href={v.linkPath} target="_blank">
                            <img
                              src={`Images\\Advertising\\Advertising\\${v.imagesName}`}
                              className="d-block"
                              alt="Wild Landscape"
                              style={{ width: window.screen.width }}
                            />
                          </a>
                        ) : (
                          <img
                            src={`Images\\Advertising\\Advertising\\${v.imagesName}`}
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
                  class="carousel-control-prev"
                  type="button"
                  data-mdb-target="#carouselExampleCaptions"
                  data-mdb-slide="prev"
                >
                  <h1 style={{ color: "black" }}>
                    <ChevronCompactLeft />
                  </h1>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  data-mdb-target="#carouselExampleCaptions"
                  data-mdb-slide="next"
                >
                  <h1 style={{ color: "black" }}>
                    <ChevronCompactRight />
                  </h1>
                </button>
              </div>
            ))
          : ""}

        {/* Adver Categories And Features Data */}
        <div className="container-fluid">
          {this.state.adverCategoriesAndFeaturesData.length > 0 ? (
            <div className="adverCategories-div row justify-content-center row-cols-xs row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
              {this.state.adverCategoriesAndFeaturesData.map((i) => (
                <div className="col-auto d-flex mb-4">
                  <div className="card public-card">
                    <div className="card-body">
                      <h5 className="card-title font-weight-bold">{i.title}</h5>
                      {i.styleType == AdverStyleTypeEnum.Single
                        ? i.adverCategoriesAndFeaturesDetails.map(
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
                          )
                        : ""}

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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="show-WhatsApp">
          <FloatingWhatsApp
            phoneNumber={process.env.REACT_APP_PhoneNumber}
            accountName={process.env.REACT_APP_AccountName}
            avatar={process.env.REACT_APP_Logo}
          />
        </div>
      </section>
    );
  }
}
