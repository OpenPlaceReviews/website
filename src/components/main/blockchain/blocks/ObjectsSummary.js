import React from 'react';
import Value from "./Value";

export default function ObjectsSummary({op, listItem}) {
    return <div>
        <p>Objects created: <Value listItem={listItem}>{op.new ? op.new.length : 0}</Value></p>
        <p>Objects deleted: <Value listItem={listItem}>{op.old ? op.old.length : 0}</Value></p>
        <p>Objects edited: <Value listItem={listItem}>{op.edit ? op.edit.length : 0}</Value></p>
    </div>;
};