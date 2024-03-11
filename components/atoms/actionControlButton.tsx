import { useState } from "react"
import { Api } from "./groupIcon"

interface Props {
    isOpenDrawer: boolean
    isFixedVideo: boolean
    toggleDrawer: () => void
    toggleFixedVideo: () => void
    //groupData: Api[]
  }
  
  const ActionControlsButton = ({
    isOpenDrawer,
    isFixedVideo,
    toggleDrawer,
    toggleFixedVideo,
    //groupData
  }: Props) => {

    // const [isMenuOpen,setMenuOpen] = useState(false)
    // const [selectedGroup,setSelectedGroup] = useState<string | null>(null)

    // const Menu = () =>{
    //     setMenuOpen(!isMenuOpen)
    // }

    // const handleMenu = (group:string) => {
    //     setMenuOpen(!isMenuOpen)
    //     setSelectedGroup(group)
    // }

    // const renderGroupButton= (group:string)=>{
    //     return (
    //         <button
    //             key={group}
    //             onClick={() => handleMenu(group)}
    //             className={`w-[130px] h-[40px] ml-3 ${selectedGroup === group ? "bg-[#8890eb]" : ""}`}
    //         >
    //             {group}Group
    //         </button>
    //     )
    // }

    return (
      <div className="flex">
        <button
          onClick={toggleDrawer}
          className="w-[130px] h-[40px] bg-white border-[1px] border-[#98a0fb] text-[#98a0fb] hover:text-[#98a0fbee] hover:bg-[#98a0fb2e]"
        >
          Drawer{" "}
          <span className="border shadow-[0.5px_0.5px_1px_0px_#98a0fb99] p-[4px] rounded-[4px]">
            {isOpenDrawer ? "Close" : "Open"}
          </span>
        </button>
        <button onClick={toggleFixedVideo} className="hover:bg-[#8890eb] w-[130px] h-[40px] ml-3">
          PVButton{" "}
          <span className="border shadow-[0.5px_0.5px_1px_0px_#333] p-[4px] rounded-[4px]">
            {isFixedVideo ? "On" : "Off"}
          </span>
        </button>

        {/* {renderGroupButton("Hololive")}
        {renderGroupButton("Nijisanji")}
        {renderGroupButton("Aogiri Highschool")}
        {renderGroupButton("VSpo")} */}
        
        {/* {isMenuOpen && selectedGroup && (
            <div className="absolute top-[48px] right-0 p-3 bg-white border border-gray-300 rounded shadow">
                {groupData.filter((data) => data.channel.org === selectedGroup)
                .map((holoDatas: Api) => (
                    <div key={holoDatas.id} className="flex items-center gap-x-3.5 py-2">
                    <img
                        className="inline-block md:h-[2.875rem] h-[3.475rem] md:w-[2.875rem] w-[3.475rem] rounded-full ring-1 ring-red-600"
                        src={holoDatas.channel.photo}
                        alt="Image Description"
                    />
                    <span>{holoDatas.channel.english_name}</span>
                    </div>
                ))}
          </div>
        )} */}
        {/* <button onClick={Menu}
            className="ml-3 p-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-full focus:outline-none"
        >
            Menu
        </button>
        {isMenuOpen && (
            <div className="absolute top-8 right-0 p-3 bg-white border border-gray-300 rounded shadow">
                
                <p>Hololive</p>
                <p>Nijisanji</p>
                <p>Aogiri Highschool</p>
                <p>VSpo</p>
            </div>
        )} */}
      </div>
    )
  }
  
  export default ActionControlsButton