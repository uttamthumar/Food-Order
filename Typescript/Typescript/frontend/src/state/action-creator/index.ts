import axios from "axios";

import { ActionType } from "../actions-type";

import { Action } from "../actions";

import { Dispatch } from "redux";
import { number } from "yup";

export const fetchProducts = (page: number = 1) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PUBLIC_URL}/products?page=${page}`
      );
      dispatch({
        type: ActionType.FETCH_PRODUCT_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.FETCH_PRODUCT_ERROR,
        payload: error.message,
      });
    }
  };
};

export const createProduct = (formData: any, page: number = 1) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      await axios.post(`${process.env.REACT_APP_PUBLIC_URL}/products`, {
        name: formData.name,
        price: formData.price,
        description: formData.description,
      });
      dispatch(fetchProducts(page) as any);
    } catch (error: any) {
      dispatch({
        type: ActionType.CREATE_PRODUCT_ERROR,
        payload: error.message,
      });
    }
  };
};

export const updateProduct = (formData: any, id: number, page: number = 1) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      await axios.put(`${process.env.REACT_APP_PUBLIC_URL}/products/${id}`, {
        name: formData?.name,
        price: formData?.price,
        description: formData?.description,
      });
      dispatch(fetchProducts(page) as any);
    } catch (error: any) {}
  };
};

export const deleteProduct = (id: number, page: number = 1) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      await axios.delete(`${process.env.REACT_APP_PUBLIC_URL}/products/${id}`);
      dispatch(fetchProducts(page) as any);
    } catch (error: any) {}
  };
};
