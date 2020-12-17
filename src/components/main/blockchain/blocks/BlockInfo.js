import React from 'react';
import JSONViewer from "./JSONViewer";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  block: {
    background: "#F2F2F2",
    border: "1px solid #F0F1F4",
    borderRadius: "5px",
    padding: "15px",
    margin: "10px 0 25px 0",
    color: "#6A7181",
    "& p": {
      margin: "5px",
    },
    "& span": {
      color: "#000",
    },
    "& .selection": {
      color: "#2D69E0",
    }
  },
})

export default ({block, children}) => {
  const classes = useStyles();

  const {
    hash,
    id,
    signed_by,
  } = block;

  let signedText;
  if (Array.isArray(signed_by)){
    signedText = signed_by.join(', ');
  } else {
    signedText = signed_by;
  }

  return <div>
    <div className={classes.block}>
      <p>Block id: <span className="selection">#{id}</span></p>
      <p>Hash: <span>{hash}</span></p>

      {children}

      <p>Signed by: <span>#{signedText}</span></p>
    </div>
    <JSONViewer json={block} open={true}/>
  </div>;
};
