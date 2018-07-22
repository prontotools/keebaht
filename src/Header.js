import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <h1 className="ui center aligned header">
        <Link to="/">กี่บาท?</Link>
      </h1>
    )
  }
}

export default Header
