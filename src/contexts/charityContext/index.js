import React, { useState, useContext } from 'react'

const CharityContext = React.createContext();

export function CharityProvider({ children }) {
    const [charityName, setCharityName] = useState("");

    return (
        <CharityContext.Provider value={{ charityName, setCharityName }}>
            {children}
        </CharityContext.Provider>

    )
}
export function useCharityContext() {
    return useContext(CharityContext)
}
