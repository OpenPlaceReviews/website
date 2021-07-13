import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {CardContent, GridList, GridListTile, Link} from "@material-ui/core";
import Value from "../../../main/blockchain/blocks/Value";
import {makeStyles} from '@material-ui/core/styles';
import AttributesBarList from "../AttributesBarList";
import ImagesBlock from "../ImagesBlock";

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
                                          markerPlace,
                                          similarMarkerPlace,
                                          mainPlace,
                                          similarPlace,
                                          categories,
                                          setCarousel
                                      }) {

    const classes = useStyles();

    function handleChange(ind) {
        setIndex(ind);
    }

    return <Carousel ref={function (carousel) {
        setCarousel(carousel);
    }} onChange={handleChange} autoPlay={false} indicators={false} navButtonsAlwaysVisible={true} animation="slide">
        {
            items.map((item, i) => <div key={i} className={classes.item}>
                <GridList cols={2} spacing={10} style={{backgroundColor: "white"}}>
                    <GridListTile style={{height: "auto"}} classes={{tile: classes.tile}}>
                        <CardContent>
                            <p style={{textAlign: "center", fontSize: "16px"}}
                               className={classes.header}>{markerPlace && markerPlace.title}</p>
                            <p style={{textAlign: "center", fontSize: "16px"}}
                               className={classes.mergeLatLon}>{markerPlace && markerPlace.subtitle}</p>
                            <p style={{textAlign: "center", fontSize: "14px", color: "#2d69e0"}}>
                                <Link
                                    href={`/map/opr.place/${item[0].properties.opr_id}?q=15/${item[0] && item[0].geometry.coordinates && item[0].geometry.coordinates[0].toFixed(5)}/${item[0].geometry.coordinates[1].toFixed(5)}`}>View</Link>
                            </p>
                            <p className={classes.mergeLatLon}>
                                <Value>{item[0] && item[0].geometry.coordinates && item[0].geometry.coordinates[0].toFixed(5)}, {item[0] && item[0].geometry.coordinates && item[0].geometry.coordinates[1].toFixed(5)}</Value>
                            </p>
                            {<AttributesBarList place={markerPlace}
                                                inactiveLinksVisible={true}
                                                isOpen={false}/>}
                            <ImagesBlock place={mainPlace}
                                         isOriginalPlace={false}
                                         categories={categories}/>
                        </CardContent>
                    </GridListTile>
                    <GridListTile style={{height: "auto"}} classes={{tile: classes.tile}}>
                        <CardContent>
                            <p style={{textAlign: "center", fontSize: "16px"}}
                               className={classes.header}>{similarMarkerPlace && similarMarkerPlace.title}</p>
                            <p style={{textAlign: "center", fontSize: "16px"}}
                               className={classes.mergeLatLon}>{similarMarkerPlace && similarMarkerPlace.subtitle}</p>
                            <p style={{textAlign: "center", fontSize: "14px", color: "#2d69e0"}}>
                                <Link
                                    href={`/map/opr.place/${item[1].properties.opr_id}?q=15/${item[1].geometry.coordinates && item[1].geometry.coordinates[0].toFixed(5)}/${item[1].geometry.coordinates[1].toFixed(5)}`}>View</Link>
                            </p>
                            <p className={classes.mergeLatLon}>
                                <Value>{item[1].geometry.coordinates && item[1].geometry.coordinates[0].toFixed(5)}, {item[1].geometry.coordinates && item[1].geometry.coordinates[1].toFixed(5)}</Value>
                            </p>
                            {<AttributesBarList place={similarMarkerPlace}
                                                inactiveLinksVisible={true}
                                                isOpen={false}/>}
                            <ImagesBlock place={similarPlace}
                                         isOriginalPlace={false}
                                         categories={categories}/>
                        </CardContent>
                    </GridListTile>
                </GridList>
            </div>)
        }
    </Carousel>;
}