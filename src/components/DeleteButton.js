import React from 'react';
import { useDispatch } from "react-redux";
import { deleteAllMarkers } from '../actions/map';

function DeleteButton() {
    const dispatch = useDispatch();
    const setDelete = () => { dispatch(deleteAllMarkers()) }

    return (
        <button type="button"
            className="delete-button"
            onClick={setDelete}>
            DELETE MARKERS
        </button>
    )
}


export default DeleteButton;