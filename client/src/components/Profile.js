import React from "react";
import User from "../images/User.svg";

const Profile = ({ img, username, email }) => {
  return (
    <div className="flex gap-4 items-center ml-20">
      <div className=" rounded-[50%]">
        <img src={User} alt="user" className=" w-40 h-40" />
      </div>
      <div>
        <p className=" text-2xl mb-1">Chebbi Mohamed Aziz</p>
        <p className=" text-base">chebbim106@gmail.com</p>
      </div>
    </div>
  );
};

export default Profile;
