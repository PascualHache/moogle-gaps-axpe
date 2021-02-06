import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.clearSearchBox = this.clearSearchBox.bind(this);
    }

    componentDidMount({ map, mapApi } = this.props) {
        const options = {
            types: ['establishment'], // Especificado segun el ejemplo que muestra 'La Maquinista'
        };
        this.autoComplete = new mapApi.places.Autocomplete(
            this.searchInput,
            options,
        );
        this.autoComplete.addListener('place_changed', this.onPlaceChanged);
        this.autoComplete.bindTo('bounds', map);
    }

    componentWillUnmount({ mapApi } = this.props) {
        mapApi.event.clearInstanceListeners(this.searchInput);
    }

    onPlaceChanged = ({ map, addplace } = this.props) => {
        const place = this.autoComplete.getPlace();

        if (!place.geometry) return;
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        addplace(place);
        this.searchInput.blur();
        console.log("adding place", place)
    };

    clearSearchBox() {
        this.searchInput.value = '';
    }

    render() {
        return (
            <div className="SearchBar-wrapper">
                <input
                    className="search-input"
                    ref={(ref) => {
                        this.searchInput = ref;
                    }}
                    type="text"
                    onFocus={this.clearSearchBox}
                    placeholder="Search places..."
                />
            </div>
        );
    }
}

export default SearchBar;