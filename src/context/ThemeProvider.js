import React, { createContext, useContext } from 'react';
import { meetsWCAG } from '../utils/ColorContrastChecker';

const ThemeContext = createContext();

const ThemeProvider = ({ children, theme }) => {
    const { foregroundColor, backgroundColor } = theme;
    const isAccessible = meetsWCAG(foregroundColor, backgroundColor);

    return (
        <ThemeContext.Provider value={{ theme, isAccessible }}>
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };