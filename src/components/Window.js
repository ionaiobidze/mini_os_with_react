import React, { useContext, useRef, useEffect, useState } from 'react'; // Import useState here
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
  width: ${({ maximized, width }) => (maximized ? '100%' : width ? `${width}px` : 'auto')};
  height: ${({ maximized, height }) => (maximized ? '100%' : height ? `${height}px` : 'auto')};
  top: ${({ maximized }) => (maximized ? '0' : 'auto')};
  left: ${({ maximized }) => (maximized ? '0' : 'auto')};
  display: ${({ minimized }) => (minimized ? 'none' : 'block')};
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
  height: ${({ maximized, height }) => (maximized ? `calc(100% - 30px)` : height ? `calc(${height}px - 30px)` : 'auto')};
`;

function Window({ children, window }) {
  const { state, dispatch } = useContext(AppContext);
  const windowRef = useRef(null);
  const [size, setSize] = useState({ width: window.width || 300, height: window.height || 200 });

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
    dispatch({
      type: 'UPDATE_WINDOW_POSITION',
      payload: { id: window.id, x: ui.x, y: ui.y },
    });
  };

  const handleResize = (event, { element, size: newSize }) => {
    setSize(newSize);
    dispatch({
      type: 'UPDATE_WINDOW_SIZE',
      payload: { id: window.id, width: newSize.width, height: newSize.height },
    });
  };

  const handleWindowClick = () => {
    dispatch({ type: 'SET_ACTIVE_APP', payload: window.appId });
  };

  useEffect(() => {
    if (window.maximized) {
      dispatch({
        type: 'UPDATE_WINDOW_POSITION',
        payload: { id: window.id, x: 0, y: 0 },
      });
    }
  }, [window.maximized, dispatch, window.id]);

  useEffect(() => {
    setSize({ width: window.width || 300, height: window.height || 200 });
  }, [window.width, window.height]);

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
        width={size.width}
        height={size.height}
        onResize={handleResize}
        lockAspectRatio={false}
        disabled={window.maximized || window.minimized}
      >
        <WindowContainer
          ref={windowRef}
          onClick={handleWindowClick}
          active={state.activeApp === window.appId}
          maximized={window.maximized}
          minimized={window.minimized}
          width={size.width}
          height={size.height}
        >
          <TitleBar className="handle">
            <Title>{window.title}</Title>
            <WindowButtons>
              <button onClick={handleMinimize}>-</button>
              <button onClick={handleMaximize}>{window.maximized ? '□' : '■'}</button>
              <button onClick={handleClose}>X</button>
            </WindowButtons>
          </TitleBar>
          <Content maximized={window.maximized} height={size.height}>
            {renderAppContent()}
          </Content>
        </WindowContainer>
      </Resizable>
    </Draggable>
  );
}

export default Window;