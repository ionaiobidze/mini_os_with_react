import React from 'react';
import styled from 'styled-components';
import StartMenu from './StartMenu';
import SystemTray from './SystemTray';
import { AppContext } from '../AppContext';
import { useContext } from 'react';

const TaskbarContainer = styled.div`
  background-color: #f0f0f0;
  border-top: 1px solid #cccccc;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  z-index: 100;
`;

const TaskbarIcons = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-right: 10px;
  }
`;

const TaskbarIcon = styled.button`
  background: none;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};

  &:hover {
    background-color: #e0e0e0;
  }
`;

function Taskbar() {
  const { state, dispatch } = useContext(AppContext);

  const handleAppClick = (appId) => {
    dispatch({ type: 'SET_ACTIVE_APP', payload: appId });
    // Find the window for the clicked app
    const window = state.openWindows.find((w) => w.appId === appId);
    if (window) {
      // If the window is minimized, restore it
      if (window.minimized) {
        dispatch({ type: 'RESTORE_WINDOW', payload: window.id });
      }
    } else {
      // If the window is not found, open it
      const appTitle = getAppTitle(appId); // Implement a function to get the app title based on appId
      dispatch({ type: 'OPEN_WINDOW', payload: { appId, title: appTitle } });
    }
  };

  // Helper function to get the app title based on appId
  const getAppTitle = (appId) => {
    switch (appId) {
      case 'text-editor':
        return 'Text Editor';
      case 'calendar':
        return 'Calendar';
      case 'tic-tac-toe':
        return 'Tic Tac Toe';
      default:
        return 'App';
    }
  };

  return (
    <TaskbarContainer>
      <StartMenu />
      <TaskbarIcons>
        {state.openWindows.map((window) => (
          <TaskbarIcon
            key={window.id}
            active={state.activeApp === window.appId}
            onClick={() => handleAppClick(window.appId)}
          >
            {window.title}
          </TaskbarIcon>
        ))}
      </TaskbarIcons>
      <SystemTray />
    </TaskbarContainer>
  );
}

export default Taskbar;