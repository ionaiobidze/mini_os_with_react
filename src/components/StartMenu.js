import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../AppContext';

const MenuButton = styled.button`
  background: none;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const MenuList = styled.ul`
  position: absolute;
  bottom: 100%;
  left: 0;
  background-color: #f8f8f8;
  border: 1px solid #cccccc;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 110;
`;

const MenuItem = styled.li`
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #e8e8e8;
  }
`;

function StartMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useContext(AppContext);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleAppClick = (appId, appTitle) => {
    dispatch({ type: 'OPEN_WINDOW', payload: { appId, title: appTitle } });
    setIsOpen(false);
  };

  return (
    <div>
      <MenuButton onClick={handleMenuClick}>Start</MenuButton>
      {isOpen && (
        <MenuList>
          <MenuItem onClick={() => handleAppClick('text-editor', 'Text Editor')}>
            Text Editor
          </MenuItem>
          <MenuItem onClick={() => handleAppClick('calendar', 'Calendar')}>
            Calendar
          </MenuItem>
          <MenuItem onClick={() => handleAppClick('tic-tac-toe', 'Tic Tac Toe')}>
            Tic Tac Toe
          </MenuItem>
        </MenuList>
      )}
    </div>
  );
}

export default StartMenu;