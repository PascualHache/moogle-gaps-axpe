import {STORE_MARKER, DELETE_ALL_MARKERS} from '../actions/types';

const initialState = {arr:[]};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case STORE_MARKER:
            return {
                ...state,
                arr: [...state.arr, payload]
            
        };
        case DELETE_ALL_MARKERS:
            return {
                ...state,
                arr: []
            };
        default:
            return state;
    }
}

// ...state.arr, action.payload.marker