import React, { Component } from 'react';
import logo from'../assests/logo.png';
import { Link } from 'react-router-dom' //Browser Router'a geçersek diye hrefi kaldırdık to'yu ekledik. hash işareti problemi
import { Authentication } from '../shared/AuthenticationContext';

class TopBar extends Component {

    static contextType = Authentication;

    render() {
        const { state, onLogoutSuccess } = this.context;
        const { isLoggedIn, username } = state;
        let links = (

            <ul className="navbar-nav ml-auto">
            <li><Link className="nav-link" to="/login">Login</Link></li>
            <li><Link className="nav-link" to="/signup">Sign Up</Link></li>
        </ul>

        );

        if(isLoggedIn){
            links =  (
                <ul className="navbar-nav ml-auto">
                <li><Link className="nav-link" onClick={onLogoutSuccess} style={{cursor: 'pointer'}}>Logout</Link></li>
                <li><Link className="nav-link" to={`/user/${username}`}>{username}</Link></li>
            </ul>
            )
        }

        return (
            <div className='shadow-sm bg-light mb-2'>
                <nav className="navbar navbar-light container navbar-expand">
                    <Link className="navbar-brand" to="/"> <img src={logo} width="60" alt="Business Card Logo"></img>Business Card</Link>   
                    {links}
                </nav>
            </div>
        );

        
    }
}

export default TopBar;
