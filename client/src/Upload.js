import React, { useState } from "react";
import { storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ReactFirebaseFileUpload = () => {
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [percent, setPercent] = useState(0);

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleUpload = () => {
    const promises = [];
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
            console.log(url);
          });
        }
      );
    });

    // Promise.all(promises)
    //   .then(() => alert("All images uploaded"))
    //   .catch((err) => console.log(err));
  };

  console.log("images: ", images);
  console.log("urls", urls);

  return (
    <div>
      <progress value={progress} max="100" />
      <br />
      <br />
      <input type="file" multiple onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {urls.map((url, i) => (
        <div key={i}>
          <a href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
        </div>
      ))}
      <br />
      {urls.map((url, i) => (
        <img
          key={i}
          style={{ width: "500px" }}
          src={url || "http://via.placeholder.com/300"}
          alt="firebase-image"
        />
      ))}
    </div>
  );
};
