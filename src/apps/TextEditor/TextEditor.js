import React, { useState, useEffect, useContext } from 'react';
import './TextEditor.css';
import { AppContext } from '../../AppContext';

function TextEditor({ windowId }) {
  const [content, setContent] = useState('');
  const { state, dispatch } = useContext(AppContext);

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  return (
    <div className="text-editor">
      <textarea value={content} onChange={(e) => handleContentChange(e.target.value)} />
    </div>
  );
}

export default TextEditor;