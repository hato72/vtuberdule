import HoloButton from "../atoms/Hololive"



interface Props {
    isOpenDrawer: boolean
    toggleDrawer: () => void
  }
  
  const Drawer = ({ isOpenDrawer, toggleDrawer }: Props) => {
    return (
      <div className={`drawer ${isOpenDrawer ? "active" : ""}`}>
        <nav onClick={toggleDrawer} className="px-2 py-4 bg-[#F3F4F6] cursor-pointer">
          <div className="block p-3 text-gray-900">Home</div>
        </nav>
        <HoloButton setGroup="All Group"/>
        <HoloButton setGroup="Hololive"/>
        <HoloButton setGroup="Nijisanji" />
        <HoloButton setGroup="Aogiri Highschool" />
        <HoloButton setGroup="VSpo" />
        <HoloButton setGroup="774inc" />
        <HoloButton setGroup="Neo-Porte" />
      </div>
    )
    
  }

  
  export default Drawer