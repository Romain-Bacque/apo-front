// hook import
import { useCallback, useReducer } from "react";

const initialState = {
  enteredValue: "",
  isValid: false,
  isTouched: false,
  passwordState: [],
};

const inputReducer = (state, action) => {
  if (action.type === "VALUE") {
    if (action.value) {
      return { ...state, isValid: true, enteredValue: action.value };
    }
    return { ...state, isValid: false, enteredValue: "" };
  }
  if (action.type === "CHANGE") {
    switch (action.value.type) {
      case "password":
        const lowerCaseLetters = /[a-z]/;
        const upperCaseLetters = /[A-Z]/;
        const numbers = /[0-9]/;
        const specialChar = /[#?!@$%^&*-/]/;

        if (
          action.value.value.length >= 10 &&
          action.value.value.match(lowerCaseLetters) &&
          action.value.value.match(upperCaseLetters) &&
          action.value.value.match(numbers) &&
          action.value.value.match(specialChar)
        ) {
          return {
            ...state,
            isValid: true,
            enteredValue: action.value.value,
          };
        }
        break;
      case "text":
      case "textarea":
        if (action.value.value.length > 0) {
          return {
            ...state,
            isValid: action.value.name !== "location",
            enteredValue: action.value.value,
          };
        }
        break;
      case "select-one":
        if (action.value.value.length > 0) {
          const options = action.value;
          const { id } = options[options.selectedIndex];

          if (id) {
            return {
              ...state,
              isValid: true,
              enteredValue: id,
            };
          }
        }
        break;
      case "email":
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (action.value.value.match(mailformat)) {
          return { ...state, isValid: true, enteredValue: action.value.value };
        }
        break;
      case "number":
        if (action.value.value > 0 && action.value.value <= 4) {
          return { ...state, isValid: true, enteredValue: action.value.value };
        }
        break;
      case "tel":
        const phoneNumber = /^((\+)33|0|0033)[1-9](\d{2}){4}$/;

        if (action.value.value.match(phoneNumber)) {
          return { ...state, isValid: true, enteredValue: action.value.value };
        }
        break;
      case "date":
        return { ...state, isValid: true, enteredValue: action.value.value };
      default:
        console.log(`Sorry, we are out of ${action.value.type}.`);
    }
    return { ...state, isValid: false, enteredValue: action.value.value };
  }
  if (action.type === "BLUR") {
    return { ...state, isTouched: true };
  }
  if (action.type === "RESET") {
    return initialState;
  }
  return state;
};

const useInput = () => {
  const [inputState, dispatch] = useReducer(inputReducer, initialState);

  const valueHandler = useCallback((value) => {
    dispatch({ type: "VALUE", value });
  }, []);

  const changeHandler = useCallback((event) => {
    dispatch({ type: "CHANGE", value: event.target });
  }, []);

  const blurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const resetHandler = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.enteredValue,
    isValid: inputState.isValid,
    isTouched: inputState.isTouched,
    valueHandler,
    changeHandler,
    blurHandler,
    resetHandler,
  };
};

export default useInput;
