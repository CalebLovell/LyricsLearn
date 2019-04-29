import React from "react";
import "./Slot.scss";

function Slot(props) {
  // console.log(props.ogLine);
  return (
    <div className="slot">
      {!props.transLine[0] ? (
        <div className="needed-for-onClick">
          <div className="line-flag">
            <img src={props.ogLine.language_flag_circular} alt="language flag" />
          </div>
          <div className="left-words-container">
            <p>{props.ogLine.line_lyrics}</p>
          </div>
          <div className="right-words-container" />
        </div>
      ) : (
        <div
          className="needed-for-onClick"
          onMouseOver={() => {
            props.setExplanation(
              props.transLine[0].line_translation_explanation
            );
          }}
        >
          <div className="line-flag">
            <img src={props.ogLine.language_flag_circular} alt="language flag" />
          </div>
          <div className="left-words-container">
            <p>{props.ogLine.line_lyrics}</p>
          </div>
          <div className="right-words-container">
            <p>{props.transLine[0].line_translation_lyrics}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Slot;
