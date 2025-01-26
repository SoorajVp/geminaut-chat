import React, { useContext, useState } from 'react';
import { MdDarkMode, MdLightMode, MdOutlineLogout } from 'react-icons/md';
import { MainContext } from '../context/Provider';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { userProfile, setUserProfile } = useContext(MainContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const navigate = useNavigate()

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleLogout = () => {
        // Perform logout logic here
        console.log('User logged out');
        // log out function to log the user out of google and set the profile array to null
        googleLogout();
        localStorage.removeItem("access_token")
        setUserProfile(null);
        navigate("/")
    };


    return (
        <header className="flex justify-between items-center font-serif bg-black text-white px-6 py-2 shadow-md flex-none relative">
            <div className="flex items-center gap-2">
                <img
                    src="/logo.png" // Replace with Gemini's avatar or suitable image
                    alt="Gemino Logo"
                    width={40}
                    height={40}
                    className="rounded-lg ml-3"
                />
                <h1 className="text-xl font-semibold">Geminaut</h1>
            </div>
            <div className="flex items-center gap-3 relative">
                <MdDarkMode size={35} />
                <MdLightMode size={35} />
                <img
                    src={userProfile?.picture || "/user.png"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                    <div className="absolute top-12 right-0 bg-black text-gray-100 shadow-lg rounded-lg min-w-40 p-4">
                        <p className='text-base font-semibold'>{userProfile?.name}</p>
                        <p className='text-sm font-medium text-gray-300'>{userProfile?.email}</p>
                        <button
                            onClick={handleLogout}
                            className="flex items-center font-semibold gap-2 bg-neutral-900 hover:bg-red-600 ext-base px-3 py-1 rounded-md border border-red-700 mt-2 transition-all duration-300 ease-in-out"
                        >
                            Logout <MdOutlineLogout />
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
