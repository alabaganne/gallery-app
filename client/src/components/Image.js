import React from "react";
import Nature from "../images/nature.png";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const Image = ({
  img,
  id,
  desc = "Lorem ipsum dolor sit amet consectetur. Id risus molestie lacus sed ut nulla purus.",
}) => {
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
        <button>
          <DeleteOutlinedIcon
            sx={{ color: "white" }}
            className="  absolute bottom-4 right-4"
          />
        </button>
      </div>
    </div>
  );
};

export default Image;
