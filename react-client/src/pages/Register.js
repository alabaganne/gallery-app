import React, { useState } from 'react';
import Img from '../images/login.svg';
import { useAuth } from '../hooks/auth';
import emailValidation from '../helpers/email';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    const ers = [];
    if (!emailValidation(email)) {
      ers.push('email must be valid');
    }
    if (username.length < 4) {
      ers.push('username min length is 4');
    }
    if (password.length < 8) {
      ers.push('password min length is 8');
    }
    if (password != repeatPassword) {
      ers.push('passwords must be the same');
    }

    if (ers.length > 0) {
      setErrors(ers);
      return;
    }

    setErrors([]);

    register({ username, email, password });
  };
  return (
    <div className=" flex justify-center items-center h-screen w-full ">
      <div className=" w-[40%] text-center">
        <img className=" m-auto w-[507px] height=[503px]" src={Img} alt="" />
      </div>
      <div className="flex-1 px-10 h-full justify-center items-center flex bg-[#F3F6FB] ">
        <div className="w-full">
          <div className=" flex justify-center items-center my-5 mb-16 gap-5 text-4xl ">
            <svg
              width="36"
              height="32"
              viewBox="0 0 36 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.6 3.55556H9L12.6 0H23.4L27 3.55556H32.4C33.3548 3.55556 34.2705 3.93016 34.9456 4.59695C35.6207 5.26375 36 6.16812 36 7.11111V28.4444C36 29.3874 35.6207 30.2918 34.9456 30.9586C34.2705 31.6254 33.3548 32 32.4 32H3.6C2.64522 32 1.72955 31.6254 1.05442 30.9586C0.379284 30.2918 0 29.3874 0 28.4444V7.11111C0 6.16812 0.379284 5.26375 1.05442 4.59695C1.72955 3.93016 2.64522 3.55556 3.6 3.55556ZM18 8.88889C15.6131 8.88889 13.3239 9.82539 11.636 11.4924C9.94821 13.1594 9 15.4203 9 17.7778C9 20.1353 9.94821 22.3962 11.636 24.0632C13.3239 25.7302 15.6131 26.6667 18 26.6667C20.3869 26.6667 22.6761 25.7302 24.364 24.0632C26.0518 22.3962 27 20.1353 27 17.7778C27 15.4203 26.0518 13.1594 24.364 11.4924C22.6761 9.82539 20.3869 8.88889 18 8.88889ZM18 12.4444C19.4322 12.4444 20.8057 13.0063 21.8184 14.0065C22.8311 15.0067 23.4 16.3633 23.4 17.7778C23.4 19.1923 22.8311 20.5488 21.8184 21.549C20.8057 22.5492 19.4322 23.1111 18 23.1111C16.5678 23.1111 15.1943 22.5492 14.1816 21.549C13.1689 20.5488 12.6 19.1923 12.6 17.7778C12.6 16.3633 13.1689 15.0067 14.1816 14.0065C15.1943 13.0063 16.5678 12.4444 18 12.4444Z"
                fill="#24293F"
              />
            </svg>
            <h1 className=" text-blue">VAULT OF PICS</h1>
          </div>
          <form className=" w-[80%] m-auto">
            <div className=" my-6">
              <label className=" text-xl ml-4 text-blue">User Name </label>
              <input
                className="input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className=" my-6">
              <label className=" text-xl ml-4 text-blue">Email </label>
              <input
                value={email}
                className="input"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </div>
            <div className=" my-6">
              <label className=" text-xl ml-4 text-blue">Password </label>
              <input
                value={password}
                className="input"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className=" my-6">
              <label className=" text-xl ml-4 text-blue">
                Repeat Password{' '}
              </label>
              <input
                value={repeatPassword}
                className="input"
                type="password"
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
              />
            </div>
            <div>
              {errors.map((error) => (
                <p className=" text-red-600">*{error}</p>
              ))}
            </div>
            <div className=" text-center flex-col gap-16 justify-center items-center">
              <button
                onClick={handleSubmit}
                className=" text-white text-lg mt-4 bg-blue p-4 px-12 rounded-md">
                Register
              </button>
              <Link to="/login">
                <p className=" text-blue text-lg mt-4 cursor-pointer hover:underline no-underline">
                  If you have an account{' '}
                  <span className="font-medium">Login</span>
                </p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
