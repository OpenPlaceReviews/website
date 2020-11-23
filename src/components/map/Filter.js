import React from 'react';
import {Select, MenuItem} from '@material-ui/core';

export default (options, onSelect) => {
  return <div className="map-filter">
    <p className="map-filter-header">Filter places</p>
    <Select
      className="map-filter-select"
      onChange={onSelect}
      placeholder="Select category"
      fullWidth={true}
      disableUnderline={true}
      label="Category"
    >
      {options.length && options.map((option, i) => <MenuItem value={option} key={i} className="map-filter-option">{option}</MenuItem>)}
    </Select>
  </div>
};

