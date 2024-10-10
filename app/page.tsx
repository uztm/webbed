// app/page.tsx
'use client'
import { useEffect, useState } from "react";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
}

export default function HomePage() {
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    // Ensure Telegram WebApp object exists
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.init(); // Initialize the Telegram WebApp

      // Get the Telegram user data from the WebApp SDK
      const user = tg.initDataUnsafe?.user;
      if (user) {
        setTelegramUser(user);
      }
    }
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Welcome to My Telegram WebApp!</h1>
      {telegramUser ? (
        <>
          <p>Username: {telegramUser.username || "N/A"}</p>
          <p>
            Full Name: {telegramUser.first_name} {telegramUser.last_name || ""}
          </p>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
