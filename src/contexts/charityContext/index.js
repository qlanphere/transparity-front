import React, { useState, useContext } from 'react'

const CharityContext = React.createContext();

export function CharityProvider({ children }) {
    const [charityName, setCharityName] = useState("");
    const [charityId, setCharityId] = useState();

    return (
        <CharityContext.Provider value={{ charityName, setCharityName, charityId, setCharityId }}>
            {children}
        </CharityContext.Provider>

    )
}
export function useCharityContext() {
    return useContext(CharityContext)
}
