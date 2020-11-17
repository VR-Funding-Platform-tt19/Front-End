import React from 'react';
import '.../App.css';
import styled from 'styled-components';

const FooterBar = styled.div`
`

const Footer = () => {
    return (
        <FooterBar>
            <div className='inner'>
                <div className='menu'>
                    <li>&copy; Untitled. All rights reserved.</li>
                    <a href='/contact-us'>Contact</Link>
                </div>
            </div>
        </FooterBar>
    )
}

export default Footer
