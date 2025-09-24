"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { HiMenu, HiX } from "react-icons/hi";

type User = {
  telegram_id: string;
  balance: number;
};

interface HeaderProps {
  telegramId?: string;
}

function HeaderContent({ telegramId }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!telegramId) return;

    axios
      .get(`https://bingo-backend-production-32e1.up.railway.app/api/users/${telegramId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to fetch user:", err));
  }, [telegramId]);

  return (
    <header className="bg-mint-500 px-4 sm:px-6 py-4 shadow-md flex flex-col sm:flex-row justify-between items-center relative">
      {/* Logo */}
      <div className="flex items-center justify-between w-full sm:w-auto">
        <h1 className="text-2xl font-bold text-white flex items-center gap-1">
          🎮 Lucky Bingo
        </h1>

        {/* Hamburger for mobile */}
        <button
          className="sm:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Navigation & Balance */}
      <nav
        className={`flex flex-col sm:flex-row sm:items-center sm:gap-6 w-full sm:w-auto mt-3 sm:mt-0 transition-all duration-300 ${
          menuOpen ? "max-h-96" : "max-h-0 overflow-hidden sm:max-h-full"
        }`}
      >
        <ul className="flex flex-col sm:flex-row sm:gap-4 gap-2 items-center text-white font-medium">
          <li>
            <a href="#lobbies" className="hover:text-black transition-colors">
              Lobbies
            </a>
          </li>
          <li>
            <a href="#how-to-play" className="hover:text-black transition-colors">
              How to Play
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-black transition-colors">
              Contact
            </a>
          </li>
        </ul>

        {user && (
          <div className="mt-2 sm:mt-0 ml-0 sm:ml-4 px-4 py-2 bg-black/70 rounded-lg shadow-md text-white font-semibold text-sm sm:text-base flex items-center gap-2 border border-green-400">
            <span className="text-green-400 font-bold">💰</span>
            <span>Balance:</span>
            <span className="text-mint-400">{user.balance} ETB</span>
          </div>
        )}
      </nav>
    </header>
  );
}

export default HeaderContent;
