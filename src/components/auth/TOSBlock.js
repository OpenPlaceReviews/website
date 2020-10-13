import React from "react";
import Expand from "../misc/Expand";
import TOSHtml from "../../assets/legacy/terms_of_service.html";

export default () => {
  return <div className="form-item-boolean">
    <div className="signup-checkbox-block">
      <label className="box-label">
        <input type="checkbox" required="True" name="terms_of_service"/>
        <span className="box"></span>
      </label>
      <div>
        <div className="signup-input-label">I agree with <a href="../../assets/legacy/terms_of_service.html" target="_blank">Terms of Service</a></div>
        <div className="signup-input-description">Please accept Terms of Service before using website.
        </div>
      </div>
    </div>
    <Expand className="inject">
      <div dangerouslySetInnerHTML={{__html: TOSHtml}}/>
    </Expand>
  </div>;
};
