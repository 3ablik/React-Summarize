"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import img from "../app/components/images/logo.png";
import Link from "next/link";
import { Provider } from "react-redux";
import store from "../app/store/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <header>
            <nav>
              <div>
                <Link href="/">Home</Link>
                <Link href="/login">Sign In</Link>
                <Link href="register">Sign Up</Link>
                <Link href="/profile">Profile</Link>
              </div>
              <div>
                <p>+78978978978</p>
                <p>site@site.site</p>
              </div>
              <img src={img.src} alt="Logo" />
            </nav>
          </header>

          {children}
        </body>
      </html>
    </Provider>
  );
}
