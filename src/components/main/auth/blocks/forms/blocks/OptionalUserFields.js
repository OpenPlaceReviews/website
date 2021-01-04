import React from "react";
import {makeStyles} from "@material-ui/styles";

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {Box} from "@material-ui/core";

import countiesData from "../../../../../../assets/countries.json";
import langData from "../../../../../../assets/iso_639-1_languages.json";

const useStyles = makeStyles({
  container: {
    marginBottom: "30px",
  },
  header: {
    fontStyle: "normal",
    fontWeight: 800,
    lineHeight: "25px",
    fontSize: "20px",
    letterSpacing: ".03em",
    color: "#140579",
    marginTop: "30px",
    marginBottom: "15px",
  },
  formGroup: {
    lineHeight: "1.15em",
    marginBottom: "15px",
    width: "250px",
    "& .label": {
      lineHeight: "26px",
    }
  }
});

const OptionalUserFields = ({onChange, languages, country}) => {
  const langOptions = [];
  for(let langCode in langData) {
    if (!langData.hasOwnProperty(langCode)) continue;

    const lang = langData[langCode];
    langOptions.push({code: langCode, name: `${lang.name}-${lang.native}`});
  }

  const classes = useStyles();

  return <div className={classes.container}>
    <div className={classes.header}>Optional fields</div>
    <Box display="flex" justifyContent="space-between">
      <div className={classes.formGroup}>
        <div className="label">Spoken languages:</div>
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
          error={(!!languages.error)}
          helperText={languages.error ? languages.error : ''}
        >
          {langOptions.map((lang) => <MenuItem value={lang.code} key={lang.code}>{lang.name}</MenuItem>)}
        </TextField>
      </div>
      <div className={classes.formGroup}>
        <div className="label">Country you live:</div>
        <TextField
            name="country"
            select
            fullWidth={true}
            placeholder="Please select your country"
            onChange={onChange}
            value={country.value}
            error={(!!country.error)}
            helperText={country.error ? country.error : ''}
        >
          {countiesData.map((country) => <MenuItem value={country["alpha-3"]} key={country["alpha-3"]}>{country.name}</MenuItem>)}
        </TextField>
      </div>
    </Box>
  </div>;
};

export default OptionalUserFields;
