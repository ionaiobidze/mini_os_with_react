import React, { createContext, useState, useReducer } from 'react';

// Initial state for the application
const initialState = {
  openWindows: [], // Array to track open windows { id, appId, title, minimized, maximized, x, y }
  activeApp: null, // Currently active app
  theme: 'light', // Current theme
};

// Reducer function to handle state changes
const appReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_WINDOW':
      // Add a new window to the openWindows array if it's not already open
      if (!state.openWindows.some((window) => window.appId === action.payload.appId)) {
        return {
          ...state,
          openWindows: [...state.openWindows, { ...action.payload, id: Date.now(), minimized: false, maximized: false, x: 50, y: 50 }],
        };
      }
      return state;
    case 'CLOSE_WINDOW':
      // Remove a window from the openWindows array
      return {
        ...state,
        openWindows: state.openWindows.filter((window) => window.id !== action.payload),
      };
    case 'MINIMIZE_WINDOW':
      // Minimize a window
      return {
        ...state,
        openWindows: state.openWindows.map((window) =>
          window.id === action.payload ? { ...window, minimized: true } : window
        ),
      };
    case 'MAXIMIZE_WINDOW':
      // Maximize or restore a window
      return {
        ...state,
        openWindows: state.openWindows.map((window) =>
          window.id === action.payload ? { ...window, maximized: !window.maximized } : window
        ),
      };
    case 'RESTORE_WINDOW':
      // Restore a minimized window
      return {
        ...state,
        openWindows: state.openWindows.map((window) =>
          window.id === action.payload ? { ...window, minimized: false } : window
        ),
      };
    case 'SET_ACTIVE_APP':
      // Set the active app
      return {
        ...state,
        activeApp: action.payload,
      };
    case 'CHANGE_THEME':
      // Change the current theme
      return {
        ...state,
        theme: action.payload,
      };
    case 'UPDATE_WINDOW_POSITION':
      // Update window position after dragging
      return {
        ...state,
        openWindows: state.openWindows.map((window) =>
          window.id === action.payload.id ? { ...window, x: action.payload.x, y: action.payload.y } : window
        ),
      };
    default:
      return state;
  }
};

// Create the app context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};