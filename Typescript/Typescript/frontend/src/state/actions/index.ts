import { ActionType } from "../actions-type";

interface fetchProductSuccessAction {
  type: ActionType.FETCH_PRODUCT_SUCCESS;
  payload: string[];
}

interface fetchProductErrorAction {
  type: ActionType.FETCH_PRODUCT_ERROR;
  payload: string;
}
interface createProductSuccessAction {
  type: ActionType.CREATE_PRODUCT_SUCCESS;
  payload: string[];
}

interface createProductErrorAction {
  type: ActionType.CREATE_PRODUCT_ERROR;
  payload: string;
}

export type Action =
  | fetchProductSuccessAction
  | fetchProductErrorAction
  | createProductSuccessAction
  | createProductErrorAction;
