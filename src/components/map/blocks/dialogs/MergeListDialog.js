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
import useCommitOp from "../../hooks/useCommitOp";
import {getObjectsById} from "../../../../api/data";
import AuthContext from "../../../main/auth/providers/AuthContext";
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
            maxWidth: "1800px !important",
            overflowY: "hidden"
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
    prevButton: {
        height: "35px",
        marginBottom: "10px",
        color: "#2D69E0",
        backgroundColor: "#F1F4FC"
    },
    nextButton: {
        height: "35px",
        marginBottom: "10px",
        marginLeft: "50px",
        color: "#2D69E0",
        backgroundColor: "#F1F4FC"
    }
})

export default function MergeListDialog({
                                            mergePlaces, mergeListDialogOpen, setMergeListDialogOpen,
                                            placeTypes, setMergeListDialogWasClosed,
                                            idsPlacesLocallyMerged, setIdsPlacesLocallyMerged, alreadyReviewed
                                        }) {

    const classes = useStyles();

    const [categories, setCategories] = useState(null);
    const [op, setOp] = useState(null);
    const {authData} = useContext(AuthContext);
    const [version, setVersion] = useState(0);
    const [places, setPlaces] = useState([]);
    const [place] = places;
    const [index, setIndex] = useState(0);
    const [mergeTo, setMergeTo] = useState(null);
    const [mergeFromList, setMergeFromList] = useState([]);
    const [mergeFrom, setMergeFrom] = useState(null);
    const [mergeToInfo, setMergeToInfo] = useState(null);
    const [mergeFromInfo, setMergeFromInfo] = useState([]);
    const [carousel, setCarousel] = useState(null);
    const [edited, setEdited] = useState([]);
    const [deleted, setDeleted] = useState([]);
    const [forceCommit, setForceCommit] = useState(false);
    const [mergeGroupList, setMergeGroupList] = useState([]);
    const [deletedComment, setDeletedComment] = useState('');
    const [allowToMerge, setAllowToMerge] = useState([]);


    const closeMergeListDialog = () => {
        setMergeListDialogWasClosed(true);
        setMergeListDialogOpen(false);
    };

    const handleForceCommit = () => {
        setForceCommit(true);
        resetDeletedComment();
    };

    const handlePrevCarousel = () => {
        carousel.prev();
    };

    const handleNextCarousel = () => {
        carousel.next();
    };

    const handleOptionalComment = (event) => {
        setDeletedComment(event.target.value);
    };

    const updateIdsCache = () => {
        setIdsPlacesLocallyMerged([...idsPlacesLocallyMerged,
            mergeFrom ? mergeFrom.id : "",
            mergeTo.id
        ]);
    };

    const resetDeletedComment = () => {
        setDeletedComment('');
    };

    const createClosedPlace = () => {
        if (mergeTo) {
            let newPlace = JSON.parse(JSON.stringify(mergeTo));
            let newPlaceDeletedMarker = newPlace.deleted;
            let newPlaceDeletedComment = newPlace.deletedComment;

            if (newPlaceDeletedMarker === undefined) {
                newPlace["deleted"] = new Date().toISOString();
                if (newPlaceDeletedComment === undefined && deletedComment !== '') {
                    newPlace["deletedComment"] = deletedComment;
                }

                setPlaces([mergeTo, newPlace]);
                updateIdsCache();
                carousel.next()
            }
        }
    }

    useMergeGroupList(mergePlaces, mergeGroupList, setMergeGroupList, idsPlacesLocallyMerged, alreadyReviewed);

    useEffect(() => {
        if (mergeFrom && mergeTo) {
            setPlaces([mergeTo, mergeFrom]);
            updateIdsCache();
            carousel.next()
        }
    }, [mergeFrom]);

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
        if (index !== 0) {
            setMergeTo(null);
            setMergeFrom(null);
            allowToMerge.splice(0, allowToMerge.length)
            setAllowToMerge(allowToMerge);
        }
        const fetchData = async () => {
            if (mergeGroupList && mergeGroupList[index]) {
                let objectMergeFrom = [];
                let objectDeleted = null;
                let deletedFeature = mergeGroupList[index][0];
                let existingFeatures = mergeGroupList[index].slice(1, mergeGroupList.length - 1);
                let objectMergeFromList = [];
                let allowToMergeList = [];

                if (deletedFeature && existingFeatures && !Utils.contains(idsPlacesLocallyMerged, deletedFeature.properties.opr_id)) {
                    const dataDeletedPlace = await getObjectsById('opr.place', deletedFeature.properties.opr_id);
                    objectDeleted = dataDeletedPlace.objects.shift();
                    if (objectDeleted && objectDeleted.clientData) {
                        delete objectDeleted.clientData;
                    }
                    if (objectDeleted) {
                        for (let i = 0; i < existingFeatures.length; i++) {
                            const data2 = await getObjectsById('opr.place', existingFeatures[i].properties.opr_id);
                            objectMergeFrom = data2.objects.shift();
                            if (objectMergeFrom && !Utils.contains(idsPlacesLocallyMerged, existingFeatures[i].properties.opr_id)) {
                                if (objectMergeFrom.clientData) {
                                    delete objectMergeFrom.clientData;
                                }
                                objectMergeFromList.push(objectMergeFrom);
                                allowToMergeList.push(deletedFeature.properties.opr_id !== existingFeatures[i].properties.opr_id
                                    && !findObject(objectMergeFrom.source, 'deleted'));
                            } else {
                                allowToMergeList.push(false);
                            }
                        }
                        setAllowToMerge(allowToMergeList);
                    }
                }

                if (objectDeleted && objectMergeFromList.length > 0) {
                    const params = fetchPlaceParams(objectDeleted);
                    setMergeToInfo({
                        oprId: deletedFeature.properties.opr_id,
                        title: params.title,
                        subtitle: params.subtitle,
                        latLon: params.latLon,
                        images: params.images,
                        sources: params.sources,
                        deleted: params.deleted,
                        closedDescription: params.closedDescription
                    });
                    setMergeTo(objectDeleted);
                    let allInfo = [];
                    for(let obj of objectMergeFromList) {
                        const params2 = fetchPlaceParams(obj);
                        let info = {
                            oprId: obj.id,
                            title: params2.title,
                            subtitle: params2.subtitle,
                            latLon: params2.latLon,
                            images: params2.images,
                            sources: params2.sources,
                            deleted: params2.deleted
                        };
                        allInfo.push(info)
                    }
                    setMergeFromInfo(allInfo);
                    setMergeFromList(objectMergeFromList);
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
        let latLon = null;
        if (lat && lon) {
            latLon = [lat, lon];
        } else {
            let lat = findObject(source, 'lat');
            let lon = findObject(source, 'lon');
            if (lat && lon) {
                latLon = [lat, lon];
            }
        }
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

    return <div><Dialog className={classes.dialog} open={mergeListDialogOpen} onClose={closeMergeListDialog}
                        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Review closed places</DialogTitle>
        <DialogActions>
            <Button disabled={places.length !== 0} style={{align: "left"}} type="submit"
                    className={classes.prevButton}
                    variant="contained"
                    onClick={handlePrevCarousel}>
                Previous
            </Button>
            <Button type="submit"
                    variant="contained"
                    className={classes.nextButton}
                    onClick={handleNextCarousel}>
                Next
            </Button>
        </DialogActions>
        <DialogContent>
            {mergeGroupList && <MergeCarousel items={mergeGroupList} setIndex={setIndex}
                                              mergeToInfo={mergeToInfo} mergeFromInfo={mergeFromInfo}
                                              mergeTo={mergeTo}
                                              mergeFromList={mergeFromList} categories={categories} setCarousel={setCarousel}
                                              handleOptionalComment={handleOptionalComment}
                                              createClosedPlace={createClosedPlace}
                                              setMergeFrom={setMergeFrom}
                                              allowToMerge={allowToMerge}/>}
        </DialogContent>
        <DialogContent>
            {(mergeGroupList.length === 0) && <p style={{marginTop: "-5px"}}> All groups of places have already been reviewed!</p>}
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
