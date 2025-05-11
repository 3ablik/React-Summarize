"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "@/app/store/thunks/productsThunks";

function Modal({ pizza, onClose }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [rate, setRate] = useState("");
  const [price, setPrice] = useState("");
  const [dsc, setDsc] = useState("");
  const [img, setImg] = useState("");

  const handleSave = () => {
    const newPizza = {
      name: name,
      country: country,
      rate: rate,
      price: price,
      img: img,
      dsc: dsc,
      id: dsc + Math.floor(Math.random() * 1000),
    };
    console.log(newPizza);
    dispatch(createProduct(newPizza));
  };

  return (
    <div
      id="modal-background"
      onClick={(e) => e.target.id === "modal-background" && onClose()}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-xl w-[800px] h-[500px] flex items-center justify-between max-[800px]:w-[90%]"
      >
        <div className="w-full h-full flex justify-around items-center">
          <div className="flex flex-col w-[45%]">
            <textarea
              className="text-2xl text-orange-500 w-[80%] h-[200px] border-none resize-none focus:outline-none"
              placeholder="Image Source"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
            <textarea
              className="text-2xl text-orange-500 w-[80%] h-[56px] border-none resize-none focus:outline-none"
              placeholder="Description"
              value={dsc}
              onChange={(e) => setDsc(e.target.value)}
            />
            <img
              src={img.length > 0 ? img : "Not found"}
              alt="Not found"
              className="w-[150px] h-[150px] mt-2  max-sm:w-[100px] max-sm:h-[100px]"
            />
          </div>
          <div className="flex flex-col items-center h-[400px] justify-between w-[45%]">
            <div className="w-full flex justify-between items-end">
              <input
                className="text-3xl text-orange-500 border-none focus:outline-none w-[80%]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
            <div className="flex flex-col items-center">
              <textarea
                className="text-2xl text-orange-500 w-[80%] h-[30px] border-none resize-none focus:outline-none mt-4"
                placeholder="Produced in"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <textarea
                className="text-2xl text-orange-500 w-[80%] h-[30px] border-none resize-none focus:outline-none mt-2"
                placeholder="Rating"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
              <textarea
                className="text-2xl text-orange-500 w-[80%] h-[30px] border-none resize-none focus:outline-none mt-2"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <button
              className="w-[80%] h-[50px] text-xl mt-5"
              onClick={() => {
                handleSave();
                onClose();
              }}
            >
              Post
            </button>
            <button
              className="w-[80%] h-[50px] text-xl mt-5 bg-gray-400 text-white"
              onClick={() => onClose()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
