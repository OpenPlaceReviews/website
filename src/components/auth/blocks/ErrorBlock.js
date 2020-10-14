import React from "react";
import PropTypes from "prop-types";

const ErrorBlock = ({message}) => {
  return <div className="form-error">
    {message}
  </div>;
};

ErrorBlock.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorBlock;
