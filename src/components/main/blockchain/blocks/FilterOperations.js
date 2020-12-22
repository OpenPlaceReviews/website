import React, {useContext} from 'react';
import {makeStyles} from "@material-ui/styles";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OperationsContext from "../providers/OperationsContext";
import OperationIcon from "../assets/icons/OperationIcon";
import BlockIcon from "../assets/icons/BlockIcon";
import AllTypesIcon from "../assets/icons/AllTypesIcon";

const itemStyle = {
  display: "flex",
  alignItems: "center",
  height: "40px",
  minWidth: "200px",
  textAlign: "left",
  paddingTop: 0,
  paddingBottom: 0,
};

const useStyles = makeStyles({
  dropdown: {
    background: "#F1F4FC",
    border: "1px solid #C3CFE6",
    borderRadius: "5px",
    minWidth: "200px",
    height: "40px",
    "& .MuiSelect-root": itemStyle,
  },
  item: itemStyle,
  title: {
    marginLeft: "8px",
  }
});

export default function FilterOperations({onChange, value}) {
  const {operations, loading, types} = useContext(OperationsContext);
  const classes = useStyles();

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  let options = [];
  if (!loading) {
    options = operations.map((op, i) => {
      const OpClass = types[op.id];
      const baseName = OpClass.getName(0);
      const icon = OpClass.getIcon();
      let IconComponent = OperationIcon[icon];
      if (!IconComponent) {
        IconComponent = BlockIcon;
      }

      return <MenuItem key={i} value={op.id} className={classes.item}>
        <IconComponent/>
        <p className={classes.title}>{baseName}</p>
      </MenuItem>;
    });
  }

  return <Select
    className={classes.dropdown}
    onChange={handleChange}
    value={value}
    autoWidth={true}
    defaultValue={value}
    displayEmpty={true}
    variant={"outlined"}
  >
    <MenuItem value="" className={classes.item}>
      <AllTypesIcon/>
      <p className={classes.title}>All types</p>
    </MenuItem>
    {options}
  </Select>
};
