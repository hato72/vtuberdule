// import React from "react";
// import { useState } from "react";

// interface HoloButtonProps {
//   setGroup: string
// }

// const HoloButton: React.FC<HoloButtonProps> = ({setGroup}) => {
//   const handleClick = () => {
//     setGroup = "Hololive"
//   };

//   return (
//     <div className="p-2 text-white">
//       <button onClick={handleClick}>Hololiveを選択</button>
//     </div>
//   );
// };

// export default HoloButton;

// Hololive.tsx
import { useContext } from "react"
import { GroupContext } from "./groupContext" // 新しいコンテキストを作成

interface Props {
  setGroup: string
}

const HoloButton = ({ setGroup }: Props) => {
  const { selectedGroup, setSelectedGroup } = useContext(GroupContext)

  const handleClick = () => {
    setSelectedGroup(setGroup)
  }

  return (
    <button
      className={`block p-3 text-gray-900 ${
        selectedGroup === setGroup ? "bg-gray-200" : ""
      }`}
      onClick={handleClick}
    >
      {setGroup}
    </button>
  )
}

export default HoloButton
