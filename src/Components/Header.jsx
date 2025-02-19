import React, { useContext, useState, useEffect, useRef } from "react";
import { MdDarkMode, MdLightMode, MdOutlineLogout } from "react-icons/md";
import { MainContext } from "../context/Provider";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useGoogleOneTapLogin } from '@react-oauth/google';

const Header = () => {
    const { darkMode, setDarkMode, userProfile, setUserProfile } = useContext(MainContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useGoogleOneTapLogin({
        onSuccess: credentialResponse => {
            console.log(credentialResponse);
        },
        onError: () => {
            console.log('Login Failed');
        },
    });

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleLogout = () => {
        googleLogout();
        localStorage.removeItem("access_token");
        setUserProfile(null);
        navigate("/");
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleTheme = () => {
        setDarkMode(!darkMode)
    }

    return (
        <header className="flex justify-between items-center font-serif bg-neutral-200 dark:bg-black text-neutral-950 dark:text-white px-6 py-2 shadow-md flex-none relative">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => !userProfile && navigate("/")}>
                <img
                    src="/logo.png" // Replace with Gemini's avatar or suitable image
                    alt="Gemino Logo"
                    width={40}
                    height={40}
                    className="rounded-lg ml-3"
                />
                <h1 className="text-xl font-semibold">Geminaut</h1>
            </div>
            <div className="flex items-center gap-3 font-semibold">
                {
                    darkMode ?
                        <button onClick={handleTheme} className="flex items-center bg-neutral-800 hover:bg-neutral-100 hover:text-neutral-900 gap-2 border-2 border-neutral-500 pl-3 pr-1 py-1 transition ease-in-out duration-500 rounded-full">
                            Light
                            <MdLightMode size={30} />
                        </button> :
                        <button onClick={handleTheme} className="flex items-center bg-neutral-100 hover:bg-neutral-900 hover:text-white gap-2 border-2 border-neutral-500 pl-3 pr-1 py-1 transition ease-in-out duration-500 font-semibold rounded-full">
                            Dark
                            <MdDarkMode size={30} />
                        </button>
                }

                {
                    userProfile &&
                    <>
                        <img
                            src={userProfile?.picture || "/user.png"}
                            alt="Profile"
                            width={40}
                            height={40}
                            className="rounded-full cursor-pointer"
                            onClick={toggleDropdown}
                        />
                        {isDropdownOpen && (
                            <div
                                ref={dropdownRef}
                                className="absolute top-14 right-2 bg-white dark:bg-black text-neutral-800 dark:text-gray-100 shadow-lg rounded-lg min-w-40 p-4"
                            >
                                <p className="text-base font-semibold">{userProfile?.name}</p>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{userProfile?.email}</p>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center font-semibold gap-2 hover:bg-red-600 hover:text-white text-base px-3 py-1 rounded-md border border-red-700 mt-2 transition-all duration-300 ease-in-out"
                                >
                                    Logout <MdOutlineLogout />
                                </button>
                            </div>
                        )}
                    </>
                }

            </div>
        </header>
    );
};

export default Header;
