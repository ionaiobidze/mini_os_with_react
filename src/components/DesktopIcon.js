import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { AppContext } from '../AppContext';
import { useContext } from 'react';

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  img {
    width: 48px;
    height: 48px;
  }
`;

function DesktopIcon({ title, icon, appId }) {

  const { dispatch } = useContext(AppContext);

  const handleDoubleClick = () => {
    dispatch({ type: 'OPEN_WINDOW', payload: { appId, title } });
  };

  return (
    <Draggable>
      <Icon onDoubleClick={handleDoubleClick}>
        <img src={icon} alt={title} />
        <span>{title}</span>
      </Icon>
    </Draggable>
  );
}

export default DesktopIcon;