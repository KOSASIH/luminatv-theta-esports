import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/live-stream">Live Stream</Link></li>
        <li><Link to="/chat">Chat</Link></li>
        <li><Link to="/polls">Polls</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
