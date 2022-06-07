import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar" style={{display:'flex'}}>
          <Link to='/' style={{textDecoration:'none'}}><h1 style={{marginTop:'1rem',marginLeft:'1rem',color:'white'}}>My Movies App</h1></Link>
          <Link to='/favourites' style={{textDecoration:'none'}}><h2 style={{marginTop:'1rem',marginLeft:'2rem',color:'white'}}>Favourites</h2></Link>
      </div>
    )
  }
}
