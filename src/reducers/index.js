import { STORE_MARKER } from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = { arr: [] }, action) {
    const { type, payload } = action;

    switch (type) {
        case STORE_MARKER:
            const { lat, lng, places } = payload;
            return {
                arr: [...state.arr, {
                    lat: lat,
                    lng: lng,
                    places: places
                }]

            };
        default:
            return state;
    }
}