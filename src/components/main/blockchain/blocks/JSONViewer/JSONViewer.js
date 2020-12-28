import React from 'react';
import ReactJson from 'react-json-view'

import Collapse from '@material-ui/core/Collapse';

export default function JSONViewer({json, open = false}) {
    const src = { ...json };
    delete src.clientData;

    return <Collapse in={open} timeout="auto" unmountOnExit>
        <ReactJson
            src={src}
            name={false}
            iconStyle="triangle"
            displayObjectSize={false}
            displayDataTypes={false}
            collapseStringsAfterLength={80}
            style={{
                background: "#F2F2F2",
                border: "1px solid #CCD0D9",
                borderRadius: "5px",
                padding: "15px",
                marginTop: "10px",
            }}
        />
    </Collapse>;
};
