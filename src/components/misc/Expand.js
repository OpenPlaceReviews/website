import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "./Tabs";

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
    <div className="collapsed_btn" onClick={() => setExpand(!isExpand)}>{isExpand ? "Collapse" : "Read more"}</div>
</div>;
};

Expand.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.instanceOf(Array).isRequired
  ]),
};

export default Expand;
