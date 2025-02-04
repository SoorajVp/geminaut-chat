import React, { useState, useEffect, useContext } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { MainContext } from "../context/Provider";
import { useNavigate } from "react-router-dom";
import VoiceRecorder from "./VoiceRecord";

const Home = () => {
    const { userProfile, setUserProfile } = useContext(MainContext);
    const navigate = useNavigate()
    useEffect(() => {
        if(userProfile) {
            navigate("/chat")
        }
    }, [])

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            // setUser(codeResponse);
            axios.get(
                `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${codeResponse.access_token}`,
                        Accept: "application/json",
                    },
                },
            )
                .then((res) => {
                    console.log(res.data, codeResponse.access_token)
                    setUserProfile(res.data);
                    localStorage.setItem("access_token", codeResponse.access_token);
                    navigate("/chat")
                })
                .catch((err) => console.log(err));
        },
        onError: (error) => console.log("Login Failed:", error),
    });


  

    return (
        <div className="min-h-screen bg-gradient-to-r from-black to-neutral-500 flex flex-col justify-center items-center text-center text-white font-serif">
            <div className="max-w-4xl px-6">
                <h1 className="flex flex-wrap justify-center items-center text-4xl md:text-6xl font-bold mb-6 ">
                    <span>Welcome to</span>
                    <span className="text-blue-400 pl-2">Geminaut</span>
                    <img
                        src="/logo.png" // Replace with Gemini's avatar or suitable image
                        alt="Geminaut Logo"
                        className="rounded-lg ml-3 w-20 h-20"
                    />
                </h1>
                <p className="text-lg md:text-xl mb-8 leading-relaxed">
                    Experience the warmth of a friendship with Geminaut,<br /> Your AI-powered conversational buddy. <br />
                    Create an account or log in to start chatting and connect with Geminaut anytime, <br /> anywhere.
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                    <button onClick={() => navigate("/chat")} className="bg-white hover:bg-neutral-200 text-black font-semibold py-3 px-8 rounded-full transition shadow-lg focus:outline-none focus:ring-2 focus:ring-black">
                        Get Started
                    </button>
                    <button onClick={login} className="bg-black hover:bg-neutral-900 text-white font-semibold py-3 px-8 rounded-full transition shadow-lg focus:outline-none focus:ring-2 focus:ring-white">
                        Sign-in with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
