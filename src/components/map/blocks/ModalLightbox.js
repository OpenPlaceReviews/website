import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        maxHeight: "95%",
        maxWidth: "95%",
        border: "3px solid #000",
    },
});

export default function ModalLightbox({image, onClose}) {
    const classes = useStyles();
    const open = !!image;

    return <Modal
        className={classes.modal}
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
    >
        <Fade in={open}>
            <img src={image} alt="Image preview" onClick={onClose} className={classes.image}/>
        </Fade>
    </Modal>;
}