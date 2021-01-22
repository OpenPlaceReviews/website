import React from 'react';
import {Select, MenuItem} from '@material-ui/core';
import filter from '../../../assets/images/icons/filter.svg';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  filter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& :focus": {
      background: "none",
    },
    "& p": {
      margin: 0,
    },
  },
  icon: {
    width: "15px",
    height: "15px",
    marginRight: "20px",
  },
  dropdownIcon: {
    color: "#2D69E0",
    top: "-8px",
  },
  dropdown: {
    width: "100%",
    fontWeight: 600,
    fontSize: "16px",
    color: "#2D69E0",
  },
  container: {
    width: "100%",
  },
  header: {
    color: "#666",
    fontSize: "15px",
  }
});

export default ({placeTypes, onSelect}) => {
  const classes = useStyles();

  const options = [<MenuItem value="all" key="all">All</MenuItem>];
  for (let type in placeTypes) {
    options.push(<MenuItem value={type} key={type}>{placeTypes[type]}</MenuItem>);
  }

  const changeHandler = (e) => {
    onSelect(e.target.value);
  }

  return <div className={classes.filter}>
    <img src={filter} alt="icon" className={classes.icon} />
    <div className={classes.container}>
      <p className={classes.header}>Filter places</p>
      <Select
          classes={{
            root: classes.dropdown,
            icon: classes.dropdownIcon,
          }}
          className={classes.select}
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
  </div>
};

