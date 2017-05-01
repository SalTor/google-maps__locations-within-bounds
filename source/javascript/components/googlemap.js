import React, { Component } from "react"
import ReactDomSever from "react-dom/server"

import GoogleMapInfoWindow from "./googlemaps-infowindow"

import dataset_results from "../data/dataset-result.json"

class GoogleMap extends Component {
    /**
     * ===========================
     *   Component Configuration
     * ===========================
     */
    constructor() {
        super()

        this.state = {}

        this.default_lat = 22.5550996
        this.default_lng = 113.9137947

        this.location_markers = []
        this.dataset = dataset_results
    }

    componentWillMount() {}

    componentDidMount() {
        console.log(`Currently displaying ${ this.dataset.length } locations.`)

        this.createMap()

        this.createMarkers()
    }

    componentWillUnmount() {
        google.maps.event.clearInstanceListeners(this.map)
    }

    render() {
        return (
            <div id="google-map_saltor" className="map"></div>
        )
    }


    createMap() {
        this.map = new google.maps.Map(document.getElementById("google-map_saltor"), {
            zoom: this.props.zoom ? this.props.zoom : 3,
            minZoom: 3,
            maxZoom: 15,
            center: new google.maps.LatLng( this.props.lat || this.default_lat, this.props.lng || this.default_lng ),
            bounds: new google.maps.LatLngBounds(0, 0),
            scaleControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true
        })
        this.infowindow = new google.maps.InfoWindow()

        google.maps.event.addListener(this.map, "click", this.handleMapClickEvent.bind(this))
        google.maps.event.addListener(this.map, "dragend", this.handleMapDragEvent.bind(this))
        google.maps.event.addListener(this.map, "bounds_changed", this.handleMapBoundsChangedEvent.bind(this))
    }

    createMarkers() {
        for(const data of this.dataset) {
            let { title, latitude, longitude, description } = data,
                position = new google.maps.LatLng(latitude, longitude)

            this.createMarker(this.map, position, title, description)
        }
    }

    createMarker(map, position, title, details) {
        let marker = new google.maps.Marker({
            map, position, title, details,
            content: ReactDomSever.renderToString(<GoogleMapInfoWindow title={ title } details={ details } />)
        })

        marker.addListener("click", this.handleMapMarkerClick.bind(this, marker))

        this.location_markers.concat(marker)

        return marker
    }



    /**
     * ==================
     *   Event Handlers
     * ==================
     */
    handleMapDragEvent() {}

    handleMapClickEvent() {
        this.infowindow.close()
    }

    handleMapBoundsChangedEvent() {}

    handleMapMarkerClick(marker) {
        this.infowindow.setContent(marker.content)
        this.infowindow.open(this.map, marker)
    }
}

export default GoogleMap
