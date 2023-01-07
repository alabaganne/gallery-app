import React, { useState } from "react";
import Nature from "../images/nature.png";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import api from "../components/api";
import { useCookies } from "react-cookie";
import { useAuth } from "../hooks/auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "#F3F6FB",
  boxShadow: 24,
  p: 4,
};

const Image = ({
  img,
  id,
  desc = "Lorem ipsum dolor sit amet consectetur. Id risus molestie lacus sed ut nulla purus.",
}) => {
  const [deleted, setDeleted] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const cancel = () => {
    handleClose();
  };
  const { cookies } = useAuth();
  const deleteImage = async () => {
    try {
      await api.delete("/api/images/" + id, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
      setDeleted(true);
    } catch (e) {
      alert(e);
    } finally {
      handleClose();
    }
  };
  return (
    <div className="w-[300px] h-[300px] relative image-container">
      <img
        src={Nature}
        className=" w-[300px] h-[300px] object-cover"
        alt="img"
      />
      <div className="hidden justify-center items-center absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] image-description">
        <p className=" text-white leading-6 w-[80%] m-auto text-center">
          {desc}
        </p>
        <button onClick={handleOpen}>
          <DeleteOutlinedIcon
            sx={{ color: "white" }}
            className="  absolute bottom-4 right-4"
          />
        </button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p className=" text-blue text-lg text-center">
            Are you sure you want to delete this image
          </p>
          <div className=" flex justify-center items-center gap-4 mt-4">
            <button
              onClick={cancel}
              className=" border-red-500 border-2 text-red-500 rounded-md px-8 py-2"
            >
              Cancel
            </button>
            <button
              onClick={deleteImage}
              className=" border-red-500 border-2 text-white bg-red-500 rounded-md px-8 py-2"
            >
              Delete
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Image;
