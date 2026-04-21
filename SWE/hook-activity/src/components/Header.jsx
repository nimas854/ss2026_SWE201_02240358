import React from "react";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const { theme } = useTheme();

  return (
    <header className="header">
      <div className="brand">
        <p className="brand-kicker">React hooks activity</p>
        <h1>Reactive Task Board</h1>
        <p className="header-note">
          A compact demo of local state, side effects, shared context, reducers,
          and custom hooks.
        </p>
      </div>
      <div className="badge">Theme: {theme}</div>
    </header>
  );
}

export default Header;
