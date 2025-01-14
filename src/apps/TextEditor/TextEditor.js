import React, { useState, useEffect, useContext } from 'react';
import './TextEditor.css';
import { AppContext } from '../../AppContext';

function TextEditor({ windowId }) {
  const [content, setContent] = useState('');
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    // Load content from localStorage when the component mounts
    const savedContent = localStorage.getItem(`textEditor-${windowId}`);
    if (savedContent) {
      setContent(savedContent);
    }
  }, [windowId]);

  const handleContentChange = (newContent) => {
    setContent(newContent);
    // Save content to localStorage whenever it changes
    localStorage.setItem(`textEditor-${windowId}`, newContent);
  };

  const handleSave = () => {
    // Save content to localStorage when the user clicks on save button
    localStorage.setItem(`textEditor-${windowId}`, content);
    alert('Content saved!');
  };

  return (
    <div className="text-editor">
      <div className="toolbar">
        <button onClick={handleSave}>Save</button>
      </div>
      <textarea value={content} onChange={(e) => handleContentChange(e.target.value)} />
    </div>
  );
}

export default TextEditor;