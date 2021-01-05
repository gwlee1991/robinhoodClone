import React from 'react'
import './Header.css';
import Logo from '../../../images/robinhood.svg';
import {Redirect, Link} from 'react-router-dom';
import { logout } from '../../../actions/session';
import { connect } from 'react-redux';
import SearchBar from './Search/SearchBar';

function Header(props) {
    const handleLogout = () => {
        props.logout().then(() => {
            <Redirect to={{pathname: "/login"}} />
        })
    }
    return (
        <div className="header-wrapper">
            <div className="header-logo">
                <Link to="/">
                    <img src={Logo} alt="" width={25} />
                </Link>
            </div>
            <div className="header-search">
                <SearchBar />
            </div>
            <div className="header-menu-items">
                <span>Free Stocks</span>
                <span>Portfolio</span>
                <span>Cash</span>
                <span>Message</span>
                <span>Account</span>
                <span onClick={handleLogout}>Log out</span>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
