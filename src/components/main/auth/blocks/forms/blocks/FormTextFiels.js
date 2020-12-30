import React from "react";
import {TextField} from "@material-ui/core";

export default function FormTextField(props) {
  return <TextField
      {...props}
      variant="outlined"
      error={!!props.error}
      helperText={props.error ? props.error : props.helperText}
      fullWidth={true}
  />
};