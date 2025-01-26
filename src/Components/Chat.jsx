import React, { useContext, useEffect, useRef, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import Header from './Header';
import GeminiServiceContent from '../utils/gemini';
import { MainContext } from '../context/Provider';
import { PiSpinnerGapBold } from 'react-icons/pi';
import { MdKeyboardVoice } from 'react-icons/md';
import VoiceRecorder from './VoiceRecord';

const Chat = () => {
    const { userProfile } = useContext(MainContext);
    const [inputValue, setInputValue] = useState('');
    const [conversation, setConversation] = useState([]);
    const [recordedText, setRecordedText] = useState("");
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        setInputValue(recordedText)
    }, [recordedText])

    useEffect(() => {
        // Scroll to the bottom of the conversation whenever it updates
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        e.target.style.height = 'auto'; // Reset height to calculate new height
        e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height dynamically
    };

    const handleSumbit = async () => {
        if (!inputValue.trim()) return; // Ignore empty inputs
        try {
            setLoading(true)
            const response = await GeminiServiceContent(inputValue);
            const chat = {
                user: inputValue,
                gemini: response,
            };
            setInputValue('');
            setConversation((prev) => [...prev, chat]);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-neutral-800 to-black">
            <Header />
            <main className="flex-1 p-2 overflow-y-auto container">
                {conversation?.length === 0 ? (
                    <div className="flex flex-col justify-center items-center h-full text-center font-serif">
                        <h1 className="text-4xl font-extrabold text-white">
                            Hello, {userProfile?.given_name}
                        </h1>
                        <h3 className="text-2xl pt-2 font-semibold text-neutral-300 font-mono" >
                            What can I help with?
                        </h3>
                    </div>
                ) : (
                    conversation.map((chat, index) => (
                        <div className="space-y-2 mt-2" key={index}>
                            <div className="flex justify-end">
                                <div className="bg-neutral-700 shadow-md text-white py-2 px-4 rounded-t-lg rounded-l-lg max-w-md">
                                    {chat.user}
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <div className="bg-neutral-300 shadow-md text-black py-2 px-4 rounded-t-lg rounded-r-lg max-w-screen-lg">
                                    <div className='prose prose-neutral max-w-none' dangerouslySetInnerHTML={{ __html: chat.gemini }} />
                                </div>
                            </div>
                        </div>
                    ))
                )}

                <div ref={chatEndRef} /> {/* Reference for auto-scrolling */}
            </main>
            <footer className="border-t border-gray-700 pb-5 pt-2 flex-none container px-2 shadow-lg">
                <div className="flex items-end border-2 border-gray-600 bg-neutral-950 rounded-3xl">
                    <textarea
                        placeholder="Type your prompt..."
                        rows={1}
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault(); // Prevent a new line
                                handleSumbit(); // Call the submit function
                            }
                        }}
                        className="flex-1 py-2 px-4 resize-none outline-none overflow-hidden bg-neutral-950 text-gray-100 rounded-l-3xl"
                        style={{ maxHeight: '10rem' }}
                    />

                    <VoiceRecorder handleSumbit={handleSumbit} setRecordedText={setRecordedText} />
                    
                    {
                        loading ?
                            <button className="bg-gray-400 border-2 border-gray-900 text-black py-1 m-1 px-2.5 rounded-full"
                            >
                                <PiSpinnerGapBold size={30} className="animate-spin" />
                            </button> :
                            <button
                                onClick={handleSumbit}
                                className={`${!inputValue.trim() ? "bg-gray-400 cursor-not-allowed" : "bg-gray-200"} hover:bg-gray-400 border-2 border-gray-900 text-black py-1 m-1 pl-3 pr-2 rounded-full shadow-md`}
                            >
                                <IoMdSend size={30} />
                            </button>
                    }
                </div>
            </footer>
        </div>
    );
};

export default Chat;
