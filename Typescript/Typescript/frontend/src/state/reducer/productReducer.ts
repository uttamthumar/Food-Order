import { Action } from "../actions";
import { ActionType } from "../actions-type";

interface RepositoriesState {
  loading: boolean;
  error: string | null;
  data: any[];
}

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const reducer = (
  state: RepositoriesState = initialState,
  action: Action
): RepositoriesState => {
  switch (action.type) {
    case ActionType.FETCH_PRODUCT_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionType.FETCH_PRODUCT_ERROR:
      return { loading: false, error: action.payload, data: [] };
    case ActionType.CREATE_PRODUCT_SUCCESS:
      return { loading: false, error: null, data: [] };
    case ActionType.CREATE_PRODUCT_ERROR:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default reducer;
