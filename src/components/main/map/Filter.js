import React from 'react';
import {Select, MenuItem} from '@material-ui/core';

export default ({placeTypes, onSelect}) => {
  const options = [<MenuItem value="all" key="all">Filter...</MenuItem>];
  for (let type in placeTypes) {
    options.push(<MenuItem value={type} key={type} className="map-filter-option">{placeTypes[type]}</MenuItem>);
  }

  const changeHandler = (e) => {
    onSelect(e.target.value);
  }

  return <div className="map-filter">
    <p className="map-filter-header">Filter places</p>
    <Select
      className="map-filter-select"
      onChange={changeHandler}
      placeholder="Select category"
      fullWidth={true}
      disableUnderline={true}
      label="Category"
      defaultValue="all"
    >

      {options}
    </Select>
  </div>
};

