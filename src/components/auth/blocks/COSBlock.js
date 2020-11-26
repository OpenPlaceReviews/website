import React from "react";
import PropTypes from 'prop-types';

import Expand from "../../misc/Expand";
import COSHtml from "../../../assets/legacy/contributor_terms.html";

const COSBlock = ({onChange, isAccept}) => {
  return <div className="form-item-boolean">
    <div className="signup-checkbox-block">
      <label className="box-label">
        <input
          type="checkbox"
          required="True"
          name="contribution_terms"
          onChange={onChange}
          checked={isAccept ? "checked" : ""}
        />
        <span className="box"></span>
      </label>
      <div>
        <div className="signup-input-label">
          I agree with <a href="../../../assets/legacy/contributor_terms.html" target="_blank">Contribution Terms</a>
        </div>
        <div className="signup-input-description">
          Please read Contribution Terms carefully and accept it before website. Your contributions will be provided under CC-0 License.
        </div>
      </div>
    </div>
    <Expand className="inject">
      <div dangerouslySetInnerHTML={{__html: COSHtml}}/>
    </Expand>
  </div>;
};

COSBlock.propTypes = {
  onChange: PropTypes.func.isRequired,
  isAccept: PropTypes.bool
};

export default COSBlock;
