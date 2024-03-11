// chapter15で作るのでコメントアウト
// import CoinButton from "../atoms/coinButton"

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
        <HoloButton setGroup="Hololive"/>
      </div>
    )
    
  }

  
  export default Drawer