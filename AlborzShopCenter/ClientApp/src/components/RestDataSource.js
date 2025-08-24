import Axios from "axios";
import authService from "./api-authorization/AuthorizeService";
import { ApplicationPaths } from "./api-authorization/ApiAuthorizationConstants";

export class RestDataSource {
  constructor(ControllerName) {
    this.BASE_URL =
      window.location.protocol +
      "//" +
      window.location.hostname +
      ":" +
      window.location.port;
    this.BASE_URL += "/api/" + ControllerName;

    //this.BASE_URL = "https://localhost:44391/api/" + ControllerName;
  }

  async Login(data, callback) {
    await this.SendRequest("post", this.BASE_URL + "/Login", callback, data);
  }

  async Get(data, callback) {
    await this.SendRequest("post", this.BASE_URL + "/Get", callback, data);
  }

  async GetAll(callback) {
    await this.SendRequest("get", this.BASE_URL + "/GetAll", callback);
  }

  async Search(data, callback) {
    await this.SendRequest("post", this.BASE_URL + "/Search", callback, data);
  }

  async Insert(data, callback) {
    await this.SendRequest("post", this.BASE_URL + "/Post", callback, data);
  }

  async Update(data, callback) {
    await this.SendRequest("post", this.BASE_URL + "/Put", callback, data);
  }

  async Delete(id, callback) {
    await this.SendRequest(
      "post",
      this.BASE_URL + "/Delete/" + id,
      callback,
      ""
    );
  }

  async UploadFile(data, callback) {
    await this.SendRequest(
      "post",
      this.BASE_URL + "/UploadFile",
      callback,
      data
    );
  }

  async RemoveUploadFile(data, callback) {
    await this.SendRequest(
      "post",
      this.BASE_URL + "/RemoveUploadFile",
      callback,
      data
    );
  }

  async ChangePassword(data, callback) {
    await this.SendRequest(
      "post",
      this.BASE_URL + "/ChangePassword",
      callback,
      data
    );
  }

  async OtherMethod(method, actionName, data, callback) {
    await this.SendRequest(
      method,
      this.BASE_URL + `/${actionName}`,
      callback,
      data
    );
  }

  async SendRequest(method, url, callback, data) {
    const token = await authService.getAccessToken();

    callback(
      (
        await Axios.request({
          method: method,
          headers: !token ? {} : { Authorization: `Bearer ${token}` },
          //headers: { "content-type": "multipart/form-data" },
          url: url,
          data: data,
        }).catch(function (error) {
          if (error.response.status == 403) {
            const redirectUrl = `${window.location.origin}/${ApplicationPaths.AccessDenied}`;
            console.log(`redirectUrl: ${redirectUrl}`);
            window.location.replace(redirectUrl);
          }
        })
      ).data
    );
  }
}
