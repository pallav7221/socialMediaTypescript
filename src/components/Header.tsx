import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../User/userSlice";
import ImageUpload from "./ImageUpload";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  return (
    <header className="flex shadow-md sticky top-0 bg-white mb-6 items-center justify-between px-10 py-2 border-b border-gray-300 z-10">
      <img
        className="h-8 w-auto"
        src="https://www.pngkey.com/png/full/409-4090454_socialize-agency-logo.png"
        alt=""
      />
      {user.isLoggedIn && <ImageUpload  />}
      <div
        className="flex justify-center cursor-pointer shadow-md h-12 w-12 rounded-full"
        onClick={() => {
          navigate("/users");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 mt-3 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M50.4 54.5c10.1 0 18.2-8.2 18.2-18.2S60.5 18 50.4 18s-18.2 8.2-18.2 18.2 8.1 18.3 18.2 18.3zm0-31.7c7.4 0 13.4 6 13.4 13.4s-6 13.4-13.4 13.4S37 43.7 37 36.3s6-13.5 13.4-13.5zM18.8 83h63.4c1.3 0 2.4-1.1 2.4-2.4 0-12.6-10.3-22.9-22.9-22.9H39.3c-12.6 0-22.9 10.3-22.9 22.9 0 1.3 1.1 2.4 2.4 2.4zm20.5-20.5h22.4c9.2 0 16.7 6.8 17.9 15.7H21.4c1.2-8.9 8.7-15.7 17.9-15.7z"
          />
        </svg>
      </div>
      <div
        className="flex justify-center cursor-pointer shadow-md h-12 w-12 rounded-full"
        onClick={() => {
          dispatch(setLogout());
          navigate("/");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 mt-3 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </div>
    </header>
  );
};

export default Header;
