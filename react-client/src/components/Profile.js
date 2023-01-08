import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/auth';
import User from '../images/User.svg';
import jwt from 'jwt-decode';
import api from '../components/api';
import ProfileImg from '../images/profile_img.svg';

const Profile = () => {
  const [user, setUser] = useState(null);
  const { cookies } = useAuth();
  const token = jwt(cookies.token);
  const userId = token.userId;

  const getUser = async () => {
    const res = await api.get(`/users/${userId}`);
    setUser(res.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex gap-16 items-center ml-20">
      <div className=" rounded-[50%] overflow-hidden">
        <img
          src={ProfileImg}
          alt="user"
          className=" cursor-pointer w-40 h-40"
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className=" text-2xl mb-1">
          {(user && user.username) || 'Chebbi Mohamed Aziz'}
        </p>
        <p className=" text-base">
          {(user && user.email) || 'chebbim106@gmail.com'}
        </p>
      </div>
    </div>
  );
};

export default Profile;
