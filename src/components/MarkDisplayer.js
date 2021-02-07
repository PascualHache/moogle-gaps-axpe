import React from 'react';

function MarkDisplayer(props) {
    const { name, address } = props;
    return (
        <div className="info-wrapper">
            <div className="map-details"><span data-testid="map-name">{name}</span></div>
            <div className="map-subdetails"><span >{address}</span></div>
        </div>
    )
}

export default MarkDisplayer;