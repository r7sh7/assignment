import request from "../api";
import {
  EMAIL_CONTENT_FAILURE,
  EMAIL_CONTENT_REQUEST,
  EMAIL_CONTENT_SUCCESS,
  EMAIL_LIST_FAILURE,
  EMAIL_LIST_REQUEST,
  EMAIL_LIST_SUCCESS,
} from "./constants";

export const getEmailList = (read) => async (dispatch) => {
  try {
    dispatch({ type: EMAIL_LIST_REQUEST });
    const { data } = await request.get("/");
    const list = data.list.reduce((acc, element) => {
      if (!read.includes(element.id)) {
        return [element, ...acc];
      }
      return [...acc, element];
    }, []);
    dispatch({
      type: EMAIL_LIST_SUCCESS,
      payload: list,
    });
  } catch (err) {
    dispatch({
      type: EMAIL_LIST_FAILURE,
      payload: err.message,
    });
  }
};

export const getEmailById = (id) => async (dispatch) => {
  try {
    dispatch({ type: EMAIL_CONTENT_REQUEST });
    const { data } = await request.get("/", {
      params: {
        id,
      },
    });
    dispatch({
      type: EMAIL_CONTENT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: EMAIL_CONTENT_FAILURE,
      payload: err.message,
    });
  }
};
