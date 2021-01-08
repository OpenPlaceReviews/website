import React from 'react';
import ErrorBoundary from "../main/ErrorBoundary";
import Header from "../blocks/Header";
import Map from "./Map";
import {makeStyles} from "@material-ui/styles";

const useStyle = makeStyles({
    column: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
    }
});

export default function MapLayout() {
    const classes = useStyle();
    return <div className={classes.column}>
        <Header/>
        <ErrorBoundary>
            <Map/>
        </ErrorBoundary>
    </div>
}