import React from "react";
import Expand from "../../../blocks/misc/Expand";
import TOSHtml from "./terms_of_service.html";
import PropTypes from "prop-types";

const TOSBlock = ({onChange, isAccept}) => {
  return <div className="form-item-boolean">
    <div className="signup-checkbox-block">
      <label className="box-label">
        <input
          type="checkbox"
          required="True"
          name="terms_of_service"
          onChange={onChange}
          checked={isAccept ? "checked" : ""}
        />
        <span className="box"></span>
      </label>
      <div>
        <div className="signup-input-label">I agree with <a href="terms_of_service.html" target="_blank">Terms of Service</a></div>
        <div className="signup-input-description">Please accept Terms of Service before using website.
        </div>
      </div>
    </div>
    <Expand className="inject">
      <div dangerouslySetInnerHTML={{__html: TOSHtml}}/>
    </Expand>
  </div>;
};

TOSBlock.propTypes = {
  onChange: PropTypes.func.isRequired,
  isAccept: PropTypes.bool
};

export default TOSBlock;
