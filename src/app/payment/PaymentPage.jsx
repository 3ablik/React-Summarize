"use client";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/slices/authSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PaymentPage = () => {
  const userAuth = useSelector((state) => state.auth.userAuth);
  const cartItems = userAuth.cart;
  let summPrice = 0;
  cartItems.forEach((item) => {
    summPrice += item.price * item.quantity;
  });
  const totalPrice = userAuth.role === "worker" ? summPrice * 0.5 : summPrice;
  const dispatch = useDispatch();
  const router = useRouter();
  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = () => {
    setIsPaid(true);
    dispatch(clearCart());
  };

  if (isPaid) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-3xl font-bold mb-4 text-[#212121]">
          Thank you for your order!
        </h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => router.push("/")}
        >
          On main page
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-semibold mb-6">Оплата заказа</h1>
      <ul className="mb-4">
        {cartItems.map((item) => (
          <li key={item.id} className="mb-2 text-[#6b728f]">
            {item.name} — {item.price}₸ × {item.quantity}
            <span className="text-gray-500">
              {" "}
              = {item.price * item.quantity}₸
            </span>
          </li>
        ))}
      </ul>
      <p className="text-xl font-medium mb-4 text-[#212121]">
        Total: {totalPrice}₸
      </p>

      <div className="flex flex-col gap-3 mb-6">
        <input className="border px-4 py-2 rounded" placeholder="Name" />
        <input className="border px-4 py-2 rounded" placeholder="Email" />
        <input className="border px-4 py-2 rounded" placeholder="Card number" />
        <input className="border px-4 py-2 rounded" placeholder="CVV" />
      </div>

      <button
        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        onClick={handlePayment}
      >
        Подтвердить оплату
      </button>
    </div>
  );
};

export default PaymentPage;
