import React, { Component } from "react"

class GoogleMapInfoWindow extends Component {
    /**
     * ===========================
     *   Component Configuration
     * ===========================
     */
    render() {
        return (
            <div>
                <h3>{ this.props.title || "I'm a location" }</h3>
                <p>{ this.props.details || "Lorem ipsum doloret. Some other fancy filler text. Lorem ipsum doloret. Some other fancy filler text. Lorem ipsum doloret. Some other fancy filler text. Lorem ipsum doloret. Some other fancy filler text." }</p>
            </div>
        )
    }
}

export default GoogleMapInfoWindow