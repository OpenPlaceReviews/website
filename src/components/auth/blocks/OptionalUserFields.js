import React from "react";
import PropTypes from "prop-types";

import countiesData from "../../../assets/countries";
import langData from "../../../assets/iso_639-1_languages";

const OptionalUserFields = ({onChange, languages, country}) => {
  const langOptions = [];
  for(let langCode in langData) {
    if (!langData.hasOwnProperty(langCode)) continue;

    const lang = langData[langCode];
    langOptions.push({code: langCode, name: `${lang.name}-${lang.native}`});
  }

  return <div className="optional-fields">
    <div className="headline-optional-fields">Optional fields</div>
    <div className="optional-field">
      <div className="optional_field_lable">Spoken languages:</div>
      <select name="languages" onChange={onChange} multiple={true} value={languages}>
        {langOptions.map((lang) => <option value={lang.code} key={lang.code}>{lang.name}</option>)}
      </select>
    </div>
    <div className="optional-field">
      <div className="optional_field_lable">Country you live:</div>
      <select name="country" onChange={onChange} value={country ? country : ''}>
        {countiesData.map((country) => <option value={country["alpha-3"]} key={country["alpha-3"]}>{country.name}</option>)}
      </select>
    </div>
  </div>;
};

OptionalUserFields.propTypes = {
  onChange: PropTypes.func.isRequired,
  languages: PropTypes.instanceOf(Array),
  country: PropTypes.string,
};

export default OptionalUserFields;
