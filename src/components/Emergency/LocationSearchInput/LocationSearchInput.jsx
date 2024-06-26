import { useContext, useState } from 'react';
import { useJsApiLoader } from "@react-google-maps/api";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

import { mapLibraries } from '../../../constants/config';
import { Toastify } from '../../../toastify/Toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';
import { UserMarkerPlaceContext } from '../../../Context/UserMarkerPlaceContext/UserMarkerPlaceContext';
import { UserContext } from '../../../Context/UserContext/UserContext';

const LocationSearchInput = () => {
    const { requestLocation, setRequestLocation } = useContext(UserMarkerPlaceContext);
    const { googleMapApiKey } = useContext(UserContext);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleMapApiKey,
        libraries: mapLibraries,
    });

    if (!isLoaded) return <div>Loading...</div>;

    const handleChange = address => {
        setRequestLocation({ ...requestLocation, address: address });
    };

    const handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then((latLng) => {
                setRequestLocation({ lat: latLng.lat, lng: latLng.lng, address: address });
            })
            .catch(() => {
                Toastify.error("Please select a valid location");
            });
    };

    return (
        <PlacesAutocomplete
            value={requestLocation.address}
            onChange={handleChange}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div className='w-full md:w-[400px] relative'>
                    <input style={{ width: '100%', outline: 'none', padding: '0.5rem' }}
                        {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input',
                        })}
                    />
                    <div
                        style={{ position: 'absolute', zIndex: 1000, width: '100%' }}>
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer', border: '1px solid #fafafa', padding: '0.5rem' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer', border: '1px solid #fafafa', padding: '0.5rem' };
                            return (
                                <div
                                    key={suggestion.placeId}
                                    style={{ padding: '0.5rem', border: '1px solid #ccc' }}
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                    })}
                                >
                                    <FontAwesomeIcon icon={faLocationDot} style={{ color: 'red' }} />
                                    <span className='mx-2'>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
};

export default LocationSearchInput;
