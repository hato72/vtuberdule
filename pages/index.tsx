import { useState,useEffect} from "react"
import Header from "../components/layouts/header"
import GroupIcon from "@/components/atoms/groupIcon"
import LiveCard from "@/components/atoms/liveCard"
import { Api } from "@/components/atoms/groupIcon"
import Drawer from "../components/layouts/drawer"
import ScheduleCard from "@/components/atoms/scheduleCard"


export default function Home() {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false)
  const [isFixedVideo, setIsFixedVideo] = useState<boolean>(false)
  const [inputText, setInputText] = useState<string>("")
  const [displayText, setdisplayText] = useState<string>("holo-app.vercel.app")
  const toggleFixedVideo = () => setIsFixedVideo(!isFixedVideo)
  const toggleDrawer = () => setIsOpenDrawer(!isOpenDrawer)

  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  // const submitFormWithLocalStorage = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   localStorage.setItem("displayText", inputText)
  //   setdisplayText(inputText)
  //   setInputText("")
  // }

  useEffect(() => {
    const localDisplayText = localStorage.getItem("displayText")
    setdisplayText(localDisplayText || "holo-app.vercel.app")
  }, [])

  return (
    <div className="flex flex-col items-center justify-between min-h-screen overflow-x-hidden bg-gray-100">
      <Header
        isOpenDrawer={isOpenDrawer}
        isFixedVideo={isFixedVideo}
        toggleDrawer={toggleDrawer}
        toggleFixedVideo={toggleFixedVideo}
        //groupData={groupData}
      />
      <div className="w-full md:hidden">
        <GroupIcon/>
      </div>
      <div className="flex flex-wrap justify-center mx-2 mt-8 md:my-8 gap-2">
        <Drawer toggleDrawer={toggleDrawer} isOpenDrawer={isOpenDrawer} />
        <LiveCard isFixedVideo={isFixedVideo} />
        <ScheduleCard />
      </div>
      
    </div>
  )
}