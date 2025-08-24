import { OperationStoreEnum } from "../../Enumeration/OperationStoreEnum";

export const addOrder = (
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
) => ({
  type: OperationStoreEnum.Add,
  id,
  productId,
  name,
  model,
  brand,
  imagePath,
  color,
  number: 1,
  colorId,
  size,
  sizeId,
  price,
  inventory,
  totalInventory,
});

export const editOrder = (id, number, price) => ({
  type: OperationStoreEnum.Edit,
  id,
  number,
  price,
});

export const deleteOrder = (id) => ({
  type: OperationStoreEnum.Delete,
  id,
});
