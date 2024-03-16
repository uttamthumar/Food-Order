import { useAppDispatch } from "../state";

import { bindActionCreators } from "redux";

import { actionCreators } from "../state";

export const useActions = () => {
    const dispatch = useAppDispatch();

// Bind action creators to dispatch
    bindActionCreators(actionCreators,dispatch);
}