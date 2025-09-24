"use client";

import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { useLobby } from "../components/WebSocketProvider"; // adjust path

interface HeaderProps {
  telegramId?: string;
}

function HeaderContent({ telegramId }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const lobby = useLobby(); // get the lobby context

  // get current user's balance
  const myBalance = telegramId ? lobby.balances[telegramId] ?? 0 : 0;

  return (
    <header className="bg-mint-500 px-2 py-2 shadow-md flex justify-between items-center relative">
      {/* Logo */}
      <h1 className="text-sm font-bold text-white flex items-center gap-1">
        🎮 Lucky Bingo
      </h1>

      {/* Balance always visible */}
      <div className="px-2 py-1 bg-black/70 rounded-md text-white text-xs flex items-center gap-1 border border-green-400">
        <span className="text-green-400 font-bold">💰</span>
        <span>{myBalance.toFixed(2)} ETB</span>
      </div>

      {/* Hamburger menu for mobile */}
      <button
        className="sm:hidden text-white text-xl ml-2"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Dropdown navigation */}
      <nav
        className={`absolute top-full right-2 bg-black/80 text-white rounded-md shadow-md overflow-hidden transition-all duration-300 w-40 ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col">
          <li>
            <a
              href="#lobbies"
              className="block px-4 py-2 text-sm hover:bg-green-500 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Lobbies
            </a>
          </li>
          <li>
            <a
              href="#how-to-play"
              className="block px-4 py-2 text-sm hover:bg-green-500 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              How to Play
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="block px-4 py-2 text-sm hover:bg-green-500 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderContent;
