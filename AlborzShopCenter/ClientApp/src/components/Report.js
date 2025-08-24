import React, { Component, createRef } from "react";
import { Viewer } from "@grapecity/activereports-react";
//import { Core } from "@grapecity/activereports";
import "@grapecity/activereports/pdfexport";
import "@grapecity/activereports/htmlexport";
import "@grapecity/activereports/tabulardataexport";
import { RestDataSource } from "./RestDataSource";

export class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewerRef: createRef(),
      data: this.props.location.data,
      reportName: this.props.location.reportName,
      fields: this.props.location.fields,
      // licenseKey:
      //   "GrapeCity-Internal-Use-Only,*.csb.app,478637913485732#B0McJlnUPdlYRRnV7MGMxoVbC54NJ9UMTtSTIVzTM36TOllVhx6SytSN5MHeN5Gb6tkZiFkbLlVamVUcmhzUZFmav56SExGSnZHNmZTSqVmbkR4Z8V5R6VXbRZXdQ5URxRjQtJkSCVDSGRUc9Y7RV36M8k7bsJjNkdTeiJ4ZqJUOzZEUlRUOFZ6LShDNEBDSz5kTzQDNmFUa0FDRFdUa7FTUTZkb6EVTiBTN5pFaHVnNMN5QJpFaohDS6o4T8FmNvo5aKtkSz3iQSN5dqREVO5kNXNGNwIDarUTc0NnVUh7R5I6Njd7NKlmI0IyUiwiIBVUQxYkRzEjI0ICSiwyNzkjNzgDN6kTM0IicfJye35XX3JSSWFURiojIDJCLiIjVgMlS4J7bwVmUlZXa4NWQiojIOJyebpjIkJHUiwiIxUjN4IDMgcTM8ADMyAjMiojI4J7QiwiIwBXYuI6cj9iKiojIz5GRiwiI9RXaDVGchJ7RiojIh94QiwiIyMzN5gDNzETO7MjN8cDNiojIklkIs4XZzxWYmpjIyNHZisnOiwmbBJye0ICRiwiI34TQ9Jmdwo5YlBXYLd7NkVlVyZkVQJXNThHZzhlUQlkSY5mNaZFbJRWYCJVcJJVU6pUMkl5bUBVUHRnV9VXRWNURNB7Lx8GTwA7UQBDU6glcDxmdwNGNl3GTxsCR63meyA5VxIDc7U5UD56dKBQcfd",
    };

    this.dataSource = new RestDataSource("Reports");
  }

  componentDidMount = () => {
    this.openReport();
  };

  openReport = async () => {
    //await Core.setLicenseKey(this.state.licenseKey);

    const report = await this.loadReport();
    console.log(`data is: ${JSON.stringify(this.state.data)}`);
    report.DataSources[0].ConnectionProperties.ConnectString =
      "jsondata=" + JSON.stringify(this.state.data);

    report.DataSets[0].fields = this.state.fields;
    report.DataSets[0].Query.CommandText = "jpath=$.*";

    this.state.viewerRef.current.Viewer.open(report);
  };

  loadReport = async () => {
    let reportResponse = "";
    let reportName = new FormData();
    reportName.append("reportName", "Order.rdlx-json");

    await this.dataSource.OtherMethod(
      "post",
      "GetReport",
      reportName,
      (res) => (reportResponse = res)
    );

    console.log(`report is: ${JSON.stringify(reportResponse)}`);
    return reportResponse;
  };

  render() {
    return (
      <div id="viewer-host">
        <Viewer ref={this.state.viewerRef}></Viewer>
      </div>
    );
  }
}
