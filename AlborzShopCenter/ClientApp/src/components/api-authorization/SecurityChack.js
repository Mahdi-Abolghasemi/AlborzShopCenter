import authService from "./AuthorizeService";

export default class SecurityChack {
  _isAuthenticated = false;
  _id = 0;
  _result = [];

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([
      authService.isAuthenticated(),
      authService.getUser(),
    ]);
    this._isAuthenticated = isAuthenticated;
    this._id = user && user.sub;
  }

  async getUserId() {
    this._subscription = authService.subscribe(() => this.populateState());
    await this.populateState();
    authService.unsubscribe(this._subscription);
    return this._id;
  }

  async getAccessCode() {
    this._subscription = authService.subscribe(() => this.populateState());
    await this.populateState();

    if (this._isAuthenticated) {
      let url =
        window.location.protocol +
        "//" +
        window.location.hostname +
        ":" +
        window.location.port;
      await fetch(url + "/api/UserAccess/GetAccessForMenu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this._id),
      }).then((response) => (this._result = response.json()));

      authService.unsubscribe(this._subscription);
      return this._result;
    } else {
      authService.unsubscribe(this._subscription);
      return this._result;
    }
  }
}
