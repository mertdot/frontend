import React, { Component } from 'react';
import logo from'../assests/logo.png';
import { Link } from 'react-router-dom' //Browser Router'a geçersek diye hrefi kaldırdık to'yu ekledik. hash işareti problemi

class TopBar extends Component {
    render() {
        return (
            <div className='shadow-sm bg-light mb-2'>
                <nav className="navbar navbar-light container navbar-expand">
                    <Link className="navbar-brand" to="/"> <img src={logo} width="60" alt="Business Card Logo"></img>Business Card</Link>   
                <ul className="navbar-nav ml-auto">
                    <li><Link className="nav-link" to="/login"></Link>Login</li>
                    <li><Link className="nav-link" to="/signup"></Link>Sign Up</li>
                </ul>
                </nav>
            </div>
        );
    }
}

export default TopBar;
