import React, { Component } from "react"
import ReactDomSever from "react-dom/server"

import GoogleMapInfoWindow from "./googlemaps-infowindow"
import GoogleMapsMarker from "./googlemaps__marker"

import LatLng from "../types/lat-lng"
import Filter from "../types/filter-params"

import { addCommas } from "../helpers"

let dataset_organized = require("../data/dataset-organized.json")



class GoogleMap extends Component<any, any> {
    default_lat = 22.5550996
    default_lng = 113.9137947
    default_zoom = 5
    location_markers = []
    dataset = dataset_organized
    counter_for_total_locations = 0
    search__locations_found = 0
    search_lat__sw = 0
    search_lng__sw = 0
    search_lat__ne = 0
    search_lng__ne = 0
    map = null
    infowindow = null

    constructor() {
        super()

        this.state = {}

        let start:any = new Date()

        for(let i of Object.keys(this.dataset)) {
            this.dataset[i].map(() => this.counter_for_total_locations++)
        }

        let end:any = new Date()

        console.log(`${ addCommas(this.counter_for_total_locations) } locations read in ${ end - start }ms`)
    }

    componentDidMount() {
        this.createMap()

        Object.keys(this.dataset).forEach(attr => {
            this.dataset[attr].forEach(data => {
                let { title, latitude, longitude, description } = data,
                    position = new google.maps.LatLng(latitude, longitude)

                this.createMarker(this.map, position, title, description)
            })
        })
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
            zoom: this.props.zoom ? this.props.zoom : this.default_zoom,
            minZoom: 3,
            maxZoom: 15,
            center: new google.maps.LatLng( this.props.lat || this.default_lat, this.props.lng || this.default_lng ),
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

    createMarker(map, position, title, details) {
        let marker = new GoogleMapsMarker({
            map, position, title,
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

        let current_bounds = this.map.getBounds(),
            south_west: LatLng = current_bounds.getSouthWest().toJSON(),
            north_east: LatLng = current_bounds.getNorthEast().toJSON()

        this.find_locations_within_bounds(south_west, north_east)
    }

    handleMapBoundsChangedEvent() {}

    handleMapMarkerClick(marker) {
        this.infowindow.setContent(marker.content)
        this.infowindow.open(this.map, marker)
    }


    /**
     * =====================
     *   Generic Functions
     * =====================
     */
    find_locations_within_bounds(south_west: LatLng, north_east: LatLng) {
        this.search_lat__sw = south_west.lat
        this.search_lng__sw = south_west.lng > 0 ? Math.floor(south_west.lng) : Math.ceil(south_west.lng)

        this.search_lat__ne = north_east.lat
        this.search_lng__ne = north_east.lng > 0 ? Math.floor(north_east.lng) : Math.ceil(north_east.lng)

        let search__time_start: any = new Date()

        if(this.search_lng__sw > this.search_lng__ne) {
            this.performSearch({
                starting_index: this.search_lng__sw,
                ending_index:   this.search_lng__ne,
                search_ascending: true,
                search__time_start
            })
        } else {
            this.performSearch({
                starting_index: this.search_lng__ne,
                ending_index:   this.search_lng__sw,
                search_ascending: false,
                search__time_start
            })
        }
    }

    performSearch(params: Filter) {
        let { starting_index, ending_index, search__time_start } = params,
            direction = starting_index > ending_index ? -1 : 1

        let category = this.dataset[starting_index]

        for(let category_index in category) {
            if(category.hasOwnProperty(category_index)) {
                let location = category[category_index]

                if(location.hasOwnProperty("latitude")) {
                    if(location.latitude < this.search_lat__ne && location.latitude > this.search_lat__sw) {
                        this.search__locations_found++
                    }
                } else {
                    console.warn("Object doesn't have latitude property", location)
                }
            }
        }

        if(starting_index !== ending_index) {
            this.performSearch(Object.assign(params, { starting_index: starting_index + direction }))
        } else {
            if(search__time_start) {
                let search__time_end: any = new Date()

                console.log(`${ this.search__locations_found } locations - ${ search__time_end - search__time_start }ms`)
            }

            this.search__locations_found = 0
        }
    }
}

export default GoogleMap
