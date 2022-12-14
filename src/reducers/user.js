// action type import
import { CHANGE_VALUE, RESET_USER, SAVE_USER, UPDATE_USER } from "../actions";

export const initialState = {
  isLogged: false,
  id: "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  loading: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_VALUE:
      return {
        ...state,
        [action.key]: action.value,
      };
    case RESET_USER:
      return {
        ...state,
        name: "",
        email: "",
        password: "",
        role: "",
        isLogged: false,
      };
    case SAVE_USER:
      return {
        ...state,
        id: action.id,
        email: action.email,
        password: action.password,
        name: action.name,
        role: action.role,
        isLogged: true,
      };
    case UPDATE_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
