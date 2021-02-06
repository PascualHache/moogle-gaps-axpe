import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import GoogleMapReact from 'google-map-react';
import SearchBar from './SearchBar';
import Marker from './Marker';
import { storeMarker, deleteAllMarkers } from '../actions/map';
import store from '../store';
import { stateModel, API_KEY } from './../models/data.models';

function MapCanvas() {
    const [state, setState] = useState({ stateModel });
    const [trigger, setTrigger] = useState(false)
    const [marker, setMarker] = useState(false)
    const [footerData, setFooterData] = useState({ name: "", address: "" })
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
        dispatch(storeMarker(state.stateModel))
        setFooterData({ name: state.stateModel.places[0]?.name, address: state.stateModel.address })
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
            }
        }))
        setTrigger(true)
        setMarker(!marker)
    };

    function _generateAddress() {
        const { mapApi } = state.stateModel;

        const geocoder = new mapApi.Geocoder();

        geocoder.geocode({ 'location': { lat: state.stateModel.lat, lng: state.stateModel.lng } }, (results, status) => {
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

    // Empezamos localizando el naveador del usuario
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
            {mapApiLoaded && (
                <div>
                    <SearchBar map={mapInstance} mapApi={mapApi} addplace={addPlace} />
                </div>
            )}
            <GoogleMapReact
                center={state.stateModel.center}
                zoom={state.stateModel.zoom}
                draggable={state.stateModel.draggable}
                onChange={() => _onChange}
                bootstrapURLKeys={{
                    key: API_KEY,
                    libraries: ['places', 'geometry'],
                }}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
            >
                {store.getState()?.arr.length > 1 ? store.getState()?.arr.map((mark, index) =>
                (index > 0 ? <Marker
                    key={index}
                    lat={mark.lat}
                    lng={mark.lng}
                    onClick={() => setFooterData({ name: mark.places[0]?.name, address: mark.address })} /> : null)
                ) :
                    <Marker
                        lat={state.stateModel.lat}
                        lng={state.stateModel.lng}
                    />
                }

            </GoogleMapReact>
            <div onClick={() => dispatch(deleteAllMarkers())}>XXXXXXXXXXXX</div>
            <div className="info-wrapper">
                <div className="map-details"><span>{footerData.name}</span></div>
                <div className="map-subdetails"><span>{footerData.address}</span></div>
            </div>
            <table>
                <tbody>
                    {store.getState()?.arr.map(item =>
                        <tr key={item.places[0]?.name}>
                            <td>{item.places[0]?.name}</td>
                            <td>{item.address}</td>
                        </tr>)}
                </tbody>
            </table>
        </div >
    );

}

export default MapCanvas;