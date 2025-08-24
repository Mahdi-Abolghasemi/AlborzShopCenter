import { OperationStoreEnum } from "../../Enumeration/OperationStoreEnum";

export const order = (state = {}, action) => {
  switch (action.type) {
    case OperationStoreEnum.Add:
      return {
        id: action.id,
        productId: action.productId,
        name: action.name,
        model: action.model,
        brand: action.brand,
        imagePath: action.imagePath,
        color: action.color,
        number: action.number,
        colorId: action.colorId,
        size: action.size,
        sizeId: action.sizeId,
        price: action.price,
        amount: action.price,
        inventory: action.inventory,
        totalInventory: action.totalInventory,
      };
    case OperationStoreEnum.Edit:
      return state.id !== action.id
        ? state
        : {
            ...state,
            number: action.number,
            amount: action.price * action.number,
          };
    default:
      return state;
  }
};

export const orders = (state = [], action) => {
  switch (action.type) {
    case OperationStoreEnum.Add:
      return [...state, order({}, action)];
    case OperationStoreEnum.Edit:
      return state.map((c) => order(c, action));
    case OperationStoreEnum.Delete:
      return state.filter((c) => c.id !== action.id);
    default:
      return state;
  }
};
