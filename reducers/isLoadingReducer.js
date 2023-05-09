import { SET_IS_LOADING, SET_TOKEN } from "../types";

const initialState = {
    isLoading: false,
    token: ''
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_TOKEN:
        return {
            ...state,
            token: action.payload
        }
    default:
      return state;
  }
};