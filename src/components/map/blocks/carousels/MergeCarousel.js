import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {CardContent, GridList, GridListTile, Link} from "@material-ui/core";
import Value from "../../../main/blockchain/blocks/Value";
import {makeStyles} from '@material-ui/core/styles';
import AttributesBarList from "../AttributesBarList";
import ImagesBlock from "../ImagesBlock";
import Utils from "../../../util/Utils";

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
    dialog: {
        "& .MuiDialogActions-root": {
            padding: "5px 24px 5px 0",
        },
        "& .MuiDialog-paperWidthSm": {
            maxWidth: "740px !important",
        }
    },
    tile: {
        boxShadow: "0 2px 4px rgba(0, 0, 0, .2)",
        borderColor: "#2D69E0",
        backgroundColor: "#FFFFFF"
    },
    item: {
        minHeight: "280px",
        maxWidth: "840px !important",
        minWidth: "640px !important",
        marginTop: "5px"
    },
})

export default function MergeCarousel({
                                          items,
                                          setIndex,
                                          mergeToInfo,
                                          mergeFromInfo,
                                          mergeTo,
                                          mergeFrom,
                                          categories,
                                          setCarousel
                                      }) {

    const classes = useStyles();
    function handleChange(ind) {
        setIndex(ind);
    }

    function getDistance(place1, place2) {
        return " (" + Math.round(Utils.getDistance(
            place1 && place1.geometry.coordinates && place1.geometry.coordinates[0].toFixed(5),
            place1 && place1.geometry.coordinates && place1.geometry.coordinates[1].toFixed(5),
            place2 && place2.geometry.coordinates && place2.geometry.coordinates[0].toFixed(5),
            place2 && place2.geometry.coordinates && place2.geometry.coordinates[1].toFixed(5))) + "m)";
    }

    return <Carousel ref={function (carousel) {
        setCarousel(carousel);
    }} onChange={handleChange} autoPlay={false} indicators={false}
                     navButtonsAlwaysInvisible={true} animation="slide">
        {
            items.map((item, i) => <div key={i}>
                    {mergeTo && item[0] && <div className={classes.item}>
                        <GridList cols={2} spacing={10} style={{backgroundColor: "white"}}>
                            <GridListTile style={{height: "auto"}} classes={{tile: classes.tile}}>
                                <CardContent>
                                    <p style={{textAlign: "center", fontSize: "16px"}}
                                       className={classes.header}>{mergeToInfo && mergeToInfo.title}</p>
                                    <p style={{textAlign: "center", fontSize: "16px"}}
                                       className={classes.mergeSubtitle}>{mergeToInfo && mergeToInfo.subtitle}</p>
                                    <p style={{textAlign: "center", fontSize: "14px", color: "#2d69e0"}}>
                                        <Link
                                            href={`/map/opr.place/${item[0].properties.opr_id}?q=15/
                                            ${item[0] && item[0].geometry.coordinates && item[0].geometry.coordinates[1].toFixed(5)}
                                            /${item[0].geometry.coordinates[0].toFixed(5)}`}>
                                            View</Link>
                                    </p>
                                    <p className={classes.mergeLatLon}>
                                        <Value>{item[0] && item[0].geometry.coordinates && item[0].geometry.coordinates[1].toFixed(5)},
                                            {item[0] && item[0].geometry.coordinates && item[0].geometry.coordinates[0].toFixed(5)}
                                            {item[1] && getDistance(item[0], item[1])}</Value>
                                    </p>
                                    {<AttributesBarList place={mergeToInfo}
                                                        inactiveLinksVisible={true}
                                                        isOpen={true}/>}
                                    <ImagesBlock place={mergeTo}
                                                 isOriginalPlace={false}
                                                 categories={categories}/>
                                </CardContent>
                            </GridListTile>
                            {mergeFrom && item[1] && <GridListTile style={{height: "auto"}} classes={{tile: classes.tile}}>
                                <CardContent>
                                    <p style={{textAlign: "center", fontSize: "16px"}}
                                       className={classes.header}>{mergeFromInfo && mergeFromInfo.title}</p>
                                    <p style={{textAlign: "center", fontSize: "16px"}}
                                       className={classes.mergeSubtitle}>{mergeFromInfo && mergeFromInfo.subtitle}</p>
                                    <p style={{textAlign: "center", fontSize: "14px", color: "#2d69e0"}}>
                                        <Link
                                            href={`/map/opr.place/${item[1].properties.opr_id}?q=15/
                                            ${item[1].geometry.coordinates && item[1].geometry.coordinates[1].toFixed(5)}/
                                            ${item[1].geometry.coordinates[0].toFixed(5)}`}>
                                            View</Link>
                                    </p>
                                    <p className={classes.mergeLatLon}>
                                        <Value>{item[1] && item[1].geometry.coordinates && item[1].geometry.coordinates[1].toFixed(5)},
                                            {item[1] && item[0].geometry.coordinates && item[1].geometry.coordinates[0].toFixed(5)}
                                            {item[0] && getDistance(item[1], item[0])}</Value>
                                    </p>
                                    {<AttributesBarList place={mergeFromInfo}
                                                        inactiveLinksVisible={true}
                                                        isOpen={true}/>}
                                    <ImagesBlock place={mergeFrom}
                                                 isOriginalPlace={false}
                                                 categories={categories}/>
                                </CardContent>
                            </GridListTile>}
                        </GridList>
                    </div>}
                    <div key={i}>
                        {(!mergeTo && !mergeFrom) && <p> Couldn't load the objects data</p>}
                    </div>
                </div>
            )
        }
    </Carousel>;
}
