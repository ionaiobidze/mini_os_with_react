import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { AppContext } from '../AppContext';
import TextEditor from '../apps/TextEditor/TextEditor';
import CalendarApp from '../apps/Calendar/CalendarApp';
import TicTacToe from '../apps/TicTacToe/TicTacToe';

const WindowContainer = styled.div`
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  z-index: ${({ active }) => (active ? 100 : 99)};
  width: ${({ maximized }) => (maximized ? '100%' : 'auto')};
  height: ${({ maximized }) => (maximized ? '100%' : 'auto')};
  top: ${({ maximized }) => (maximized ? '0' : 'auto')};
  left: ${({ maximized }) => (maximized ? '0' : 'auto')};
`;

const TitleBar = styled.div`
  background-color: #f0f0f0;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: move;
`;

const Title = styled.span`
  font-weight: bold;
`;

const WindowButtons = styled.div`
  display: flex;
  button {
    background: none;
    border: none;
    padding: 0;
    margin-left: 5px;
    cursor: pointer;
    font-size: 12px;
  }
`;

const Content = styled.div`
  padding: 10px;
  overflow: auto;
  height: ${({ maximized }) => (maximized ? 'calc(100% - 30px)' : 'auto')}; // Adjust height for maximized state
`;

function Window({ children, window }) {
  const { state, dispatch } = useContext(AppContext);
  const windowRef = useRef(null);

  const handleMinimize = () => {
    dispatch({ type: 'MINIMIZE_WINDOW', payload: window.id });
  };

  const handleMaximize = () => {
    dispatch({ type: 'MAXIMIZE_WINDOW', payload: window.id });
  };

  const handleClose = () => {
    dispatch({ type: 'CLOSE_WINDOW', payload: window.id });
  };

  const handleDrag = (e, ui) => {
    dispatch({ type: 'UPDATE_WINDOW_POSITION', payload: { id: window.id, x: ui.x, y: ui.y } });
  };

  const handleResize = (event, { size }) => {
    // Update the window size in the state. Need to add width and height to the state management
  };

  const handleWindowClick = () => {
    dispatch({ type: 'SET_ACTIVE_APP', payload: window.appId });
  };

  useEffect(() => {
    if (window.maximized) {
      // When the window is maximized, we don't need to update its position, so we set it to 0,0
      dispatch({ type: 'UPDATE_WINDOW_POSITION', payload: { id: window.id, x: 0, y: 0 } });
    }
  }, [window.maximized, dispatch, window.id]);

  const renderAppContent = () => {
    switch (window.appId) {
      case 'text-editor':
        return <TextEditor windowId={window.id} />;
      case 'calendar':
        return <CalendarApp />;
      case 'tic-tac-toe':
        return <TicTacToe />;
      default:
        return null;
    }
  };

  return (
    <Draggable
      handle=".handle"
      defaultPosition={{ x: window.x, y: window.y }}
      position={{ x: window.x, y: window.y }}
      onStop={handleDrag}
      disabled={window.maximized}
    >
      <Resizable
        width={300}
        height={200}
        onResize={handleResize}
        lockAspectRatio={false}
        disabled={window.maximized}
      >
        <WindowContainer
          ref={windowRef}
          onClick={handleWindowClick}
          active={state.activeApp === window.appId}
          maximized={window.maximized}
        >
          <TitleBar className="handle">
            <Title>{window.title}</Title>
            <WindowButtons>
              <button onClick={handleMinimize}>-</button>
              <button onClick={handleMaximize}>{window.maximized ? '□' : '■'}</button>
              <button onClick={handleClose}>X</button>
            </WindowButtons>
          </TitleBar>
          <Content maximized={window.maximized}>
            {renderAppContent()}
          </Content>
        </WindowContainer>
      </Resizable>
    </Draggable>
  );
}

export default Window;