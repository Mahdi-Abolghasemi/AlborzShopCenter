import { connect } from "react-redux";
import { Detail } from "../Detail";
import { addOrder, editOrder, deleteOrder } from "./Actions";
import { Header } from "../Header";
import { withRouter } from "react-router-dom";
import { Cart } from "../Cart";

const mapStateToProps = (state) => ({ orders: [...state.orders] });

export const ContainersDetail = withRouter(
  connect(mapStateToProps, (dispatch) => ({
    onNewOrder(
      id,
      productId,
      name,
      model,
      brand,
      imagePath,
      color,
      colorId,
      size,
      sizeId,
      price,
      inventory,
      totalInventory
    ) {
      dispatch(
        addOrder(
          id,
          productId,
          name,
          model,
          brand,
          imagePath,
          color,
          colorId,
          size,
          sizeId,
          price,
          inventory,
          totalInventory
        )
      );
    },
    onEditOrder(id, number, price) {
      dispatch(editOrder(id, number, price));
    },
    onDeleteOrder(id) {
      dispatch(deleteOrder(id));
    },
  }))(Detail)
);

const mapSizeStateToProps = (state) => ({
  size: state.orders.length,
});

export const ContainersHeader = connect(mapSizeStateToProps, null)(Header);

export const ContainersCart = connect(mapStateToProps, (dispatch) => ({
  onEditOrder(id, number, price) {
    dispatch(editOrder(id, number, price));
  },
  onDeleteOrder(id) {
    dispatch(deleteOrder(id));
  },
}))(Cart);
