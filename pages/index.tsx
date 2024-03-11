import { useState,useEffect} from "react"
import Header from "../components/layouts/header"
import { Api } from "@/components/atoms/groupIcon"


export default function Home() {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false)
  const [isFixedVideo, setIsFixedVideo] = useState<boolean>(false)
  const toggleFixedVideo = () => setIsFixedVideo(!isFixedVideo)
  const toggleDrawer = () => setIsOpenDrawer(!isOpenDrawer)

  // const [groupData,setGroupData] = useState<Api[]>([])


  // useEffect(() => {
  //   // APIからデータを取得し、setGroupDataでstateにセットするロジックを記述
  //   // 例: fetchやaxiosを使用してデータを取得
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch("https://holodex.net/api/v2/live/", {
  //         headers: {
  //           "X-APIKEY": "c910c475-f3b8-4980-b69a-4045e6aa10ff",
  //         },
  //       })
  //       const data = await res.json();
  //       setGroupData(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [])

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