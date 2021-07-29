import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {GridList} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import MergePlacesCardList from "../MergePlacesCardList";

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
            padding: "0 24px 5px 0",
        },
        "& .MuiDialog-paperWidthSm": {
            maxWidth: "740px !important",
        },
    },
    tile: {
        boxShadow: "0 2px 4px rgba(0, 0, 0, .2)",
        borderColor: "#2D69E0",
        backgroundColor: "#FFFFFF"
    },
    item: {
        minHeight: "280px",
        maxWidth: "2000px !important",
        minWidth: "640px !important",
        marginTop: "5px",
        "& .MuiGridList-root": {
            flexWrap: "nowrap !important",
        },
        overflowX: "hidden",
        overflowY: "hidden"

    },
    scroll: {
        transform: "rotateX(180deg)",
        overflowX: "auto",
        overflowY: "hidden"
    }
})

export default function MergeCarousel({
                                          items,
                                          setIndex,
                                          mergeToInfo,
                                          mergeFromInfo,
                                          mergeTo,
                                          mergeFromList,
                                          categories,
                                          setCarousel,
                                          handleOptionalComment,
                                          createClosedPlace,
                                          setMergeFrom,
                                          allowToMerge
                                      }) {

    const classes = useStyles();

    function handleChange(ind) {
        setIndex(ind);
    }

    return <Carousel ref={function (carousel) {
        setCarousel(carousel);
    }} onChange={handleChange} autoPlay={false} indicators={false} navButtonsAlwaysInvisible={true} animation="slide">
        {
            items.map((item, i) => <div className={classes.scroll} key={i}>
                    {mergeTo && item && <div className={classes.item}>
                        <GridList spacing={10} style={{backgroundColor: "white"}}>
                            <MergePlacesCardList mergeTo={mergeTo}
                                                 mergeFromList={mergeFromList}
                                                 mergeToInfo={mergeToInfo}
                                                 mergeFromInfo={mergeFromInfo}
                                                 categories={categories}
                                                 handleOptionalComment={handleOptionalComment}
                                                 createClosedPlace={createClosedPlace}
                                                 setMergeFrom={setMergeFrom}
                                                 allowToMerge={allowToMerge}/>
                        </GridList>
                    </div>}
                    <div key={i}>
                        {(!mergeTo) && <p> Couldn't load the objects data</p>}
                    </div>
                </div>
            )
        }
    </Carousel>;
}
