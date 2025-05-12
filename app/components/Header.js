// components/Header.js

import React from 'react';
import MegaMenu from './Mega_menu.js';

const Header = ({ onMenuToggle }) => {
  return <header>{<MegaMenu onMenuToggle={onMenuToggle} />}</header>;
};

export default Header;
