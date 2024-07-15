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
    // <button
    //   className={`block p-3 text-gray-900 ${
    //     selectedGroup === setGroup ? "bg-gray-200" : ""
    //   }`}
    //   onClick={handleClick}
    // >
    //   {setGroup}
    // </button>
    <nav onClick={handleClick} className={`px-2 py-4 bg-[#F3F4F6] cursor-pointer ${
      selectedGroup === setGroup ? "bg-gray-200" : ""
    }`}>
      <div className="block p-3 text-gray-900">
        {setGroup}
      </div>
    </nav>
  )
}

export default HoloButton
