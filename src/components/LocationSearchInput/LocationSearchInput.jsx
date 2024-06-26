import { useContext, useState } from 'react';
import { useJsApiLoader } from "@react-google-maps/api";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

import { mapLibraries } from '../../constants/config';
import { Toastify } from '../../toastify/Toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';
import { UserContext } from '../../Context/UserContext/UserContext';

const LocationSearchInput = ({ searchLocation, setSearchLocation }) => {
    const { googleMapApiKey } = useContext(UserContext);

    const [address, setAddress] = useState('');

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleMapApiKey,
        libraries: mapLibraries,
    });

    if (!isLoaded) return <div>Loading...</div>;


    const handleChange = address => {
        setAddress(address);
    };

    const handleSelect = address => {
        setAddress(address);
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then((latLng) => {
                try {
                    setSearchLocation({
                        location: {
                            lat: latLng.lat,
                            lng: latLng.lng
                        },
                        info: address
                    });
                } catch (error) {
                    console.error('Error setting search location:', error);
                    Toastify.error("Please select a valid location");
                }
            })
            .catch(() => {
                Toastify.error("Please select a valid location");
            });
    };


    return (
        <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div className='w-full relative'>
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
