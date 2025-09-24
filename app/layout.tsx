// app/layout.tsx
import Header from "./components/Header";
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Bingo Lobby",
  description: "Play bingo online with real-time lobbies",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white font-sans">
        <Header/>

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="bg-gray-800 px-6 py-4 text-center text-gray-300">
          © 2025 Bingo. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
