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

  const {taskId, startDate, endDate, reviewedPlacesVisible, closedPlaces, potentiallyClosedPlaces, dateType} = taskSelection;
  const [selectedTaskId, setSelectedTaskId] = useState(taskId);
  const [selectedDateType, setSelectedDateType] = useState(dateType);
  const [selectedDates, setSelectedDates] = useState({startDate, endDate});
  const [selectedReviewedPlacesVisible, setSelectedReviewedPlacesVisible] = useState(reviewedPlacesVisible);
  const [selectedClosedPlaces, setSelectedClosedPlaces] = useState(closedPlaces);
  const [selectedPotentiallyClosedPlaces, setSelectedPotentiallyClosedPlaces] = useState(potentiallyClosedPlaces);

  const tasks = Tasks.getTasks();
  const selectedTask = Tasks.getTaskById(taskSelection.taskId);

  const taskOptions = [<MenuItem value="none" key="none">None</MenuItem>];
  for (let i in tasks) {
    const task = tasks[i];
    taskOptions.push(<MenuItem value={task.id} key={task.id}>{task.name}</MenuItem>);
  }

  const dates = ['month', 'tiles'];
  const dateTypes = [];
  for (let i in dates) {
    const date = dates[i];
    if (taskId !== 'REVIEW_TRIPADVISOR' && date === 'month') {
      dateTypes.push(<MenuItem value="month" key="month">Changes By Month</MenuItem>);
    }
    if (date === 'tiles') {
      dateTypes.push(<MenuItem value="tiles" key="tiles">As on map</MenuItem>);
    }

  }

  const categoryOptions = [<MenuItem value="all" key="all">All</MenuItem>];
  for (let type in placeTypes) {
    categoryOptions.push(<MenuItem value={type} key={type}>{placeTypes[type]}</MenuItem>);
  }

  const taskChangeHandler = (e) => {
    setSelectedTaskId(e.target.value);
    setSelectedDateType('tiles')
  }

  const categoryChangeHandler = (e) => {
    onCategorySelect(e.target.value);
  }

  const dateTypeChangeHandler = (e) => {
    setSelectedDateType(e.target.value);
  }

  const dateMonthChangeHandler = (date) => {
    setSelectedDates({
      startDate: new Date(date.getFullYear(), date.getMonth(), 1),
      endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0)
    });
  }

  useEffect(() => {
    if (selectedDateType === 'month') {
      const date = new Date();
      setSelectedDates({
        startDate: new Date(date.getFullYear(), date.getMonth(), 1),
        endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0)
      });
    }
  }, [selectedDateType]);

  useEffect(() => {
    if (selectedDateType === 'tiles') {
      const date = new Date();
      setSelectedDates({
        startDate: new Date(date.getFullYear(), date.getMonth() - 12, 1),
        endDate: new Date(date.getFullYear(), date.getMonth() + 1, 1)
      });
    }
  }, [selectedDateType]);

  useEffect(() => {
    onTaskSelect({
      taskId: selectedTaskId,
      startDate: selectedDates.startDate,
      endDate: selectedDates.endDate,
      reviewedPlacesVisible: selectedReviewedPlacesVisible,
      closedPlaces: selectedClosedPlaces,
      potentiallyClosedPlaces: selectedPotentiallyClosedPlaces,
      dateType: selectedDateType
    });
  }, [selectedTaskId, selectedDates, selectedReviewedPlacesVisible, selectedClosedPlaces, selectedPotentiallyClosedPlaces, selectedDateType]);

  const toggleReviewedPlacesVisible = () => {
    setSelectedReviewedPlacesVisible((prev) => !prev);
  };

  const toggleSelectedClosedPlaces = () => {
    setSelectedClosedPlaces((prev) => !prev);
  };

  const toggleSelectedPotentiallyClosedPlaces = () => {
    setSelectedPotentiallyClosedPlaces((prev) => !prev);
  };

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
      {isLoggedIn && !selectedTask && <>
        <div style={{marginBottom: "10px"}} className={classes.switch}>
          <span style={{marginLeft: "10px"}}>Show closed places</span>
          <Switch
              className={classes.position}
              checked={selectedClosedPlaces}
              classes={{
                switchBase: classes.switchBase,
                track: classes.track,
                checked: classes.checked
              }}
              value={selectedClosedPlaces} onClick={toggleSelectedClosedPlaces}/>
        </div>
        <div className={classes.switch}>
          <span style={{marginLeft: "10px"}}>Show potentially closed places</span>
          <Switch
              className={classes.position}
              checked={selectedPotentiallyClosedPlaces}
              classes={{
                switchBase: classes.switchBase,
                track: classes.track,
                checked: classes.checked
              }}
              value={selectedPotentiallyClosedPlaces} onClick={toggleSelectedPotentiallyClosedPlaces}/>
        </div>
      </>}
      {isLoggedIn && selectedTask && <>
        <p className={classes.header}>Review</p>
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
          label="Review"
          value={dateType}
          defaultValue="tiles"
        >
          {dateTypes}
        </Select>
        {(dateType === 'month') && <div className={classes.dates}>
          <DatePicker className={classes.dateItem} popperPlacement="bottom-end" dateFormat="MM/yyyy"
                      showMonthYearPicker showFullMonthYearPicker selected={selectedDates.startDate}
                      onChange={date => dateMonthChangeHandler(date)}/>
        </div>}
        <div className={classes.switch}>
          <span style={{marginLeft: "10px"}}>Display reviewed places</span>
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
  </div>
};


