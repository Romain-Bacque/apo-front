// hook import
import { forwardRef, memo, useEffect, useImperativeHandle } from "react";
// component import
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import PasswordChecklist from "react-password-checklist";
// custom hook import
import useInput from "../hooks/use-input";

// Component
const Input = forwardRef(
  (
    {
      multiline,
      name,
      onInputChange,
      valueToMatch,
      selectedValue,
      hasConfirmPassword,
      input,
      params,
    },
    ref
  ) => {
    let hasAnError = false;
    let helperTextContent = "";

    const {
      value: inputValue,
      isValid: isInputValid,
      isTouched: isInputTouched,
      valueHandler: inputValueHandler,
      changeHandler: inputChangeHandler,
      blurHandler: inputBlurHandler,
      resetHandler: inputResetHandler,
    } = useInput();

    if (name !== "image") {
      hasAnError = !!(isInputTouched && !isInputValid);
      helperTextContent = hasAnError ? "Entrée incorrecte." : "";
    }

    useEffect(() => {
      const isMatching =
        name === "password" && hasConfirmPassword
          ? inputValue === valueToMatch
          : isInputValid;

      onInputChange(name, { isValid: isMatching, value: inputValue });
    }, [
      onInputChange,
      isInputValid,
      inputValue,
      name,
      valueToMatch,
      hasConfirmPassword,
    ]);

    // Selected value is directly set if we choose an address in custom searchbar
    // Or when update brewery form appear, all inputs are directly filled by brewery data
    useEffect(() => {
      inputValueHandler(selectedValue);
    }, [selectedValue, inputValueHandler]);

    // Customize instance that is exposed to parent component when ref is used
    useImperativeHandle(ref, () => ({
      // eslint-disable-next-line no-restricted-syntax
      resetValue() {
        inputResetHandler();
      },
    }));

    return (
      <>
        <TextField
          ref={ref}
          {...params}
          {...input}
          multiline={!!multiline}
          maxRows={4}
          error={hasAnError}
          helperText={helperTextContent}
          value={inputValue}
          required
          onBlur={inputBlurHandler}
          onChange={inputChangeHandler}
          name={name}
        />
        {isInputTouched && name === "password" && (
          <PasswordChecklist
            rules={[
              "minLength",
              "number",
              "lowercase",
              "capital",
              "specialChar",
              hasConfirmPassword && "match",
            ]}
            minLength={10}
            value={inputValue}
            valueAgain={valueToMatch}
            messages={{
              minLength: "Au moins 10 caractères.",
              number: "Au moins 1 chiffre.",
              lowercase: "Au moins 1 minuscule.",
              capital: "Au moins 1 majuscule.",
              specialChar: "Au moins 1 caractère spécial.",
              match: "Les mots de passe correspondent.",
            }}
          />
        )}
      </>
    );
  }
);

Input.propTypes = {
  multiline: PropTypes.bool,
  onInputChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  valueToMatch: PropTypes.string,
  hasConfirmPassword: PropTypes.bool,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  input: PropTypes.any.isRequired,
  params: PropTypes.any,
};

Input.defaultProps = {
  multiline: null,
  valueToMatch: null,
  selectedValue: null,
  params: null,
  hasConfirmPassword: false,
};

export default memo(Input);
