import haversine from 'haversine-distance'

const getDistance = (origin, destination) => {
    return haversine(origin, destination);
}

export {
    getDistance,
};
