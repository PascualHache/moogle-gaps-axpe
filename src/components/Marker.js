import React from 'react';

const Marker = ({ text, onClick }) => (
    <div className="Marker-wrapper"
        alt={text}
        onClick={onClick}
    />
);

// Marker.defaultProps = {
//     onClick: null,
// };

// Marker.propTypes = {
//     onClick: PropTypes.func,
//     text: PropTypes.string.isRequired,
// };

export default Marker;