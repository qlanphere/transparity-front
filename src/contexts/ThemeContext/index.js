import React, { useState, useContext } from 'react'

const ThemeContext = React.createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("#9ACD32");

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>

    )
}
export function useThemeContext() {
    return useContext(ThemeContext)
}