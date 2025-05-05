import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import img from "../images/logo.png";
const Header = () => {
  console.log(img.src);

  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <header>
      <nav>
        <div>
          <Link href="/">Home</Link>
          <Link href="/login">Sign In</Link>
          <Link href="register">Sign Up</Link>
          <Link href="/profile">Profile</Link>
        </div>

        {isAuthenticated ? (
          <Link href="/cart">Cart</Link>
        ) : (
          <img src={img.src} alt="Logo" />
        )}
      </nav>
    </header>
  );
};

export default Header;
