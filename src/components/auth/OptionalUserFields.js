import React from "react";

import counties from "../../assets/countries";
import languages from "../../assets/iso_639-1_languages";

export default () => {
  const langOptions = [];
  for(let langCode in languages) {
    if (!languages.hasOwnProperty(langCode)) continue;

    const lang = languages[langCode];
    langOptions.push({code: langCode, name: `${lang.name}-${lang.native}`});
  }

  return <div className="optional-fields">
    <div className="headline-optional-fields">Optional fields</div>
    <div className="optional-field">
      <div className="optional_field_lable">Spoken languages:</div>
      <select name="languages">
        {langOptions.map((lang) => <option value={lang.code} key={lang.code}>{lang.name}</option>)}
      </select>
    </div>
    <div className="optional-field">
      <div className="optional_field_lable">Country you live:</div>
      <select name="country">
        {counties.map((country) => <option value={country["alpha-3"]} key={country["alpha-3"]}>{country.name}</option>)}
      </select>
    </div>
  </div>;
};
