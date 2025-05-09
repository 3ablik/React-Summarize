import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import img from "../images/logo.png";
const Header = () => {
  console.log(img.src);

  const { isAuthenticated, userAuth } = useSelector((state) => state.auth);
  const cart = userAuth?.cart || [];
  let cartLength = 0;
  cart.forEach((item) => {
    cartLength += item.quantity;
  });
  console.log(cart);

  return (
    <header className="flex justify-center">
      <nav className="w-[90%]">
        <div>
          <Link href="/">Home</Link>
          {isAuthenticated ? null : (
            <div>
              <Link href="/login">Sign In</Link>
              <Link href="register">Sign Up</Link>
            </div>
          )}
          <Link href="/profile">Profile</Link>
        </div>

        {isAuthenticated ? (
          <div className="relative">
            <Link className="ml-4" href="/cart">
              Cart
            </Link>
            {cartLength > 0 && (
              <div className=" absolute top-[-9px] right-[-16px] rounded-[50%] bg-red-500 text-white w-[20px] h-[20px] flex justify-center items-center text-[12px]">
                {cartLength}
              </div>
            )}
          </div>
        ) : (
          <img src={img.src} alt="Logo" />
        )}
      </nav>
    </header>
  );
};

export default Header;
