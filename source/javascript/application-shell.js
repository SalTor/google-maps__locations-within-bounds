import React, { Component } from "react"

import GoogleMap from "./components/googlemap"


class ApplicationShell extends Component {
    /**
     * ===========================
     *   Component Configuration
     * ===========================
     */
    render() {
        return (
            <div>
                <h1>Rendering Loads of Locations</h1>

                <GoogleMap />
            </div>
        )
    }
}

export default ApplicationShell
