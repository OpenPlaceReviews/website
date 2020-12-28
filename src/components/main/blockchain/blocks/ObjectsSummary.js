import React from 'react';
import Value from "./Value";

export default function ObjectsSummary({op, listItem}) {
    return <div>
        {op.new && <p>Objects created: <Value listItem={listItem}>{op.new.length}</Value></p>}
        {op.old && <p>Objects deleted: <Value listItem={listItem}>{op.old.length}</Value></p>}
        {op.edit && <p>Objects edited: <Value listItem={listItem}>{op.edit.length}</Value></p>}
    </div>;
};