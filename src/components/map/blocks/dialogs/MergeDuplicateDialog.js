import React from 'react';
import {
    Button,
    CardContent, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    GridList,
    GridListTile, Link
} from "@material-ui/core";
import Value from "../../../main/blockchain/blocks/Value";
import {makeStyles} from '@material-ui/core/styles';
import ImagesBlock from "../ImagesBlock";
import AttributesBarList from "../AttributesBarList";

const useStyles = makeStyles({
    card: {
        minWidth: 340,
        "& .MuiGridListTile-tile": {
            backgroundColor: "#F5F5F5",
        }
    },
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
    }
})

export default function MergeDuplicateDialog({
                                                 markerPlace,
                                                 similarMarkerPlace,
                                                 open,
                                                 onClose,
                                                 onMerge,
                                                 categories,
                                                 place,
                                                 similarPlace,
                                                 setPlaces
                                             }) {

    const classes = useStyles();

    return <Dialog className={classes.dialog} open={open} onClose={onClose}
                   aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Merge possible duplicates</DialogTitle>
        <DialogContent>
            <div>
                <GridList cols={2} spacing={10} style={{backgroundColor: "white"}}>
                    <GridListTile style={{height: "auto"}} className={classes.card}>
                        <CardContent>
                            <p style={{textAlign: "center", fontSize: "16px"}}
                               className={classes.header}>{markerPlace && markerPlace.title}</p>
                            <p style={{textAlign: "center", fontSize: "14px", color: "#2d69e0"}}>
                                <Link
                                    href={`/map/opr.place/${markerPlace.oprId}?q=15/${markerPlace && markerPlace.latLon && markerPlace.latLon[0].toFixed(5)}/${markerPlace.latLon[1].toFixed(5)}`}>View</Link>
                            </p>
                            <p className={classes.mergeLatLon}>
                                <Value>{markerPlace && markerPlace.latLon && markerPlace.latLon[0].toFixed(5)}, {markerPlace && markerPlace.latLon && markerPlace.latLon[1].toFixed(5)}</Value>
                            </p>
                            {<AttributesBarList place={markerPlace}
                                                inactiveLinksVisible={true}
                                                isOpen={false}/>}
                            <ImagesBlock place={place}
                                         isOriginalPlace={true}
                                         categories={categories}
                                         setPlaces={setPlaces}/>

                        </CardContent>
                    </GridListTile>
                    <GridListTile style={{height: "auto"}} className={classes.card}>
                        <CardContent>
                            <p style={{textAlign: "center", fontSize: "16px"}}
                               className={classes.header}>{similarMarkerPlace && similarMarkerPlace.title}</p>
                            <p style={{textAlign: "center", fontSize: "14px", color: "#2d69e0"}}>
                                <Link
                                    href={`/map/opr.place/${similarMarkerPlace.oprId}?q=15/${similarMarkerPlace.latLon && similarMarkerPlace.latLon[0].toFixed(5)}/${similarMarkerPlace.latLon[1].toFixed(5)}`}>View</Link>
                            </p>
                            <p className={classes.mergeLatLon}>
                                <Value>{similarMarkerPlace.latLon && similarMarkerPlace.latLon[0].toFixed(5)}, {similarMarkerPlace.latLon && similarMarkerPlace.latLon[1].toFixed(5)}</Value>
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
            </div>
        </DialogContent>
        <DialogActions>
            <Button type="submit"
                    className={classes.button}
                    variant="contained"
                    color={"primary"}
                    onClick={onMerge}>
                Merge
            </Button>
            <Button type="submit"
                    className={classes.buttonClose}
                    variant="contained"
                    onClick={onClose}>
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
}