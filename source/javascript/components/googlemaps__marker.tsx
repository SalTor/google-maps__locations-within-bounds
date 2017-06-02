interface GoogleMapsMarker extends google.maps.MarkerOptions {
    content: any
}

class GoogleMapsMarker extends google.maps.Marker {
    constructor(options) {
        super(options)
    }
}

export default GoogleMapsMarker