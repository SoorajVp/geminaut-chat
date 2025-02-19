import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardVoice } from "react-icons/md";

const VoiceRecorder = ({ handleSumbit, setRecordedText }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [error, setError] = useState("");
    const recognitionRef = useRef(null); // Persistent reference for recognition

    const handleRecording = () => {
        if (isRecording && recognitionRef.current) {
            stopRecording();
            return;
        }
        setRecordedText("");

        if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
            setError("Your browser does not support the Web Speech API.");
            return;
        }

        setError("");
        setIsRecording(true);

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!recognitionRef.current) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true; // Stops when user stops speaking
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = "en-US";

            recognitionRef.current.onresult = (event) => {
                let transcript = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                setRecordedText(transcript.trim());
            };

            recognitionRef.current.onerror = (event) => {
                setError("Error occurred in recognition: " + event.error);
                stopRecording();
            };

            recognitionRef.current.onend = () => {
                setIsRecording(false);
            };
        }

        recognitionRef.current.start();
    };

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsRecording(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSumbit();
        }
    };

    return (
        <button
            className={`${isRecording ? "bg-neutral-300 dark:bg-neutral-800" : "dark:hover:bg-neutral-800"
                } border-2 border-gray-500 text-black dark:text-white my-1 p-1 rounded-full`}
            onClick={handleRecording}
            onKeyDown={handleKeyPress}
        >
            <MdKeyboardVoice
                size={28}
                className={isRecording ? "animate-pulse text-red-600" : ""}
            />
        </button>
    );
};

export default VoiceRecorder;
