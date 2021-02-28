import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import { Select, MenuItem } from '@material-ui/core';
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
    },
    dateItem: {
        background: "#F1F4FC",
        border: "1px solid #C3CFE6",
        borderRadius: "5px",
        width: "100px",
        height: "24px",
        fontSize: "15px",
        "& .MuiSelect-root": itemStyle,
    }
});


export default ({ taskSelection, onSelect }) => {
    const classes = useStyles();

    const { taskId, startDate, endDate } = taskSelection;
    const [selectedTaskId, setSelectedTaskId] = useState(taskId);
    const [selectedDate, setSelectedDate] = useState(startDate);

    const tasks = Tasks.getTasks();

    const options = [<MenuItem value="none" key="none">None</MenuItem>];
    for (let i in tasks) {
        const task = tasks[i];
        options.push(<MenuItem value={task.id} key={task.id}>{task.name}</MenuItem>);
    }

    const changeHandler = (e) => {
        setSelectedTaskId(e.target.value);
    }

    useEffect(() => {
        onSelect({
            taskId: selectedTaskId,
            startDate: selectedDate,
            endDate: selectedDate
        });
    }, [selectedTaskId, selectedDate]);

    return <div className={classes.filter}>
        <img src={filter} alt="icon" className={classes.icon} />
        <div className={classes.container}>
            <p className={classes.header}>Task</p>
            <Select
                classes={{
                    root: classes.dropdown,
                    icon: classes.dropdownIcon,
                }}
                className={classes.select}
                onChange={changeHandler}
                placeholder="Select task"
                fullWidth={true}
                disableUnderline={true}
                label="Task"
                value={taskId}
            >
                {options}
            </Select>
            <div className={classes.dates}>
                <DatePicker className={classes.dateItem} popperPlacement="top-end" dateFormat="MM/yyyy"
                    showMonthYearPicker showFullMonthYearPicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
            </div>
        </div>
    </div>
};

