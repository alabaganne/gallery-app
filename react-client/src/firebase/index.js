import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyCU12aX4cMSVDBe6x7p6PHiX_h2cSyRHkI",
//   authDomain: "fir-react-image-uploads.firebaseapp.com",
//   databaseURL: "gs://fir-react-image-uploads.appspot.com",
//   projectId: "fir-react-image-uploads",
//   storageBucket: "fir-react-image-uploads.appspot.com",
//   messagingSenderId: "514360265964",
//   appId: "1:514360265964:web:8e6201279b65d6362ce9c9",
//   measurementId: "G-BWJQPEKDQ5",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDu75Kv7ugSiHHrfgjLdYwROHIJ61CoRq4",
  authDomain: "middleware-6346d.firebaseapp.com",
  projectId: "middleware-6346d",
  storageBucket: "middleware-6346d.appspot.com",
  messagingSenderId: "820892033209",
  appId: "1:820892033209:web:576c2789793b86e9203b68",
  measurementId: "G-QET9RP808W",
};

initializeApp(firebaseConfig);
const storage = getStorage();
export { storage };
