import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Tray = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin-left: 10px;
  }
`;

const Clock = styled.div`
  font-size: 0.9em;
`;

function SystemTray() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Tray>
      <Clock>{currentTime.toLocaleTimeString()}</Clock>
      {/* Add other system tray items here */}
    </Tray>
  );
}

export default SystemTray;