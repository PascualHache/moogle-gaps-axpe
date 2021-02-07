import { STORE_MARKER, DELETE_ALL_MARKERS } from './types';

export const storeMarker = (marker) => (dispatch) => {
    dispatch({
        type: STORE_MARKER,
        payload: {marker},
    });

    return Promise.resolve();
};

export const deleteAllMarkers = () => (dispatch) => {
    dispatch({
        type: DELETE_ALL_MARKERS,
        payload: {},
    });

    return Promise.resolve();
};