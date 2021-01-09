import React, { useEffect } from 'react'
import './Header.css';
import Logo from '../../../images/robinhood.svg';
import {Redirect, Link} from 'react-router-dom';
import SearchBar from './Search/SearchBar';
import { logout } from '../../../actions/session';
import { connect } from 'react-redux';

function Header(props) {
    const handleLogout = () => {
        props.logout().then(() => {
            <Redirect to={{pathname: "/login"}} />
        })
    }

    const setMargin = () => {
        const container = document.querySelector('div.header-container');
        const currentViewPort = window.innerWidth;
        const margin = (currentViewPort - 1024)/2;
        if (margin < 90) {
            container.style.marginLeft = `90px`;
        } else {
            container.style.marginLeft = `${margin}px`;
        }
    }
    
    useEffect(() => {
        setMargin();
        window.addEventListener('resize', setMargin);
    }, [])
    
    return (
        <div className="header-wrapper">
            <div className="header-container">
                <div className="header-logo">
                    <Link to="/">
                        <img src={Logo} alt="" width={25} />
                    </Link>
                </div>
                <SearchBar />
                <div className="header-menu-items">
                    <span>Free Stocks</span>
                    <span>Portfolio</span>
                    <span>Cash</span>
                    <span>Message</span>
                    <span>Account</span>
                </div>
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
