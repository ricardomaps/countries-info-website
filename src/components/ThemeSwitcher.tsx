"use client"
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons"

export default function ThemeSwitcher() {
  const {theme, setTheme} = useTheme();
  return (
    <button 
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="text-skin-base">
      <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} className="mr-2"/>
      {theme === "light" ? "Dark" : "Light"} Mode
     </button>
  );
}
