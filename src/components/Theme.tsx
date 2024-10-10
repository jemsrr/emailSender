"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const Theme = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false); 

  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to toggle between themes
  const themeHandler = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div onClick={themeHandler} className="font-black text-6xl">
      {theme === "dark" ? <Sun /> : <Moon />}
    </div>
  );
};

export default Theme;
