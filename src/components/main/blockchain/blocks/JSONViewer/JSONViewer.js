import React from 'react';
import ReactJson from 'react-json-view'

import Collapse from '@material-ui/core/Collapse';

export default function JSONViewer({json, open = false, className}) {
    const src = { ...json };
    delete src.clientData;

    const oprAdminTheme = {
        //Background
        base00: '#1c2833',
        base01: '#073642',
        //Borders
        base02: '#525252',
        base03: '#073642',
        base04: '#839496',
        base05: '#93a1a1',
        base06: '#eee8d5',
        //Properties
        base07: '#4fdee5',
        base08: '#ff8c00',
        //Strings
        base09: '#0ad161',
        base0A: '#b58900',
        base0B: '#859900',
        base0C: '#2aa198',
        //Open arrows
        base0D: '#fff',
        //Closed arrows
        base0E: '#fff',
        //Numbers
        base0F: '#ff8c00'
    };

    return <Collapse in={open} timeout="auto" unmountOnExit className={className}>
        <ReactJson
            src={src}
            name={false}
            iconStyle="triangle"
            displayObjectSize={false}
            displayDataTypes={false}
            enableClipboard={false}
            theme={oprAdminTheme}
            collapseStringsAfterLength={80}
            style={{
                border: "1px solid #CCD0D9",
                borderRadius: "5px",
                padding: "15px",
                marginTop: "10px",
                lineHeight: "1.2em"
            }}
        />
    </Collapse>;
};
