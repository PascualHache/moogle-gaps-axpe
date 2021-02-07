import { STORE_MARKER } from './types';

export const storeMarker = (marker) => (dispatch) => {
    dispatch({
        type: STORE_MARKER,
        payload: marker,
    });

    return Promise.resolve();
};
