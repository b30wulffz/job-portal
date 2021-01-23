import { TextField } from "@material-ui/core";

const EmailInput = (props) => {
  const {
    label,
    value,
    onChange,
    inputErrorHandler,
    setInputErrorHandler,
    required,
  } = props;

  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
      helperText={inputErrorHandler.email.message}
      onBlur={(event) => {
        if (event.target.value === "") {
          if (required) {
            setInputErrorHandler({
              ...inputErrorHandler,
              email: {
                error: true,
                message: "Email is required",
              },
            });
          }
        } else {
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (re.test(String(event.target.value).toLowerCase())) {
            setInputErrorHandler({
              ...inputErrorHandler,
              email: {
                error: false,
                message: "",
              },
            });
          } else {
            setInputErrorHandler({
              ...inputErrorHandler,
              email: {
                error: true,
                message: "Incorrect email",
              },
            });
          }
        }
      }}
      error={inputErrorHandler.email.error}
    />
  );
};

export default EmailInput;
