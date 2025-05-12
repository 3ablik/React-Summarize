"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
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
      <html lang="en" className="relative">
        <body
          className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-[100vh]  `}
        >
          <Toaster position="top-right" />
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </Provider>
  );
}
