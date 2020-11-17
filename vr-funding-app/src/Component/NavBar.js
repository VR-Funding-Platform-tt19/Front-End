import React from 'react';
import '../App.css';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

const NavBar = styled.div`
    display: -moz-flex;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    background-color: #5e42a6;
    cursor: default;
    padding: 1.75em 2em;

    @media (max-width: 736px) {
        padding: 1em 2em;
    }

    @media (max-width: 480px) {
        display: block;
        padding: 0 2em;
        text-align: left;
        .title {
            font-size: 1.25em;
            padding: 1em 0;
        }
        nav {
            border-top: solid 1px rgba(255, 255, 255, 0.15);
            text-align: inherit;
        }
        nav ul li {
            margin-left: 1.5em;
        }
        nav ul li a {
            height: 6em;
            line-height: 6em;
        }
    }

    .title {
        border: 0;
        color: #ffffff;
        display: block;
        font-size: 1.25em;
        font-weight: bold;
    }
    nav {
        -moz-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-align: right;
    }
    nav ul {
        margin: 0;
        padding: 0;
    }
    nav ul li {
        display: inline-block;
        margin-left: 1.75em;
        padding: 0;
        vertical-align: middle;
    }
    nav ul li:first-child {
        margin-left: 0;
    }
    nav ul li a {
        border: 0;
        color: rgba(255, 255, 255, 0.35);
        display: inline-block;
        font-size: 0.6em;
        font-weight: bold;
        letter-spacing: 0.25em;
        text-transform: uppercase;
    }
    nav ul li a:hover {
        color: rgba(255, 255, 255, 0.55);
    }
    nav ul li a.active {
        color: #ffffff;
    }
`;

const NavBar = () => {
    const history = useHistory();

    const logout () => {
        window.localStorage.clear();
        history.push('/login');
    }

    return (
        <NavBar>
            <a href="index.html" class="title">
                SIXR VR Funding
            </a>
                <nav>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/about'>About Us</Link></li>
                        <li><Link to='/team'>Meet The Team</Link></li>
                        <li><Link to='/dashboard'>Dashboard</Link></li>
                    </ul>
                </nav>
        </NavBar>
        
    )
}

export default NavBar
