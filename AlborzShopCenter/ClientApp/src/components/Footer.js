import React, { Component } from "react";
import "react-bootstrap-icons/dist/index";
import * as icon from "react-bootstrap-icons";

export class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="text-center text-lg-start bg-body-tertiary footer-div">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 bg-dark">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          <div>
            <a href="" className="me-4 text-reset">
              <icon.Facebook className="m-3" />
            </a>
            <a href="" className="me-4 text-reset">
              <icon.Twitter className="m-3" />
            </a>
            <a href="" className="me-4 text-reset">
              <icon.Google className="m-3" />
            </a>
            <a href="" className="me-4 text-reset">
              <icon.Instagram className="m-3" />
            </a>
            <a href="" className="me-4 text-reset">
              <icon.Linkedin className="m-3" />
            </a>
            <a href="" className="me-4 text-reset">
              <icon.Github className="m-3" />
            </a>
          </div>
        </section>
        <section>
          <div className="container text-left text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-5 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <icon.Gem className="m-1" />
                  Alborz Shop Center
                </h6>
                <p>
                  This site is designed as a sample so that friends can see my
                  work closely.
                  <a href="" className="text-reset ml-2">
                    Read more...
                  </a>
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="/footer/termAndConditions" className="text-reset">
                    Term and Conditions
                  </a>
                </p>
                <p>
                  <a href="/footer/faq" className="text-reset">
                    FAQ
                  </a>
                </p>
                <p>
                  <a href="/footer/help" className="text-reset">
                    Help
                  </a>
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact Us</h6>
                <p>
                  <icon.HouseFill className="m-1" /> New York, NY 10012, US
                </p>
                <p>
                  <icon.EnvelopeFill className="m-1" />
                  info@example.com
                </p>
                <p>
                  <icon.TelephoneFill className="m-1" /> + 01 234 567 88
                </p>
                <p>
                  <icon.PrinterFill className="m-1" /> + 01 234 567 89
                </p>
              </div>
            </div>
          </div>
        </section>
        <div
          className="text-center p-4"
          style={{ backgroundcolor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2023 Copyright:
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>
      </footer>
    );
  }
}
