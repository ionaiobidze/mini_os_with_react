import React, { useState, useEffect, useContext } from 'react';
import './TextEditor.css';
import { AppContext } from '../../AppContext';

function TextEditor({ windowId }) {
  const [content, setContent] = useState('');
  const [savedFiles, setSavedFiles] = useState([]); // Array to hold saved file names (window IDs)
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    // Load content from localStorage on mount
    const savedContent = localStorage.getItem(`textEditor-${windowId}`);
    if (savedContent) {
      setContent(savedContent);
    }

    // Load saved files list
    const files = Object.keys(localStorage)
      .filter((key) => key.startsWith('textEditor-'))
      .map((key) => key.replace('textEditor-', ''));
    setSavedFiles(files);
  }, [windowId]);

  useEffect(() => {
    // Save content to localStorage whenever it changes
    localStorage.setItem(`textEditor-${windowId}`, content);
  }, [content, windowId]);

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleSave = () => {
    // In this example, we are saving on every change
    // You might want to implement a more explicit save button/action
    alert('Content saved!');
  };

  const handleOpenFile = (fileId) => {
    const savedContent = localStorage.getItem(`textEditor-${fileId}`);
    if (savedContent) {
      setContent(savedContent);
      // Update the current window's ID in the state to reflect the opened file
      dispatch({
        type: 'UPDATE_WINDOW_APP_ID',
        payload: { id: windowId, newAppId: `text-editor-${fileId}` },
      });
    } else {
      alert('File not found!');
    }
  };

  return (
    <div className="text-editor">
      <div className="toolbar">
        <select onChange={(e) => handleOpenFile(e.target.value)} value="">
          <option value="">Open File</option>
          {savedFiles.map((fileId) => (
            <option key={fileId} value={fileId}>
              {fileId}
            </option>
          ))}
        </select>
        <button onClick={handleSave}>Save</button>
      </div>
      <textarea value={content} onChange={(e) => handleContentChange(e.target.value)} />
    </div>
  );
}

export default TextEditor;