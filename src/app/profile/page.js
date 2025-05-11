"use client";

import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from "../store/slices/authSlice";
import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PizzasList from "../components/pizzas/PizzasList";
import Modal from "../components/Modal/Modal";

const StyledLink = styled(Link)`
  display: inline-block;
  line-height: 42px;
  margin: 0;
  text-align: center;
  background-color: #ffffff;
  color: #171717;
  border: 3px solid #171717;
  border-radius: 4px;
  cursor: pointer;
  transition: backgroundColor 0.3s;
  width: 120px;
  font-size: 15px;
  font-weight: 300;
`;

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, userAuth } = useSelector((state) => state.auth);
  const favorites = userAuth?.favorites || [];

  const [isEditing, setIsEditing] = useState(false);
  const [login, setLogin] = useState(userAuth?.login);
  const [email, setEmail] = useState(userAuth?.email);
  const [password, setPassword] = useState(userAuth?.password);

  const isPassShown = password ? password.replace(/./g, "*") : "";

  const handleSave = () => {
    console.log("Saved values:", { login, email, password });
    setIsEditing(false);
    const updatedUser = {
      ...userAuth,
      login,
      email,
      password,
    };
    dispatch(updateUser(updatedUser));
  };

  const [selectedPizza, setSelectedPizza] = useState();
  return (
    <div className="profile-container w-[70%] mx-auto">
      {userAuth ? (
        <h1 className="text-4xl font-semibold mb-4 text-center text-white">
          Have a good day, {login}!
        </h1>
      ) : (
        <h1 className="text-4xl font-semibold mb-4 text-center">
          Have a good account registration, Guest!
        </h1>
      )}
      {isAuthenticated ? (
        <div className="flex flex-col items-center">
          <div className="profile-info text-center">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="border border-gray-400 rounded p-2 mb-2 w-full"
                  placeholder="Login"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-400 rounded p-2 mb-2 w-full"
                  placeholder="Email"
                />
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-400 rounded p-2 mb-4 w-full"
                  placeholder="Password"
                />
              </>
            ) : (
              <>
                <h3 className="text-2xl mb-2">Login: {login}</h3>
                <h3 className="text-2xl mb-2">Email: {email}</h3>
                <h3 className="text-2xl mb-4">Password: {isPassShown}</h3>
              </>
            )}

            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition mr-2"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition mr-2"
              >
                Redact
              </button>
            )}

            <button
              onClick={() => {
                dispatch(logout());
              }}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition mt-2"
            >
              Exit
            </button>
          </div>
          <h1 className="text-4xl font-semibold mb-4 text-center text-white mt-14">
            Favorites
          </h1>
          <PizzasList
            onSelectPizza={setSelectedPizza}
            url_api={null}
            pizzasList={favorites}
          />
          {selectedPizza && (
            <Modal
              pizza={selectedPizza}
              onClose={() => setSelectedPizza(null)}
            />
          )}
        </div>
      ) : (
        <div className="text-center">
          <StyledLink
            href="/login"
            className="text-blue-500 hover:text-blue-600"
          >
            Maybe sign in?
          </StyledLink>
        </div>
      )}
    </div>
  );
};

export default Profile;
