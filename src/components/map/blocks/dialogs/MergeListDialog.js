import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid, TextField,
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import MergeCarousel from "../carousels/MergeCarousel";
import useCommitOp from "../../hooks/useCommitOp";
import {getObjectsById} from "../../../../api/data";
import AuthContext from "../../../main/auth/providers/AuthContext";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import useBatchOp from "../../hooks/useBatchOp";
import useBatchDiff from "../../hooks/useBatchDiff";
import useMergeGroupList from "../../hooks/useMergeGroupList";
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
        height: "40px",
        color: "#2d69df",
        borderColor: "#e0e0e0",
        "&:hover": {
            color: "#212121",
            background: "#f1f4fc",
            borderColor: "#2d69df",
        }
    },
    togglePerClosed: {
        width: "184px",
        height: "40px",
        color: "#2d69df",
        borderColor: "#e0e0e0",
        "&:hover": {
            color: "#212121",
            background: "#f1f4fc",
            borderColor: "#2d69df",
        }
    },
    prevButton: {
        height: "35px",
        marginBottom: "10px",
        marginRight: "102px",
        color: "#2D69E0",
        backgroundColor: "#F1F4FC"
    },
    nextButton: {
        height: "35px",
        marginBottom: "10px",
        marginLeft: "50px",
        color: "#2D69E0",
        backgroundColor: "#F1F4FC"
    },
    toggleButton: {
        marginBottom: "10px",
        marginRight: "135px",
    },
    comment: {
        width: "790px",
        "& .MuiFilledInput-input": {
            padding: "15px 25px 5px 15px",
        },
        paddingBottom: "5px"
    }
})

export default function MergeListDialog({
                                            mergePlaces, placeTypes, mergeListDialogOpen, setMergeListDialogOpen,
                                            idsPlacesCache, setIdsPlacesCache, setAlreadyReviewed, taskSelection,
                                            alreadyReviewed
                                        }) {

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
    const [carousel, setCarousel] = useState(null);
    const [toggle, setToggle] = useState(null);
    const [edited, setEdited] = useState([]);
    const [deleted, setDeleted] = useState([]);
    const [forceCommit, setForceCommit] = useState(false);
    const [mergeGroupList, setMergeGroupList] = useState([]);
    const [carouselNav, setCarouselNav] = useState(null);
    const [deletedComment, setDeletedComment] = useState('');
    const [allowToMerge, setAllowToMerge] = useState(false);

    let handleToggle = (event, newResult) => {
        setToggle(newResult);
    };

    const closeMergeListDialog = () => {
        setMergeListDialogOpen(false);
    };

    const handleForceCommit = () => {
        setForceCommit(true);
        resetDeletedComment();
        carousel.next();
    };

    const handlePrevCarousel = () => {
        setCarouselNav("prev");
    };

    const handleNextCarousel = () => {
        setCarouselNav("next");
    };

    const handleOptionalComment = (event) => {
        setDeletedComment(event.target.value);
    };

    const updateIdsCache = () => {
        setIdsPlacesCache([...idsPlacesCache,
            similarPlace.id,
            mainPlace.id
        ]);
    };

    const onMerge = () => {
        if (similarPlace && mainPlace) {
            setPlaces([similarPlace, mainPlace]);
            updateIdsCache();
        }
    }

    const resetDeletedComment = () => {
        setDeletedComment('');
    };

    const createClosedPlace = () => {
        if (similarPlace && mainPlace) {
            let newPlace = JSON.parse(JSON.stringify(similarPlace));
            let newPlaceDeletedMarker = newPlace.deleted;
            let newPlaceDeletedComment = newPlace.deletedComment;

            if (newPlaceDeletedMarker === undefined) {
                newPlace["deleted"] = new Date().toISOString();
                if (newPlaceDeletedComment === undefined && deletedComment !== '') {
                    newPlace["deletedComment"] = deletedComment;
                }

                setPlaces([similarPlace, newPlace]);
                updateIdsCache();
            }
        }
    }

    useMergeGroupList(mergePlaces, mergeGroupList, setMergeGroupList, idsPlacesCache, alreadyReviewed, setAlreadyReviewed, taskSelection);

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
        if(index !== 0) {
            setMainPlace(null);
            setSimilarPlace(null);
        }
        const fetchData = async () => {
            setAllowToMerge(false);
            if (mergeGroupList && mergeGroupList[index]) {
                let object2 = null;
                let object = null;
                let it = 0;
                let mainFeature = mergeGroupList[index + it][1];
                let similarFeature = mergeGroupList[index + it][0];
                if (Utils.contains(idsPlacesCache, mainFeature.properties.opr_id)) {
                    // ignore merged objects
                } else if (mainFeature && similarFeature && mainFeature.properties.opr_id && similarFeature.properties.opr_id) {
                    const data = await getObjectsById('opr.place', mainFeature.properties.opr_id);
                    object = data.objects.shift();
                    if (object && object.clientData) {
                        delete object.clientData;
                    }
                    if (object) {
                        const data2 = await getObjectsById('opr.place', similarFeature.properties.opr_id);
                        object2 = data2.objects.shift();
                        if (object2 && !object2.deleted) {
                            if (object2.clientData) {
                                delete object2.clientData;
                            }
                            setAllowToMerge(mainFeature.properties.opr_id !== similarFeature.properties.opr_id);
                        } else {
                            // object2 = null;
                            // object = null;
                        }
                    }
                }
                if (object && object2) {
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
                    const params2 = fetchPlaceParams(object2);
                    setSimilarMarkerPlace({
                        oprId: similarFeature.properties.similar_opr_id,
                        title: params2.title,
                        subtitle: params2.subtitle,
                        latLon: params2.latLon,
                        images: params2.images,
                        sources: params2.sources,
                        deleted: params2.deleted,
                    });
                    setMainPlace(object);
                    setSimilarPlace(object2);
                }
            }
        }
        fetchData();
    }, [mergeGroupList, index]);

    useBatchDiff(places[0], places[1], categories, edited, deleted, setEdited, setDeleted);
    useBatchOp(forceCommit, setForceCommit, deleted, edited, setOp, 250);
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
        resetDeletedComment();
        if (toggle === "permanentlyClosed") {
            createClosedPlace();
            carousel.next()
        } else if (toggle === "onMerge") {
            onMerge();
            carousel.next()
        } else if (carouselNav === "next") {
            carousel.next();
        } else if (carouselNav === "prev") {
            carousel.prev();
        }

        setCarouselNav(null);
        setToggle(null);
    }, [carouselNav, toggle]);

    return <div><Dialog fullWidth className={classes.dialog} open={mergeListDialogOpen} onClose={closeMergeListDialog}
                        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Review closed places</DialogTitle>
        <DialogActions>
            <Button disabled={places.length !== 0} style={{align: "left"}} type="submit"
                    className={classes.prevButton}
                    variant="contained"
                    onClick={handlePrevCarousel}>
                Previous
            </Button>
            <ToggleButtonGroup
                className={classes.toggleButton}
                value={toggle}
                exclusive
                onChange={handleToggle}>
                <ToggleButton disabled={!mainPlace || !similarPlace || !allowToMerge} value="onMerge" type="submit"
                              variant="contained"
                              className={classes.toggleMerge}
                              aria-label="left aligned">
                    Merge duplicate</ToggleButton>
                <ToggleButton disabled={!mainPlace || !similarPlace} value="permanentlyClosed" type="submit"
                              variant="contained"
                              className={classes.togglePerClosed}
                              aria-label="right aligned">
                    Permanently closed</ToggleButton>
            </ToggleButtonGroup>
            <Button type="submit"
                    variant="contained"
                    className={classes.nextButton}
                    onClick={handleNextCarousel}>
                Next
            </Button>
        </DialogActions>
        <DialogActions>
            {mainPlace && similarPlace && <TextField
                autoFocus
                required
                value={deletedComment}
                id="filled-required"
                placeholder="Comment for permanently closed place"
                variant="filled"
                className={classes.comment}
                onChange={handleOptionalComment}/>}
        </DialogActions>
        <DialogContent>
            {mergeGroupList && <MergeCarousel items={mergeGroupList} setIndex={setIndex}
                                              markerPlace={markerPlace} similarMarkerPlace={similarMarkerPlace}
                                              mainPlace={mainPlace}
                                              similarPlace={similarPlace} categories={categories} setCarousel={setCarousel}/>}
        </DialogContent>
        <DialogActions>
            <Grid style={{marginBottom: "-10px"}}
                  container
                  direction="row-reverse"
                  alignItems="center">
                <Button type="submit"
                        className={classes.buttonClose}
                        variant="contained"
                        onClick={closeMergeListDialog}>
                    Cancel
                </Button>
                <Button disabled={edited.length === 0} style={{marginRight: "20px"}}
                        type="submit"
                        className={classes.button}
                        variant="contained"
                        onClick={handleForceCommit}>
                    {"Commit - " + edited.length}
                </Button>
            </Grid>
        </DialogActions>
    </Dialog>
    </div>
}
