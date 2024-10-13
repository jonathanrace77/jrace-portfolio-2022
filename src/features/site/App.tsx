import React, { MutableRefObject, useEffect, useRef } from "react";
import { overWorldMap } from "../../maps/overworldMap";
import { skillsMap } from "../../maps/skillsMap";
import { _tileWidth, _tileHeight } from "../../scripts/Constants.js";
import "./App.css";
import { gsap } from "gsap";
import OverlayActionButtons from "../island/OverlayActionButtons";
import OverlayArrowButtons from "../island/OverlayArrowButtons";
import Player from "../island/Player";
import Skills from "../island/Skills";
import RubberDuck from "../island/RubberDuck";
import Windmill from "../island/Windmill";
import WorldMap from "../island/WorldMap";
import { useAppSelector } from "../../store/hooks";

function App({ themeIsDarkMode }: { themeIsDarkMode: boolean }) {
  const tileMap = useAppSelector((state) => state.mapReducer.tileMap);
  const worldMapStyle = useAppSelector((state) => state.mapReducer.worldMapStyle);
  const transitionRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

  const triggerTransitionAnimation = (): void => {
    gsap.fromTo(
      [transitionRef.current],
      {
        opacity: 1,
        duration: 0,
      },
      {
        opacity: 0,
        duration: 1.0,
        ease: "steps(8)",
      }
    );
  };

  useEffect(() => {
    triggerTransitionAnimation();
  }, [themeIsDarkMode]);

  return (
    <>
      <div className="overlay-buttons-container">
        <OverlayActionButtons></OverlayActionButtons>
        <OverlayArrowButtons></OverlayArrowButtons>
      </div>
      <div id="appContainer" className="crt">
        <div className="App">
          <div id="world-map-outer">
            <div id="world-map-container" style={worldMapStyle}>
              <WorldMap tileMap={tileMap}></WorldMap>
              {tileMap === overWorldMap && <Windmill themeIsDarkMode={themeIsDarkMode}></Windmill>}
              {tileMap === overWorldMap && <RubberDuck themeIsDarkMode={themeIsDarkMode}></RubberDuck>}
              {tileMap === skillsMap && <Skills></Skills>}
              <Player triggerTransitionAnimation={triggerTransitionAnimation}></Player>
            </div>
          </div>
        </div>
        <div id="transitionScreen" className="transition" ref={transitionRef}></div>
      </div>
    </>
  );
}

export default App;
