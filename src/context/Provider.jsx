import React, { createContext, useState } from 'react';
export const MainContext = createContext();

const ContextProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);

    return (
        <MainContext.Provider value={{ userProfile, setUserProfile }}>
            {children}
        </MainContext.Provider>
    );
};

export default ContextProvider;
