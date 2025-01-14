import React, { createContext, useState, useReducer } from 'react';

// Helper function to get default size based on appId (moved outside)
const getDefaultSize = (appId) => {
  switch (appId) {
    case 'text-editor':
      return { width: 500, height: 400 }; // Increased size
    case 'calendar':
      return { width: 600, height: 500 }; // Increased size
    case 'tic-tac-toe':
      return { width: 400, height: 450 }; // Increased size
    default:
      return { width: 300, height: 200 };
  }
};

// Initial state for the application
const initialState = {
  openWindows: [], // Array to track open windows { id, appId, title, minimized, maximized, x, y, width, height }
  activeApp: null, // Currently active app
  theme: 'light', // Current theme
};

// Reducer function to handle state changes
const appReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_WINDOW':
      // Add a new window to the openWindows array if it's not already open
      if (!state.openWindows.some((window) => window.appId === action.payload.appId)) {
        const defaultSize = getDefaultSize(action.payload.appId);
        return {
          ...state,
          openWindows: [
            ...state.openWindows,
            {
              ...action.payload,
              id: Date.now(),
              minimized: false,
              maximized: false,
              x: 50,
              y: 50,
              ...defaultSize,
            },
          ],
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
    case 'UPDATE_WINDOW_SIZE':
      // Update window size after resizing
      return {
        ...state,
        openWindows: state.openWindows.map((window) =>
          window.id === action.payload.id
            ? { ...window, width: action.payload.width, height: action.payload.height }
            : window
        ),
      };
    case 'UPDATE_WINDOW_TITLE':
      return {
        ...state,
        openWindows: state.openWindows.map((window) =>
          window.id === action.payload.id ? { ...window, title: action.payload.newTitle } : window
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