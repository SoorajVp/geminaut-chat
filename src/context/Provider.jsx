import React, { createContext, useState } from 'react';
export const MainContext = createContext();

const ContextProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <MainContext.Provider value={{ userProfile, setUserProfile, darkMode, setDarkMode, loading, setLoading }}>
            {children}
        </MainContext.Provider>
    );
};

export default ContextProvider;
