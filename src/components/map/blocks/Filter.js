import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import {Select, MenuItem, Switch} from '@material-ui/core';
import filter from '../../../assets/images/icons/filter.svg';
import { makeStyles } from "@material-ui/styles";
import Tasks from "../tasks/Tasks";

import "react-datepicker/dist/react-datepicker.css";

const itemStyle = {
  display: "flex",
  alignItems: "center",
  textAlign: "left",
  fontSize: "15px",
  paddingTop: 0,
  paddingBottom: 0,
};

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
  },
  item: itemStyle,
  title: {
    marginLeft: "8px",
  },
  dates: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: "10px"
  },
  dateItem: {
    background: "#F1F4FC",
    border: "1px solid #C3CFE6",
    borderRadius: "5px",
    width: "100px",
    height: "24px",
    fontSize: "15px",
    "& .MuiSelect-root": itemStyle,
  },
  dateItem2: {
    marginLeft: "10px",
    background: "#F1F4FC",
    border: "1px solid #C3CFE6",
    borderRadius: "5px",
    width: "100px",
    height: "24px",
    fontSize: "15px",
    "& .MuiSelect-root": itemStyle,
  },
  switch: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "10px",
    paddingBottom: "10px",
    fontSize: "14px",
    color:"#697281",
    background:"#F5F5F5",
    borderRadius:"6px"
  },
  position: {
    position: "absolute",
    left:"80%"
  },
  switchBase: {
    color: "#2D69E0",
    '&$checked': {
      color: "#2D69E0",
    },
    '&$checked + $track': {
      backgroundColor: "#2D69E0",
    },
  },
  track: {},
  checked: {},
});

export default ({ isLoggedIn, placeTypes, onCategorySelect, taskSelection, onTaskSelect }) => {
  const classes = useStyles();

  const {taskId, startDate, endDate, reviewedPlacesVisible} = taskSelection;
  const [selectedTaskId, setSelectedTaskId] = useState(taskId);
  const [dateType, setDateType] = useState('month');
  const [selectedDates, setSelectedDates] = useState({startDate, endDate});
  const [selectedReviewedPlacesVisible, setSelectedReviewedPlacesVisible] = useState(reviewedPlacesVisible);

  const tasks = Tasks.getTasks();

  const taskOptions = [<MenuItem value="none" key="none">None</MenuItem>];
  for (let i in tasks) {
    const task = tasks[i];
    taskOptions.push(<MenuItem value={task.id} key={task.id}>{task.name}</MenuItem>);
  }

  const categoryOptions = [<MenuItem value="all" key="all">All</MenuItem>];
  for (let type in placeTypes) {
    categoryOptions.push(<MenuItem value={type} key={type}>{placeTypes[type]}</MenuItem>);
  }

  const taskChangeHandler = (e) => {
    setSelectedTaskId(e.target.value);
  }

  const categoryChangeHandler = (e) => {
    onCategorySelect(e.target.value);
  }

  const dateTypeChangeHandler = (e) => {
    setDateType(e.target.value);
  }

  const dateMonthChangeHandler = (date) => {
    setSelectedDates({
      startDate: new Date(date.getFullYear(), date.getMonth(), 1),
      endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0)
    });
  }

  useEffect(() => {
    if (dateType === 'month') {
      const date = selectedDates.startDate;
      setSelectedDates({
        startDate: new Date(date.getFullYear(), date.getMonth(), 1),
        endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0)
      });
    }
  }, [dateType]);

  useEffect(() => {
    onTaskSelect({
      taskId: selectedTaskId,
      startDate: selectedDates.startDate,
      endDate: selectedDates.endDate,
      reviewedPlacesVisible: selectedReviewedPlacesVisible
    });
  }, [selectedTaskId, selectedDates, selectedReviewedPlacesVisible]);

  const toggleReviewedPlacesVisible = () => {
    setSelectedReviewedPlacesVisible((prev) => !prev);
  };

  function showSwitchReviewedPlaces() {
    return <div>
      {isLoggedIn && taskId !== "none" && <>
        <div className={classes.switch}>
          <span>Display reviewed places</span>
          <Switch
              className={classes.position}
              checked={selectedReviewedPlacesVisible}
              classes={{
                switchBase: classes.switchBase,
                track: classes.track,
                checked: classes.checked
              }}
              value={selectedReviewedPlacesVisible} onClick={toggleReviewedPlacesVisible}/>
        </div>
      </>}
    </div>
  }

  return <div className={classes.filter}>
    <img src={filter} alt="icon" className={classes.icon} />
    <div className={classes.container}>
      {isLoggedIn && <>
        <p className={classes.header}>Task</p>
        <Select
          classes={{
            root: classes.dropdown,
            icon: classes.dropdownIcon,
          }}
          className={classes.select}
          onChange={taskChangeHandler}
          placeholder="Select task"
          fullWidth={true}
          disableUnderline={true}
          label="Task"
          value={taskId}
        >
          {taskOptions}
        </Select>
      </>}
      <p className={classes.header}>Filter places</p>
      <Select
        classes={{
          root: classes.dropdown,
          icon: classes.dropdownIcon,
        }}
        className={classes.select}
        onChange={categoryChangeHandler}
        placeholder="Select category"
        fullWidth={true}
        disableUnderline={true}
        label="Category"
        defaultValue="all"
      >
        {categoryOptions}
      </Select>
      {isLoggedIn && taskId !== "none" && <>
        <p className={classes.header}>Date type</p>
        <Select
          classes={{
            root: classes.dropdown,
            icon: classes.dropdownIcon,
          }}
          className={classes.select}
          onChange={dateTypeChangeHandler}
          placeholder="Select date type"
          fullWidth={true}
          disableUnderline={true}
          label="Date type"
          defaultValue="month"
        >
          <MenuItem value="month" key="month">Month</MenuItem>
          <MenuItem value="days" key="days">Range</MenuItem>
        </Select>

        {(dateType === 'month') && <div className={classes.dates}>
          <DatePicker className={classes.dateItem} popperPlacement="bottom-end" dateFormat="MM/yyyy"
            showMonthYearPicker showFullMonthYearPicker selected={selectedDates.startDate} onChange={date => dateMonthChangeHandler(date)} />
        </div>}
        {(dateType === 'days') && <div className={classes.dates}>
          <DatePicker
            className={classes.dateItem}
            popperPlacement="bottom-end"
            selected={selectedDates.startDate}
            onChange={date => setSelectedDates({ startDate: date, endDate: selectedDates.endDate })}
            selectsStart
            startDate={selectedDates.startDate}
            endDate={selectedDates.endDate}
          />
          <DatePicker
            className={classes.dateItem2}
            popperPlacement="bottom-end"
            selected={selectedDates.endDate}
            onChange={date => setSelectedDates({ startDate:selectedDates.startDate, endDate: date })}
            selectsEnd
            startDate={selectedDates.startDate}
            endDate={selectedDates.endDate}
            minDate={selectedDates.startDate}
          />
        </div>}
        {showSwitchReviewedPlaces()}
      </>}
    </div>
  </div>
};

