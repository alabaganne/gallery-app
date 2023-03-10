import React, { useEffect, useState } from "react";
import Upload from "../images/upload.svg";
import Logout from "../images/logout.svg";
import Profile from "../components/Profile";
import Image from "../components/Image";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import api from "../components/api";
import { useAuth } from "../hooks/auth";
import { useCookies } from "react-cookie";
import BeatLoader from "react-spinners/BeatLoader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "#F3F6FB",
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const [description, setDescription] = useState("");
  const [percent, setPercent] = useState(0);
  const [images, setImages] = React.useState([]);
  const [filename, setFilename] = React.useState("Upload");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userImages, setUserImages] = useState([]);

  const { cookies } = useAuth();
  const [, setCookies, removeCookie] = useCookies();
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    const res = await api.get("/images/", {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    setUserImages(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleChange = (e) => {
    const name = e.target.files[0].name;
    setFilename(name);
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleUpload = async (e) => {
    setLoading(true);
    e.preventDefault();
    images.map((image) => {
      // const uploadTask = ref(`images/${image.name}`).put(image);
      const storageRef = ref(storage, `/images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          ); // update progress
          console.log(percent);
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            // console.log(url);
            api
              .post(
                "/images",
                {
                  imageUrl: url,
                  description,
                },
                {
                  headers: { Authorization: `Bearer ${cookies.token}` },
                }
              )
              .then(() => {
                console.log("successfully");
                setLoading(false);
                window.location.reload(false);
                handleClose();
                setUserImages((prevState) => [url, ...prevState]);
              })
              .catch((e) => console.log(e));
            setImages([]);
            setFilename("Upload");
          });
        }
      );
    });
  };

  const logout = () => {
    removeCookie("token");
  };
  return (
    <div className="min-h-screen w-screen">
      <div className=" fixed w-[20%] h-screen bg-[#F3F6FB]">
        <div className=" flex gap-4 justify-center items-center my-20 mb-44">
          <svg
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.2 2.22222H5.5L7.7 0H14.3L16.5 2.22222H19.8C20.3835 2.22222 20.9431 2.45635 21.3556 2.8731C21.7682 3.28984 22 3.85507 22 4.44444V17.7778C22 18.3671 21.7682 18.9324 21.3556 19.3491C20.9431 19.7659 20.3835 20 19.8 20H2.2C1.61652 20 1.05694 19.7659 0.644365 19.3491C0.231785 18.9324 0 18.3671 0 17.7778V4.44444C0 3.85507 0.231785 3.28984 0.644365 2.8731C1.05694 2.45635 1.61652 2.22222 2.2 2.22222ZM11 5.55556C9.54131 5.55556 8.14236 6.14087 7.11091 7.18274C6.07946 8.22461 5.5 9.63769 5.5 11.1111C5.5 12.5845 6.07946 13.9976 7.11091 15.0395C8.14236 16.0814 9.54131 16.6667 11 16.6667C12.4587 16.6667 13.8576 16.0814 14.8891 15.0395C15.9205 13.9976 16.5 12.5845 16.5 11.1111C16.5 9.63769 15.9205 8.22461 14.8891 7.18274C13.8576 6.14087 12.4587 5.55556 11 5.55556ZM11 7.77778C11.8752 7.77778 12.7146 8.12897 13.3335 8.75409C13.9523 9.37921 14.3 10.2271 14.3 11.1111C14.3 11.9952 13.9523 12.843 13.3335 13.4681C12.7146 14.0933 11.8752 14.4444 11 14.4444C10.1248 14.4444 9.28542 14.0933 8.66655 13.4681C8.04768 12.843 7.7 11.9952 7.7 11.1111C7.7 10.2271 8.04768 9.37921 8.66655 8.75409C9.28542 8.12897 10.1248 7.77778 11 7.77778Z"
              fill="#24293F"
            />
          </svg>
          <h1 className=" text-blue text-2xl font-mont font-medium">
            VAULT OF PICS
          </h1>
        </div>
        <div className="flex flex-col gap-12">
          <div
            className=" flex justify-center items-center gap-16 mb-8 cursor-pointer"
            onClick={handleOpen}
          >
            <img src={Upload} className="w-[26px] h-[26px] object-contain" />
            <p className=" text-xl font-poppins font-medium ">Upload</p>
          </div>
          <div
            onClick={logout}
            className=" flex justify-center items-center gap-16 mb-5 cursor-pointer"
          >
            <img src={Logout} className=" w-[26px] h-[26px] object-contain" />
            <p className=" text-xl font-poppins font-medium">Logout</p>
          </div>
        </div>
      </div>
      <div className=" ml-[20%] h-full  w-[80%] mr-0 p-10 ">
        <Profile />
        <hr className=" w-[90%] m-auto my-10" />
        <div className="flex flex-wrap items-center gap-10  justify-start">
          {/* {Array.from(Array(10).keys()).map((i) => (
            <Image key={i} />
          ))} */}
          {userImages.map((image) => (
            <Image
              img={image.imageUrl}
              id={image._id}
              desc={image.description}
            />
          ))}
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <input
              type={"file"}
              id="file"
              className="inputfile"
              onChange={handleChange}
            />
            <label
              for="file"
              className=" bg-blue px-8 rounded-md cursor-pointer py-3 text-white mb-4 flex items-center gap-4 max-w-max"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196 15.021 0 14.55 0 14V11H2V14H14V11H16V14C16 14.55 15.8043 15.021 15.413 15.413C15.021 15.8043 14.55 16 14 16H2ZM7 12V3.85L4.4 6.45L3 5L8 0L13 5L11.6 6.45L9 3.85V12H7Z"
                  fill="white"
                />
              </svg>
              <span>{filename}</span>
            </label>
            <div className="mt-6">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input"
              />
            </div>
            {loading ? (
              <div className=" mt-6">
                <BeatLoader color={"#24293F"} loading={loading} />
              </div>
            ) : (
              <button
                disabled={images.length == 0}
                onClick={handleUpload}
                className={` text-white text-lg mt-4 ${
                  images.length == 0 ? " bg-gray-300" : " bg-blue"
                }  py-2 px-8 rounded-md`}
              >
                Submit
              </button>
            )}
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
