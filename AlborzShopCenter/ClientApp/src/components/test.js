<section class="h-100">
  <div class="container h-100 py-5">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-10">
        {/* //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/}
        <div class="card rounded-3 mb-4">
          <div class="card-body p-4">
            <div class="row d-flex justify-content-between align-items-center">
              <div class="col-md-2 col-lg-2 col-xl-2">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                  class="img-fluid rounded-3"
                  alt="Cotton T-shirt"
                />
              </div>
              <div class="col-md-3 col-lg-3 col-xl-3">
                <p class="lead fw-normal mb-2">Basic T-shirt</p>
                <p>
                  <span class="text-muted">Size: </span>M{" "}
                  <span class="text-muted">Color: </span>Grey
                </p>
              </div>
              <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                <button
                  data-mdb-button-init
                  data-mdb-ripple-init
                  class="btn btn-link px-2"
                  onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                >
                  <i class="fas fa-minus"></i>
                </button>

                <input
                  id="form1"
                  min="0"
                  name="quantity"
                  value="2"
                  type="number"
                  class="form-control form-control-sm"
                />

                <button
                  data-mdb-button-init
                  data-mdb-ripple-init
                  class="btn btn-link px-2"
                  onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 class="mb-0">$499.00</h5>
              </div>
              <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#!" class="text-danger">
                  <i class="fas fa-trash fa-lg"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/}
      </div>
    </div>
  </div>
</section>;
{
  /********************************************************************************************* */
}
<p className="m-4">
  <table className="table table-sm table-borderless">
    <thead>
      <tr>
        <div className="shadow card border-0 mb-4 bg-white rounded">
          <div className="card-body d-flex align-items-center">
            <th className="col-xs-4 col-sm-2 col-md-2 col-lg-2 col-xl-2"></th>
            <th className="col-xs-2 col-sm-2 col-md-2 col-lg-4 col-xl-4">
              Title
            </th>
            {/* <th className="col-xs-2 col-sm-2 col-md-1 col-lg-2 col-xl-2"></th> */}
            <th className="col-xs-2 col-sm-2 col-md-3 col-lg-2 col-xl-2 d-flex justify-content-center">
              Quantity
            </th>
            <th className="col-xs-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 d-flex justify-content-center">
              Price
            </th>
            <th className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 d-flex justify-content-center">
              Total
            </th>
            <th className="col-xs-2 col-sm-2 col-md-1 col-lg-1 col-xl-1"></th>
          </div>
        </div>
      </tr>
    </thead>
    <tbody>
      {this.props.orders.map((i) => (
        <tr>
          <div class="shadow card mb-4 border-0 rounded">
            <div class="card-body p-4">
              <div class="d-flex align-items-center">
                <div class="col-xs-4 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                  <img
                    src="Images\\Products\\aa8f9efc-1974-4869-ad8f-a28ca162ef11\\1.jpg"
                    class=" img-fluid rounded"
                    alt="Cotton T-shirt"
                  />
                </div>

                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-4 col-xl-4">
                  <p class="lead fw-normal mb-2">{`${i.brand} ${i.name} ${i.model}`}</p>
                  <p>
                    {i.size > "" ? (
                      <span class="text-muted d-flex align-items-center">
                        Size: {i.size}
                      </span>
                    ) : (
                      ""
                    )}
                    <span class="text-muted d-flex align-items-center">
                      Color:
                      <label
                        className="label-circle-without-cursor"
                        style={{
                          backgroundColor: `${i.color}`,
                        }}
                      />
                    </span>
                  </p>
                </div>

                {/* <div class="col-xs-1 col-sm-1 col-md-1 col-lg-2 col-xl-2">
                {i.size > "" ? (
                  <p>
                    <span class="text-muted">
                      Size: {i.size}
                    </span>
                  </p>
                ) : (
                  ""
                )}
                <p>
                  <span class="text-muted d-flex align-items-center">
                    Color:
                    <label
                      className="label-circle-without-cursor"
                      style={{
                        backgroundColor: `${i.color}`,
                      }}
                    />
                  </span>
                </p>
              </div> */}

                <div class="col-xs-2 col-sm-2 col-md-3 col-lg-2 col-xl-2 d-flex justify-content-center">
                  <div className="input-group">
                    <div className="input-group-prepend" id="divDash">
                      <button
                        className="btn btn-outline-primary border-0"
                        type="button"
                        onClick={() =>
                          i.number > 1
                            ? this.props.onEditOrder(
                                i.id,
                                i.number - 1,
                                i.price
                              )
                            : this.props.onDeleteOrder(i.id)
                        }
                      >
                        {i.number > 1 ? (
                          <Dash id="iconDash" />
                        ) : (
                          <Trash id="iconTrash" />
                        )}
                      </button>
                    </div>
                    <label className="form-control text-center border-0">
                      {i.number}
                    </label>
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-primary border-0"
                        type="button"
                        onClick={() =>
                          this.props.onEditOrder(i.id, i.number + 1, i.price)
                        }
                        disabled={i.number < i.inventory ? false : true}
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 d-flex justify-content-center">
                  $ {i.price}
                </div>

                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 d-flex justify-content-center">
                  <h5 class="mb-0">$ {i.amount}</h5>
                </div>

                <div className="col-xs-2 col-sm-2 col-md-1 col-lg-1 col-xl-1">
                  <button
                    className="btn btn-outline-danger border-0"
                    type="button"
                    onClick={() => this.props.onDeleteOrder(i.id)}
                  >
                    <Trash id="iconTrash" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </tr>
      ))}
    </tbody>
  </table>
</p>;
