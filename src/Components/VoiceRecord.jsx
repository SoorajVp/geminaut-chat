import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardVoice } from "react-icons/md";

const VoiceRecorder = ({ handleSumbit, setRecordedText }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [error, setError] = useState("");
    const recognitionRef = useRef(null); // Persistent reference for recognition

    const handleRecording = () => {
        // Stop recording if already recording
        if (isRecording && recognitionRef.current) {
            recognitionRef.current.stop();
            setIsRecording(false);
            return;
        }
        setRecordedText("")
        // Check browser compatibility for Web Speech API
        if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
            setError("Your browser does not support the Web Speech API.");
            return;
        }

        setError("");
        setIsRecording(true);

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        // Create a new instance only if one doesn't exist
        if (!recognitionRef.current) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = "en-US";

            // Handle transcription results
            recognitionRef.current.onresult = (event) => {
                let transcript = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                setRecordedText((prev) => prev + " " + transcript);
            };

            // Handle errors
            recognitionRef.current.onerror = (event) => {
                setError("Error occurred in recognition: " + event.error);
            };

            // Stop recording when recognition ends
            recognitionRef.current.onend = () => {
                setIsRecording(false);
            };
        }

        // Start recording
        recognitionRef.current.start();
    };

    // Stop recording if the `handleSumbit` prop changes (cleanup)
    useEffect(() => {
        if (isRecording && recognitionRef.current) {
            recognitionRef.current.onresult = (event) => {
                let transcript = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                setRecordedText((prev) => prev + " " + transcript);
            };
            
            recognitionRef.current.stop();
            setIsRecording(false);
        }
    }, [handleSumbit]);

    return (
        <button
            className={`${isRecording && "bg-neutral-800"
                } border-2 border-gray-500 text-white my-1 p-1 rounded-full`}
            onClick={handleRecording}
        >
            <MdKeyboardVoice
                size={30}
                className={isRecording && "animate-pulse text-red-500"}
            />
        </button>
    );
};

export default VoiceRecorder;
