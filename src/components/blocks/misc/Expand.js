import React, { useState } from "react";
import {Button} from "@material-ui/core";
import PropTypes from "prop-types";

const Expand = (props) => {
  const [isExpand, setExpand] = useState(false);
  let className = 'expand-block';
  if (props.className) {
    className += ` ${props.className}`;
  }

  return <div className={className}>
    <div className="collapsed" style={{display: isExpand ? "block" : "none"}} >
      {props.children}
    </div>
    <Button variant="contained" onClick={() => setExpand(!isExpand)}>{isExpand ? "Collapse" : "Read more"}</Button>
</div>;
};

Expand.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.instanceOf(Array).isRequired
  ]),
};

export default Expand;
