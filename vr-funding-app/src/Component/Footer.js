import React from 'react';
import '.../App.css';
import styled from 'styled-components';

const FooterBar = styled.div`
  margin-left: 18em;
  margin: 0 auto;
  background-color: #261c3e;
  position: relative;
  @media (max-width: 1280px) {
    .inner {
      padding: 4em 4em 2em 4em;
      width: 100%;
    }
  }
  @media (max-width: 736px) {
    .inner {
      padding: 3em 2em 1em 2em;
    }
  }
  .inner {
    padding: 3em 5em 3em 5em;
    max-width: 100%;
    width: 75em;
  }
  .inner a {
    border-bottom-color: rgba(255, 255, 255, 0.15);
  }
  .inner a:hover {
    border-bottom-color: transparent;
  }
  .inner ul {
    display: flex;
    font-size: 0.8em;
    color: rgba(255, 255, 255, 0.15);
  }
  .inner li:nth-child(2) {
    margin-left: 1rem;
    border-left: solid 1px rgba(255, 255, 255, 0.15);
    padding: 0 1.5em;
  }
`;

const Footer = () => {
    return (
        <FooterBar>
        <div className="inner">
          <ul className="menu">
            <li>&copy; SIXR VR Funding. All rights reserved.</li>
            <li>
              <a href="/contact-us">Contact</a>
            </li>
          </ul>
        </div>
      </FooterBar>
    )
}

export default Footer
