import { createContext, useContext, useState } from "react";

// Define Type for ThemeContextProvider
type ThemeProps = {
  children: React.ReactNode;
};

//Define Interface for Theme / Initial State
interface UITheme {
  isLightMode: boolean;
  light: { bg: string; text: string };
  dark: { bg: string; text: string };
  toggleTheme?: () => void;
}

const initialState: UITheme = {
  isLightMode: false,
  light: { bg: "white", text: "black" },
  dark: { bg: "black", text: "white" }
};

// Create Context
const ThemeContext = createContext<UITheme | null>(null);

// Theme Context
const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("You can't use the themecontext outside of the provider");
  }
  return context;
};

const ThemeContextProvider = ({ children }: ThemeProps) => {
  const [theme, setTheme] = useState(initialState);

  const toggleTheme = () => {
    setTheme((state) => {
      return {
        ...state,
        isLightMode: !state.isLightMode
      };
    });
  };

  return (
    <ThemeContext.Provider value={{ ...theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, useThemeContext };

export default ThemeContextProvider;
