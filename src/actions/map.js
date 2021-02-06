export const storeMarker = (marker) => (dispatch) => {
    dispatch({
        type: "STORE_MARKER",
        payload: marker,
    });

    return Promise.resolve();
};

export const deleteAllMarkers = () => (dispatch) => {
    dispatch({
        type: "DELETE_ALL_MARKERS",
    });

    return Promise.resolve();
};