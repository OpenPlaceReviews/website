import React from "react";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#ebf2f5",
    color: "#596680",
    textAlign: "center",
    height: "50px",
    "& p": {
      margin: "0 auto",
      paddingTop: "10px",
    },
  },
});

export default () => {
  const classes = useStyles();

  return <footer className={classes.root}>
    <p>&copy; 2020 <a href="https://openplacereviews.org/">OpenPlaceReviews.org</a></p>
  </footer>;
};
