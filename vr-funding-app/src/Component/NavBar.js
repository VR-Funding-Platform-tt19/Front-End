import React from 'react';
import '../app.css';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

const NavBarStyle = styled.div`
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

    @media (max-width: 625px) {
        display: flex;
        padding: 0 2em;
        text-align: left;
        .title {
            font-size: 1.25em;
            padding: 1em 0;
            text-align: center;
        }

        nav ul {
            display: flex;
            flex-direction: column;
        }
        .logoContainer {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        nav ul li a {
            height: 6em;
            line-height: 6em;
            vertical-align:middle;

        }
    }

    .title {
        border: 0;
        color: rgba(255, 255, 255, 0.75);
        text-shadow: 2px 4px 3px rgba(0,0,0,0.3);
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

    return (
        <NavBarStyle>
            <div className='logoContainer'>
                <a href="https://vigilant-bose-dd99fc.netlify.app/" className="title">SIXR VR Funding</a>
            </div>
                <nav>
                    <ul>
                        <li> <a href="https://vigilant-bose-dd99fc.netlify.app/"> Home</a> </li> 
                        <li><Link to='/meet-the-team'>Meet The Team</Link></li> 
                        <li><Link to='/dashboard'>Dashboard</Link></li>
                        <li> <Link to='/sign-in' onClick={() => {window.localStorage.clear();}}> Logout </Link> </li> {/* possiblly have to style */}
                    </ul>
                </nav>
        </NavBarStyle>
        
    )
}

export default NavBar
