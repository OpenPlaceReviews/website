import React from "react";
import {Button} from "@material-ui/core";

export default function SubmitButton(props) {
    return <Button
        {...props}
        variant="outlined"
        type="submit"
        color="primary"
    >
        {props.children}
    </Button>
}