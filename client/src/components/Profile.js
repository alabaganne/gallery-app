import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/auth';
import User from '../images/User.svg';
import jwt from 'jwt-decode';
import api from '../components/api';

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
          src={
            'https://media.licdn.com/dms/image/C4E03AQGps13LeSz5KA/profile-displayphoto-shrink_400_400/0/1624627969898?e=1678320000&v=beta&t=kG9JlFxKswUt4ddX-1135n2tU_1TRw7_g7H04Dwn2CY'
          }
          alt="user"
          className=" w-40 h-40"
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
