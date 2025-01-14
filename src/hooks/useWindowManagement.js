import { useContext } from 'react';
import { AppContext } from '../AppContext';

function useWindowManagement() {
  const { state, dispatch } = useContext(AppContext);

  const openWindow = (appId, title) => {
    dispatch({ type: 'OPEN_WINDOW', payload: { appId, title } });
  };

  const closeWindow = (windowId) => {
    dispatch({ type: 'CLOSE_WINDOW', payload: windowId });
  };

  const minimizeWindow = (windowId) => {
    dispatch({ type: 'MINIMIZE_WINDOW', payload: windowId });
  };

  const maximizeWindow = (windowId) => {
    dispatch({ type: 'MAXIMIZE_WINDOW', payload: windowId });
  };

  const restoreWindow = (windowId) => {
    dispatch({ type: 'RESTORE_WINDOW', payload: windowId });
  };

  const setActiveApp = (appId) => {
    dispatch({ type: 'SET_ACTIVE_APP', payload: appId });
  };

  const updateWindowPosition = (windowId, x, y) => {
    dispatch({ type: 'UPDATE_WINDOW_POSITION', payload: { id: windowId, x, y } });
  };

  return {
    openWindows: state.openWindows,
    activeApp: state.activeApp,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    setActiveApp,
    updateWindowPosition,
  };
}

export default useWindowManagement;