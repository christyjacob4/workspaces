import React from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";

import MicIcon from "@material-ui/icons/Mic";
import IconButton from "@material-ui/core/IconButton";

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
};

const options = {
  autoStart: false,
  continuous: false,
};

const Speech = ({
  transcript,
  browserSupportsSpeechRecognition,
  startListening,
  recognition,
  onChange,
}) => {
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

    // recognition.onstart = () => {
    //   console.log("Listening has started");
    // };
    // recognition.onend = () => {
    //   console.log("Listening has stopped");
    // };

  recognition.onspeechend = () => {
    console.log("Speech stopped");
    let event = {
      target: {
        value: transcript,
      },
    };
    onChange(event);
  };
  recognition.onspeechstart = () => {
    console.log("Speech has started");
  };

  return (
    <IconButton
      onClick={() => {
        startListening();
      }}
    >
      <MicIcon />
    </IconButton>
  );
};

Speech.propTypes = propTypes;

export default SpeechRecognition(options)(Speech);
