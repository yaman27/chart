import React, { Component } from 'react'
import "./NoMatch.css"
export default class NoMatch extends Component {
  render() {
    return (
      <div>
        <img className="error" src="https://www.ionos.ca/digitalguide/fileadmin/DigitalGuide/Teaser/404-not-found-t.jpg"/>
      </div>
    )
  }
}

