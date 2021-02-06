import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import GoogleMapReact from 'google-map-react';
// import AutoComplete from './Autocomplete';
// import Marker from './Marker';
// import { storeMarker } from '../actions/map';
// import store from '../store';

const stateModel = {
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
    geoCoder: null,
    places: [],
    center: [],
    marginBounds : [],
    zoom: 9,
    address: "",
    draggable: true,
    lat: null,
    lng: null
}

function MapCanvas() {

    const [state, setState] = useState({ stateModel });
    const [trigger, setTrigger] = useState(false)
    const [marker, setMarker] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        setCurrentLocation();
    }, []);

    useEffect(() => {
        if (trigger) {
            _generateAddress()
            setTrigger(false)
        }
    }, [trigger])

    useEffect(() => {
        // dispatch(storeMarker(state.stateModel))
    }, [marker]);

    const { places, mapApiLoaded, mapInstance, mapApi } = state.stateModel;

    const _onChange = ({ center, zoom }) => {
        setState(prevState => ({
            stateModel: {
                ...prevState.stateModel,
                center: center,
                zoom: zoom,
            }
        }))
    }

    const _onClick = (value) => {
        setState(prevState => ({
            stateModel: {
                ...prevState.stateModel,
                lat: value.lat,
                lng: value.lng,
            }
        }))
    }

    const apiHasLoaded = (map, maps) => {
        setState(prevState => ({
            stateModel: {
                ...prevState.stateModel,
                mapApiLoaded: true,
                mapInstance: map,
                mapApi: maps,
            }
        }));
        setTrigger(true)
    };

    const addPlace = (place) => {
        setState(prevState => ({
            stateModel: {
                ...prevState.stateModel,
                places: [place],
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                marginBounds: [41.4118492, 2.4118492, 40.4118492, 3.4118492],

            }
        }))
        setTrigger(true)
        setMarker(!marker)

    };


    function _generateAddress() {
        const { mapApi } = state.stateModel;

        const geocoder = new mapApi.Geocoder();

        geocoder.geocode({ 'location': { lat: state.stateModel.lat, lng: state.stateModel.lng } }, (results, status) => {
            console.log(results);
            console.log(status);
            if (status === 'OK') {
                if (results[0]) {
                    setState(prevState => ({
                        stateModel: {
                            ...prevState.stateModel,
                            address: results[0].formatted_address,
                            zoom: 12
                        }
                    }))
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }

        });
    }


    // Get Current Location Coordinates
    function setCurrentLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setState(prevState => ({
                    stateModel: {
                        ...prevState.stateModel,
                        center: [position.coords.latitude, position.coords.longitude],
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                }))
            });
        }
    }

    return (
        <div className="canvasMap">
            {/* {mapApiLoaded && (
                <div>
                    <AutoComplete map={mapInstance} mapApi={mapApi} addplace={addPlace} />
                </div>
            )} */}
            <GoogleMapReact
                center={state.stateModel.center}
                zoom={state.stateModel.zoom}
                draggable={state.stateModel.draggable}
                onChange={() => _onChange}
                // onChildMouseDown={() => onMarkerInteraction}
                // onChildMouseUp={() => onMarkerInteractionMouseUp}
                // onChildMouseMove={() => onMarkerInteraction}
                // onChildClick={() => console.log('child click')}
                onClick={() => _onClick}
                bootstrapURLKeys={{
                    key: 'AIzaSyDre9x4CTbdRH3Q6UYUH_aqtO4s-qWrtlo',
                    libraries: ['places', 'geometry'],
                }}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
            >
                {/* {store.getState()?.arr.length > 1 ? store.getState()?.arr.map((mark, index) =>
                (index > 0 ? <Marker
                    key={index}
                    // position={mark}
                    text={mark.address}
                    lat={mark.lat}
                    lng={mark.lng} /> : null)
                ) :
                    <Marker
                        text={state.stateModel.address}
                        lat={state.stateModel.lat}
                        lng={state.stateModel.lng}
                    />
                } */}

            </GoogleMapReact>

            <div className="info-wrapper">
                <div className="map-details">Latitude: <span>{state.stateModel.lat}</span>, Longitude: <span>{state.stateModel.lng}</span></div>
                <div className="map-details">Zoom: <span>{state.stateModel.zoom}</span></div>
                <div className="map-details">Address: <span>{state.stateModel.address}</span></div>
            </div>
        </div >
    );

}

export default MapCanvas;