"use client";
import React, { useState } from "react";
import { motion } from "framer-motion"; // Прикольная штука
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  updateProduct,
} from "@/app/store/thunks/productsThunks";

function Modal({ pizza, onClose }) {
  const dispatch = useDispatch();
  const [rotation, setRotation] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const [name, setName] = useState(pizza.name);
  const [country, setCountry] = useState(pizza.country);
  const [rate, setRate] = useState(pizza.rate);
  const [price, setPrice] = useState(pizza.price);
  const [protein, setProtein] = useState(pizza.protein);
  const [hydrocarbons, setHydrocarbons] = useState(pizza.hydrocarbons);
  const [fats, setFats] = useState(pizza.fats);

  const handleSave = () => {
    const updatedPizza = {
      name: name,
      country: country,
      rate: Number(rate),
      price: Number(price),
      img: pizza.img,
      dsc: pizza.dsc,
      protein: Number(protein),
      hydrocarbons: Number(hydrocarbons),
      fats: Number(fats),
    };
    // console.log(updatedPizza);

    dispatch(updateProduct({ id: pizza.id, updatedData: updatedPizza }));
    setIsEdit(false);
  };
  const handleClickImg = () => {
    setRotation((prev) => prev - 45);
    setTimeout(() => {
      setRotation((prev) => prev + 405);
    }, 500);
  };

  return (
    <div
      id="modal-background"
      onClick={(e) => e.target.id === "modal-background" && onClose()}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative min-lg:max-h-[448px] bg-white rounded-xl p-6 w-full max-w-4xl h-3/6 max-[1100px]:h-4/6 flex flex-row gap-6   max-lg:max-w-[70%]  max-[850px]:flex-col max-[850px]:h-[90%] max-[850px]:gap-2 max-[850px]:items-center max-[850px]:justify-evenly  max-[550px]:h-[70%]  max-[380px]:max-h-[60%]  max-[450px]:justify-between"
      >
        <img
          src={pizza.img}
          alt={pizza.name}
          className="max-w-[50%]  max-[850px]:max-w-[70%] max-[850px]:max-h-[100%] max-md:max-w-[90%]  max-sm:max-w-[275px]  max-[440px]:max-w-[95%]"
        />
        <div className="flex flex-col items-center justify-between w-[60%] max-[850px]:w-full max-[850px]:h-[43%] max-[850px]:items-center max-[450px]:flex-col  max-[450px]:h-[60%]">
          <div className="w-full flex flex-col gap-4  max-lg:gap-0  max-[850px]:w-[90%] max-[850px]:flex-row  max-md:justify-between  max-[450px]:w-[100%]">
            <div className="w-[48%]">
              <div className="flex justify-between items-baseline  max-[850px]:flex-row-reverse max-[850px]:justify-end max-[850px]:gap-2">
                <input
                  className="text-2xl text-orange-500 font-semibold  max-lg:text-lg  w-[70%]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEdit}
                />
                <motion.img
                  src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/85660296-acca-4492-8da3-2d8458a3676a/dg3noa4-6588450b-3485-4f2d-9570-5b7c4e9c563e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg1NjYwMjk2LWFjY2EtNDQ5Mi04ZGEzLTJkODQ1OGEzNjc2YVwvZGczbm9hNC02NTg4NDUwYi0zNDg1LTRmMmQtOTU3MC01YjdjNGU5YzU2M2UucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.PbjHwx2RqKDiercrRuasVdq2Q6RGLRWligRuMpfapwE"
                  animate={{ rotate: rotation }}
                  transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
                  onClick={handleClickImg}
                  className="w-8 cursor-pointer max-[850px]:w-5"
                />
              </div>
            </div>
            <div className="flex flex-row gap-4 max-[850px]:gap-2  max-[450px]:ml-2 max-[450px]:w-[40%]">
              <div className="text-lg text-orange-500 w-[45%] gap-4 max-lg:text-sm flex flex-col items-start justify-between max-[850px]:max-w-[100%]">
                <textarea
                  className="w-[100%] max-[800px]:w-[90%] max-[450px]:text-xs max-[450px]:max-h-[40px]"
                  placeholder="Produced in"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  disabled={!isEdit}
                />
                <textarea
                  className="w-[100%] max-[800px]:w-[90%] max-[450px]:text-xs max-[450px]:max-h-[40px]"
                  placeholder="Rating"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  disabled={!isEdit}
                />
                <textarea
                  className="w-[100%] max-[800px]:w-[90%] max-[450px]:text-xs max-[450px]:max-h-[40px]"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  disabled={!isEdit}
                />
              </div>
              <div className="text-lg text-orange-500  max-lg:text-sm gap-4  w-[45%]  flex flex-col items-start justify-between max-[850px]:max-w-[100%]">
                <textarea
                  className="w-[100%] max-[800px]:w-[90%] max-[450px]:text-xs max-[450px]:max-h-[40px]"
                  placeholder="Protein per 100g"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  disabled={!isEdit}
                />
                <textarea
                  className="w-[100%] max-[800px]:w-[90%] max-[450px]:text-xs max-[450px]:max-h-[40px]"
                  placeholder="Hydrocarbons per 100g"
                  value={hydrocarbons}
                  onChange={(e) => setHydrocarbons(e.target.value)}
                  disabled={!isEdit}
                />
                <textarea
                  className="w-[100%] max-[800px]:w-[90%] max-[450px]:text-xs max-[450px]:max-h-[40px]"
                  placeholder="Fats per 100g"
                  value={fats}
                  onChange={(e) => setFats(e.target.value)}
                  disabled={!isEdit}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-between max-[850px]:max-w-[36%] max-[850px]:absolute max-[850px]:left-10 max-[850px]:mt-10  max-[450px]:justify-start max-[450px]:gap-2">
            <button
              className="w-full max-w-md h-10 text-lg mt-4 max-[450px]:mt-0 px-3 border-2 border-gray-300 rounded  max-[850px]:h-10  max-[450px]:max-w-full max-[450px]:text-xs"
              onClick={() => (isEdit ? handleSave() : setIsEdit(true))}
            >
              {isEdit ? "Save" : "Edit"}
            </button>
            <button
              className="w-full max-w-md h-10 text-lg mt-4 max-[450px]:mt-bg-red-500 text-black rounded  max-lg:text-sm  max-[850px]:h-10 max-[450px]:max-w-full  max-[450px]:text-xs"
              onClick={() => {
                dispatch(deleteProduct(pizza.id));
                onClose();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
