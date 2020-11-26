import React from "react";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

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
    <div className="optional-fields-grid">
      <div className="optional-field">
        <div className="optional_field_lable">Spoken languages:</div>
        <TextField
          name="languages"
          onChange={onChange}
          select
          fullWidth={true}
          SelectProps={{
            multiple: true,
            value: languages.value
          }}
          placeholder="Please select your languages"
          helperText={languages.error ? languages.error : ''}
        >
          {langOptions.map((lang) => <MenuItem value={lang.code} key={lang.code}>{lang.name}</MenuItem>)}
        </TextField>
      </div>
      <div className="optional-field">
        <div className="optional_field_lable">Country you live:</div>
        <TextField
          name="country"
          select
          fullWidth={true}
          placeholder="Please select your country"
          onChange={onChange}
          value={country.value}
          helperText={country.error ? country.error : ''}
        >
          {countiesData.map((country) => <MenuItem value={country["alpha-3"]} key={country["alpha-3"]}>{country.name}</MenuItem>)}
        </TextField>
      </div>
    </div>
  </div>;
};

export default OptionalUserFields;
