import { useState,useEffect} from "react"
import Header from "../components/layouts/header"
import { Api } from "@/components/atoms/groupIcon"


export default function Home() {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false)
  const [isFixedVideo, setIsFixedVideo] = useState<boolean>(false)
  const toggleFixedVideo = () => setIsFixedVideo(!isFixedVideo)
  const toggleDrawer = () => setIsOpenDrawer(!isOpenDrawer)


  return (
    <div className="flex flex-col items-center justify-between min-h-screen overflow-x-hidden bg-gray-100">
      <Header
        isOpenDrawer={isOpenDrawer}
        isFixedVideo={isFixedVideo}
        toggleDrawer={toggleDrawer}
        toggleFixedVideo={toggleFixedVideo}
        //groupData={groupData}
      />
    </div>
  )
}