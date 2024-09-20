import { ThemeProvider as NextThemeProvider } from "next-themes";

export default function ThemeProvider({ children }) {
    return (
      <NextThemeProvider attribute="class">
        { children }
      </NextThemeProvider>
    );
}
