import React from 'react';
import '../App.css';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

const NavBar = styled.div`
`

const NavBar = () => {
    const history = useHistory();

    const logout () => {
        window.localStorage.clear();
        history.push('/login');
    }

    return (
        <NavBar>
            <div className='logo-title'>
                <a href="index.html" class="title">SIXR VR Funding</a>
                <nav>
                    <ul>
                        <Link to='/'>Home</Link>
                        <Link to='/about'>About Us</Link>
                        <Link to='/team'>Meet The Team</Link>
                        <Link to='/dashboard'>Dashboard</Link> // ?
                    </ul>
                </nav>
            </div>
        </NavBar>
    )
}

export default NavBar
