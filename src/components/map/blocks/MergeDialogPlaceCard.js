import React from 'react';

import {makeStyles} from "@material-ui/styles";
import {Button, CardContent, GridListTile, Link, TextField} from "@material-ui/core";
import Value from "../../main/blockchain/blocks/Value";
import AttributesBarList from "./AttributesBarList";
import ImagesBlock from "./ImagesBlock";
import Utils from "../../util/Utils";

const useStyles = makeStyles({
    header: {
        fontSize: "22px",
        fontWeight: 600,
        lineHeight: "22px"
    },
    mergeLatLon: {
        textAlign: "center",
        fontSize: "14px",
        color: "#6A7181",
        marginTop: "-2%"
    },
    mergeSubtitle: {
        textAlign: "center",
        fontSize: "14px",
        color: "#6A7181",
        marginTop: "-5%"
    },
    button: {
        height: "35px",
        marginBottom: "10px",
        backgroundColor: "#2D69E0",
        color: "#FFFFFF"
    },
    buttonClose: {
        height: "35px",
        marginBottom: "10px",
        color: "#2D69E0",
        backgroundColor: "#F1F4FC"
    },
    icon: {
        width: "24px",
        height: "24px",
        margin: "5px 12px 0 0",
    },
    tile: {
        boxShadow: "0 2px 4px rgba(0, 0, 0, .2)",
        borderColor: "#2D69E0",
        backgroundColor: "#FFFFFF",
        transform: "rotateX(180deg)",
        maxWidth: "400px !important",
    },
    item: {
        minHeight: "280px",
        maxWidth: "840px !important",
        minWidth: "640px !important",
        marginTop: "5px"
    },
    comment: {
        width: "280px",
        "& .MuiFilledInput-input": {
            padding: "10px 25px 5px 10px",
        },
        paddingBottom: "5px"
    }
})
export default function MergeDialogPlaceCard({
                                                 place,
                                                 info,
                                                 mergeToInfo,
                                                 categories,
                                                 handleOptionalComment,
                                                 createClosedPlace,
                                                 setMergeFrom,
                                                 allowToMerge
                                             }) {

    const classes = useStyles();

    const handleMergePlace = () => {
        setMergeFrom(place);
    };

    const handlePermanentlyClosed = () => {
        createClosedPlace();
    };

    function getDistance() {
        return " (" + Math.round(Utils.getDistance(
            info.latLon[0].toFixed(5),
            info.latLon[1].toFixed(5),
            mergeToInfo.latLon[0].toFixed(5),
            mergeToInfo.latLon[1].toFixed(5))) + "m)";
    }

    return <GridListTile classes={{tile: classes.tile}}>
        {info && <CardContent>
            <div>{mergeToInfo && <Button type="submit"
                                         disabled={!place || !allowToMerge}
                                         className={classes.button}
                                         variant="contained"
                                         onClick={handleMergePlace}>
                Merge with
            </Button>}
            </div>
            <div>
                {!mergeToInfo && <Button type="submit"
                                         className={classes.button}
                                         variant="contained"
                                         onClick={handlePermanentlyClosed}>
                    Permanently closed
                </Button>}
            </div>
            {!mergeToInfo && <TextField
                autoFocus
                required
                value={mergeToInfo}
                id="filled-required"
                placeholder="Comment for permanently closed place"
                variant="filled"
                className={classes.comment}
                onChange={handleOptionalComment}/>
            }
            <p style={{textAlign: "center", fontSize: "16px"}}
               className={classes.header}>{info.title}</p>
            <p style={{textAlign: "center", fontSize: "16px"}}
               className={classes.mergeSubtitle}>{info.subtitle}</p>
            <p style={{textAlign: "center", fontSize: "14px", color: "#2d69e0"}}>
                <Link
                    href={`/map/opr.place/${place.opr_id}?q=15/${info.latLon[0].toFixed(5)}/${info.latLon[1].toFixed(5)}`}>
                    View</Link>
            </p>
            <p className={classes.mergeLatLon}>
                <Value>{info.latLon[0].toFixed(5)},{info.latLon[1].toFixed(5)}
                    {mergeToInfo && getDistance()}</Value>
            </p>
            {<AttributesBarList place={info}
                                inactiveLinksVisible={true}
                                isOpen={true}/>}
            <ImagesBlock place={place}
                         isOriginalPlace={false}
                         categories={categories}/>
        </CardContent>}

    </GridListTile>
}