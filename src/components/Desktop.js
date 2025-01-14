import React from "react";
import styled from "styled-components";
import DesktopIcon from "./DesktopIcon";
import Taskbar from "./Taskbar";
import Window from "./Window";
import { AppContext } from "../AppContext";
import { useContext } from "react";

const DesktopContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${(props) => props.wallpaper});
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

const DesktopIcons = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  grid-gap: 20px;
`;

function Desktop() {
  const { state } = useContext(AppContext);

  return (
    <DesktopContainer
      wallpaper={`${process.env.PUBLIC_URL}/images/wallpaper.jpg`}
    >
      <DesktopIcons>
        <DesktopIcon
          title="Text Editor"
          icon={`${process.env.PUBLIC_URL}/images/text-editor-icon.png`}
          appId="text-editor"
        />
        <DesktopIcon
          title="Calendar"
          icon={`${process.env.PUBLIC_URL}/images/calendar-icon.png`}
          appId="calendar"
        />
        <DesktopIcon
          title="Tic Tac Toe"
          icon={`${process.env.PUBLIC_URL}/images/tic-tac-toe-icon.png`}
          appId="tic-tac-toe"
        />
      </DesktopIcons>
      {state.openWindows.map((window) => (
        <Window key={window.id} window={window}></Window>
      ))}
      <Taskbar />
    </DesktopContainer>
  );
}

export default Desktop;
