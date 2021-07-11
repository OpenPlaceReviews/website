import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid,
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import MergeCarousel from "../carousels/MergeCarousel";
import useDiff from "../../hooks/useDiff";
import useCommitOp from "../../hooks/useCommitOp";
import {getObjectsById} from "../../../../api/data";
import AuthContext from "../../../main/auth/providers/AuthContext";
import PermanentlyClosedDialog from "./PermanentlyClosedDialog";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import useBatchOp from "../../hooks/useBatchOp";

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
    buttonDeleted: {
        height: "35px",
        marginBottom: "10px",
        color: "#ff595d",
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
            maxWidth: "840px !important",
        }
    },
    tile: {
        boxShadow: "0 2px 4px rgba(0, 0, 0, .2)",
        borderColor: "#2D69E0",
        backgroundColor: "#FFFFFF"
    },
    disabled: {
        backgroundColor: "#ff595d"
    },
    toggleMerge: {
        width: "184px",
        "&:hover": {
            color: "#FFFFFF",
            background: "#5584e6",
            borderColor: "#c5c5c5",
        }
    },
    togglePerClosed: {
        width: "184px",
        "&:hover": {
            color: "#FFFFFF",
            background: "#ffc939",
            borderColor: "#c5c5c5",
        }
    }
})

export default function MergeListDialog({mergePlaces, placeTypes, mergeListDialogOpen, setMergeListDialogOpen}) {

    const classes = useStyles();

    const [categories, setCategories] = useState(null);
    const [op, setOp] = useState(null);
    const {authData} = useContext(AuthContext);
    const [version, setVersion] = useState(0);
    const [places, setPlaces] = useState([]);
    const [place] = places;
    const [index, setIndex] = useState(0);
    const [mainPlace, setMainPlace] = useState(null);
    const [similarPlace, setSimilarPlace] = useState(null);
    const [markerPlace, setMarkerPlace] = useState(null);
    const [similarMarkerPlace, setSimilarMarkerPlace] = useState(null);
    const [permanentlyClosedDialogOpen, setPermanentlyClosedDialogOpen] = useState(false);
    const [deletedPlace, setDeletedPlace] = useState(null);
    const [carousel, setCarousel] = useState(null);
    const [toggle, setToggle] = useState('noAction');
    const [commit, setCommit] = useState(false);
    const [edited, setEdited] = useState([]);
    const [deleted, setDeleted] = useState([]);
    const [countOp, setCountOp] = useState(0);

    let handleToggle = (event, newResult) => {
        setToggle(newResult);
    };

    const closeMergeListDialog = () => {
        setMergeListDialogOpen(false);
    };

    const closePermanentlyClosedDialog = () => {
        setPermanentlyClosedDialogOpen(false);
        carousel.next();
    };

    let mergeGroupList = [];

    function getMergeGroup(mergePlaces) {
        let currentGroupBeginIndex = 0;

        for (let i = 1; i < mergePlaces.length - 1; i++) {
            if (!mergePlaces[i].properties.deleted && mergePlaces[i - 1].properties.deleted) {
                mergeGroupList.push(mergePlaces.slice(currentGroupBeginIndex, i));
                currentGroupBeginIndex = i;
            }
        }
        mergeGroupList.push(mergePlaces.slice(currentGroupBeginIndex, mergePlaces.length));
        mergeGroupList = mergeGroupList.filter(group => group.length === 2);
        return mergeGroupList;
    }

    getMergeGroup(mergePlaces);

    const openPermanentlyClosedDialog = () => {
        setPermanentlyClosedDialogOpen(true);
        setDeletedPlace(similarPlace);
    };

    useEffect(() => {
        const requestCategories = async () => {
            const data = await getObjectsById('sys.operation', 'opr.place');
            const object = data.objects.shift();
            setCategories(object && object.interface && object.interface.images ? object.interface.images.values : null);
        };

        requestCategories();
    }, []);

    const handleUpdatePlace = () => {
        if (JSON.stringify(places[0].id) === JSON.stringify(places[1].id)) {
            setVersion((place.version ? place.version : 0) + 1);
        }
    }

    useEffect(() => {
        let mainFeature = mergeGroupList[index][0];
        let similarFeature = mergeGroupList[index][1];
        const fetchData = async () => {
            const data = await getObjectsById('opr.place', mainFeature.properties.opr_id);
            const object = data.objects.shift();
            if (object && object.clientData) {
                delete object.clientData;
            }
            const params = fetchPlaceParams(object);
            setMarkerPlace({
                oprId: mainFeature.properties.opr_id,
                title: params.title,
                subtitle: params.subtitle,
                latLon: params.latLon,
                images: params.images,
                sources: params.sources,
                deleted: params.deleted,
                closedDescription: params.closedDescription
            });
            setMainPlace(object);

            const data2 = await getObjectsById('opr.place', similarFeature.properties.opr_id);
            const object2 = data2.objects.shift();
            if (object2 && object2.clientData) {
                delete object2.clientData;
            }
            const params2 = fetchPlaceParams(object2);
            setSimilarMarkerPlace({
                oprId: similarFeature.properties.similar_opr_id,
                title: params2.title,
                subtitle: params.subtitle,
                latLon: params2.latLon,
                images: params2.images,
                sources: params2.sources,
                deleted: params2.deleted,
            });
            setSimilarPlace(object2);
        }
        fetchData();
    }, [index, version]);

    function onMerge() {
        setPlaces([similarPlace, mainPlace]);
    }

    useEffect(() => {
        if (countOp === 250) {
            setCommit(true);
            setCountOp(0);
        }
    }, [countOp]);

    useDiff(places[0], places[1], categories, setOp, edited, deleted, mergeListDialogOpen, countOp, setCountOp);
    useBatchOp(commit, setCommit, deleted, edited, setOp);
    useCommitOp(op, authData, handleUpdatePlace);

    const fetchPlaceParams = (place) => {
        let title = fetchPlaceName(place);
        let subtitle = fetchPlaceType(place);
        const {lat, lon, source, deleted} = place;
        let latLon = [lat, lon];
        return {
            title: title,
            subtitle: subtitle,
            latLon: latLon,
            images: place.images,
            sources: source,
            deleted: deleted
        };
    };

    const fetchPlaceName = place => {
        const {name, source} = place;
        if (name) {
            return name;
        }
        let sourceName = findObject(source, 'name');
        if (sourceName) {
            return sourceName;
        } else {
            return place.id.join(", ");
        }
    };

    const fetchPlaceType = place => {
        const {placetype, source} = place;
        let type;
        if (placetype) {
            type = placetype;
        } else {
            let sourcePlacetype = findObject(source, 'placetype');
            if (sourcePlacetype) {
                type = sourcePlacetype;
            } else {
                let osmValue = findObject(source, 'osm_value');
                if (osmValue) {
                    type = osmValue;
                }
            }
        }

        if (type) {
            let placeTypeStr = placeTypes ? placeTypes[type] : null;
            if (placeTypeStr) {
                let arr = placeTypeStr.split('-');
                type = arr.length > 0 ? arr[arr.length - 1].trim() : placeTypeStr;
            } else {
                type = type.replaceAll('_', ' ');
                if (type.length > 1) {
                    type = type[0].toUpperCase() + type.substring(1);
                }
            }
            return type;
        } else {
            return '';
        }
    };

    const findObject = (obj = {}, key) => {
        let result = null;
        const recursiveSearch = (obj = {}) => {
            if (result || !obj || typeof obj !== 'object') {
                return;
            }
            const value = obj[key];
            if (value) {
                result = value;
                return;
            }
            Object.keys(obj).reverse().forEach(function (k) {
                recursiveSearch(obj[k]);
            });
        };
        recursiveSearch(obj);
        return result;
    };

    useEffect(() => {
        if (toggle === "onMerge") {
            onMerge()
            carousel.next();
        }
        if (toggle === "permanentlyClosed") {
            openPermanentlyClosedDialog()
        }
        if (carousel && toggle === "noAction") {
            carousel.next();
        }
    }, [toggle]);

    useEffect(() => {
        setToggle("noAction")
    }, [toggle, carousel]);

    function onCommit() {
        setCommit(true);
        setCountOp(0);
    }

    return <div><Dialog fullWidth className={classes.dialog} open={mergeListDialogOpen} onClose={closeMergeListDialog}
                        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Merge possible duplicates</DialogTitle>
        <DialogContent>
            <MergeCarousel items={mergeGroupList} setIndex={setIndex}
                           markerPlace={markerPlace} similarMarkerPlace={similarMarkerPlace} mainPlace={mainPlace}
                           similarPlace={similarPlace} categories={categories}
                           setCarousel={setCarousel}/>
        </DialogContent>
        <DialogActions>
            <Grid style={{marginLeft: "20px", marginTop: "-10px"}} container justify="center">
                <ToggleButtonGroup
                    value={toggle}
                    exclusive
                    onChange={handleToggle}>
                    <ToggleButton value="onMerge" type="submit"
                                  variant="contained"
                                  color={"primary"}
                                  className={classes.toggleMerge}
                                  aria-label="left aligned">
                        Merge duplicate</ToggleButton>
                    <ToggleButton style={{width: "184px"}} value="noAction" type="submit"
                                  variant="contained"
                                  color={"primary"}
                                  aria-label="center">
                        No action</ToggleButton>
                    <ToggleButton value="permanentlyClosed" type="submit"
                                  variant="contained"
                                  color={"primary"}
                                  className={classes.togglePerClosed}
                                  aria-label="right aligned">
                        Permanently closed</ToggleButton>
                </ToggleButtonGroup>
            </Grid>
        </DialogActions>
        <DialogActions>
            <Grid style={{marginLeft: "20px", marginTop: "20px"}} container justify="center">
                <Button disabled={countOp === 0} style={{marginRight: "20px"}}
                        type="submit"
                        className={classes.buttonDeleted}
                        variant="contained"
                        onClick={onCommit}>
                    {"Commit (" + countOp + ")"}
                </Button>
                <Button type="submit"
                        className={classes.buttonClose}
                        variant="contained"
                        onClick={closeMergeListDialog}>
                    Cancel
                </Button>
            </Grid>
        </DialogActions>
    </Dialog>
        <PermanentlyClosedDialog open={permanentlyClosedDialogOpen}
                                 onClose={closePermanentlyClosedDialog}
                                 place={deletedPlace}
                                 setPlaces={setPlaces}/></div>
}