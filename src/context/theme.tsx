"use client";

import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type Theme = {
  color: string;
};

export type Themes = Map<string, Theme>;

type ThemeContextProps = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

export const defaultColor = "black";

const themeDefault: Theme = {
  color: defaultColor,
};

const ThemeContext = createContext<ThemeContextProps>({
  theme: themeDefault,
  setTheme: () => {},
});

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(themeDefault);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <meta name="theme-color" content={theme.color} />
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
