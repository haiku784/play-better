import React from 'react';

const Header = () => {
  return (
    <header className='header'>
      <h1>My Application Header</h1>
      <nav>
        <ul className='nav-list'>
          <li><a href='#'>Home</a></li>
          <li><a href='#'>About</a></li>
          <li><a href='#'>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;