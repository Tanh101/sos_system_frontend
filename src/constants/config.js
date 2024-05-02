export const AppBaseUrl = import.meta.env.REACT_APP_API ?? 'http://localhost:8000/api';
export const SPACE_CHARACTER = '\u00A0';
export const defaultMapConfig = {
    gestureHandling: "greedy",
    options: {
        fullscreenControl: false,
        disableDefaultUI: true,
        zoomControl: true
    },
}

export const defaultMapContainerStyle = {
    height: "100vh",
    width: "100%"
}
