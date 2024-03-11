import React from "react";
import { useState } from "react";

interface HoloButtonProps {
  setGroup: string
}

const HoloButton: React.FC<HoloButtonProps> = ({setGroup}) => {
  const handleClick = () => {
    setGroup = "Hololive"
  };

  return (
    <div className="p-2 text-white">
      <button onClick={handleClick}>Hololiveを選択</button>
    </div>
  );
};

export default HoloButton;
