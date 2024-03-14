import dayjs from "dayjs"
import { useEffect, useState,useContext } from "react"
import { isCorrectLiveHoloUrl } from "../../utils/util"
import { Api } from "./groupIcon"
import { GroupContext } from "./groupContext"

//import HOLODEX_API_KEY from "@/env"

const ScheduleCard = () => {
  const youtube_jpeg = "https://img.youtube.com/vi/"
  const youtube_jpeg_size = {
    large: "/maxresdefault.jpg",
    midium: "/sddefault.jpg",
  }
  const holoVideo = "https://www.youtube.com/watch?v="
  const holoUrl = "https://holodex.net/api/v2/live/"
  const [holoData, setHoloData] = useState<Api[]>([])

  //const dotenv = require('dotenv').config();

  useEffect(() => {
    ;(async () => {
      const res = await fetch(holoUrl, {
        headers: {
          //"X-APIKEY": process.env.HOLODEX_API_KEY || "",
          "X-APIKEY": process.env.HOLODEX_API_KEY || "c910c475-f3b8-4980-b69a-4045e6aa10ff"
          //"X-APIKEY": HOLODEX_API_KEY
        },
      })
      const users = await res.json()
      setHoloData(users)
    })()
  }, [])

  const getFilteredData = (org: string) => {
    return holoData.filter((data) => data.channel.org === org);
  };
  const {selectedGroup} = useContext(GroupContext)

  return (
    <div className="max-md:absolute flex justify-end mr-3 max-md:items-end max-md:flex-col right-[2px] top-[60px] z-[2]">
      
      {selectedGroup===null && holoData.map((holoDatas: Api) => {
        return isCorrectLiveHoloUrl(holoDatas) ? (
          <>
            <div className="relative w-[250px] max-xl:w-[24%] max-mm:w-[32.5%] max-md:w-[48.5%] max-sm:w-[48%.5] max-xs:w-[48.5%] h-full flex flex-col border shadow-sm rounded-xl bg-[#223e] border-gray-700 shadow-slate-700/[.7]">
              <div className="absolute text-xs font-bold text-center text-gray-200 bottom-1 right-2 opacity-90 max-sm:text-[10px]">
                <span className="mr-[1px]">◎</span>配信予定
              </div>
              <a href={`${holoVideo}${holoDatas.id}`} target="_blank">
                <div className="">
                    <img className="w-full h-auto rouded-t-xl" src={youtube_jpeg + holoDatas.id + youtube_jpeg_size.large} alt="Image Description"/>
                    <div className="p-3 md:p-4">
                        <div className="text-gray-400 max-sm:text-[14px]">
                            {dayjs(holoDatas.start_scheduled).format("MM-DD HH:mm")}
                        </div>
                        <h3 className="flex font-bold text-md text-white max-sm:text-[12px]">
                            {holoDatas.title}
                        </h3>
                  </div>
                </div>
              </a>
            </div>
          </>
        ) : null
      })}

      {selectedGroup==="All Group" && holoData.map((holoDatas: Api) => {
        return isCorrectLiveHoloUrl(holoDatas) ? (
          <>
            <div className="relative w-[250px] max-xl:w-[24%] max-mm:w-[32.5%] max-md:w-[48.5%] max-sm:w-[48%.5] max-xs:w-[48.5%] h-full flex flex-col border shadow-sm rounded-xl bg-[#223e] border-gray-700 shadow-slate-700/[.7]">
              <div className="absolute text-xs font-bold text-center text-gray-200 bottom-1 right-2 opacity-90 max-sm:text-[10px]">
                <span className="mr-[1px]">◎</span>配信予定
              </div>
              <a href={`${holoVideo}${holoDatas.id}`} target="_blank">
                <div className="">
                    <img className="w-full h-auto rouded-t-xl" src={youtube_jpeg + holoDatas.id + youtube_jpeg_size.large} alt="Image Description"/>
                    <div className="p-3 md:p-4">
                        <div className="text-gray-400 max-sm:text-[14px]">
                            {dayjs(holoDatas.start_scheduled).format("MM-DD HH:mm")}
                        </div>
                        <h3 className="flex font-bold text-md text-white max-sm:text-[12px]">
                            {holoDatas.title}
                        </h3>
                  </div>
                </div>
              </a>
            </div>
          </>
        ) : null
      })}

      {selectedGroup==="Hololive" && getFilteredData("Hololive").map((holoDatas: Api) => {
        return isCorrectLiveHoloUrl(holoDatas) ? (
          <>
            <div className="relative w-[250px] max-xl:w-[24%] max-mm:w-[32.5%] max-md:w-[48.5%] max-sm:w-[48%.5] max-xs:w-[48.5%] h-full flex flex-col border shadow-sm rounded-xl bg-[#223e] border-gray-700 shadow-slate-700/[.7]">
              <div className="absolute text-xs font-bold text-center text-gray-200 bottom-1 right-2 opacity-90 max-sm:text-[10px]">
                <span className="mr-[1px]">◎</span>配信予定
              </div>
              <a href={`${holoVideo}${holoDatas.id}`} target="_blank">
                <div className="">
                    <img className="w-full h-auto rouded-t-xl" src={youtube_jpeg + holoDatas.id + youtube_jpeg_size.large} alt="Image Description"/>
                    <div className="p-3 md:p-4">
                        <div className="text-gray-400 max-sm:text-[14px]">
                            {dayjs(holoDatas.start_scheduled).format("MM-DD HH:mm")}
                        </div>
                        <h3 className="flex font-bold text-md text-white max-sm:text-[12px]">
                            {holoDatas.title}
                        </h3>
                  </div>
                </div>
              </a>
            </div>
          </>
        ) : null
      })}

      {selectedGroup==="Njisanji" && getFilteredData("Njisanji").map((holoDatas: Api) => {
        return isCorrectLiveHoloUrl(holoDatas) ? (
          <>
            <div className="relative w-[250px] max-xl:w-[24%] max-mm:w-[32.5%] max-md:w-[48.5%] max-sm:w-[48%.5] max-xs:w-[48.5%] h-full flex flex-col border shadow-sm rounded-xl bg-[#223e] border-gray-700 shadow-slate-700/[.7]">
              <div className="absolute text-xs font-bold text-center text-gray-200 bottom-1 right-2 opacity-90 max-sm:text-[10px]">
                <span className="mr-[1px]">◎</span>配信予定
              </div>
              <a href={`${holoVideo}${holoDatas.id}`} target="_blank">
                <div className="">
                    <img className="w-full h-auto rouded-t-xl" src={youtube_jpeg + holoDatas.id + youtube_jpeg_size.large} alt="Image Description"/>
                    <div className="p-3 md:p-4">
                        <div className="text-gray-400 max-sm:text-[14px]">
                            {dayjs(holoDatas.start_scheduled).format("MM-DD HH:mm")}
                        </div>
                        <h3 className="flex font-bold text-md text-white max-sm:text-[12px]">
                            {holoDatas.title}
                        </h3>
                  </div>
                </div>
              </a>
            </div>
          </>
        ) : null
      })}

      {selectedGroup==="Aogiri Highschool" && getFilteredData("Aogiri Highschool").map((holoDatas: Api) => {
        return isCorrectLiveHoloUrl(holoDatas) ? (
          <>
            <div className="relative w-[250px] max-xl:w-[24%] max-mm:w-[32.5%] max-md:w-[48.5%] max-sm:w-[48%.5] max-xs:w-[48.5%] h-full flex flex-col border shadow-sm rounded-xl bg-[#223e] border-gray-700 shadow-slate-700/[.7]">
              <div className="absolute text-xs font-bold text-center text-gray-200 bottom-1 right-2 opacity-90 max-sm:text-[10px]">
                <span className="mr-[1px]">◎</span>配信予定
              </div>
              <a href={`${holoVideo}${holoDatas.id}`} target="_blank">
                <div className="">
                    <img className="w-full h-auto rouded-t-xl" src={youtube_jpeg + holoDatas.id + youtube_jpeg_size.large} alt="Image Description"/>
                    <div className="p-3 md:p-4">
                        <div className="text-gray-400 max-sm:text-[14px]">
                            {dayjs(holoDatas.start_scheduled).format("MM-DD HH:mm")}
                        </div>
                        <h3 className="flex font-bold text-md text-white max-sm:text-[12px]">
                            {holoDatas.title}
                        </h3>
                  </div>
                </div>
              </a>
            </div>
          </>
        ) : null
      })}

      {selectedGroup==="VSpo" && getFilteredData("VSpo").map((holoDatas: Api) => {
        return isCorrectLiveHoloUrl(holoDatas) ? (
          <>
            <div className="relative w-[250px] max-xl:w-[24%] max-mm:w-[32.5%] max-md:w-[48.5%] max-sm:w-[48%.5] max-xs:w-[48.5%] h-full flex flex-col border shadow-sm rounded-xl bg-[#223e] border-gray-700 shadow-slate-700/[.7]">
              <div className="absolute text-xs font-bold text-center text-gray-200 bottom-1 right-2 opacity-90 max-sm:text-[10px]">
                <span className="mr-[1px]">◎</span>配信予定
              </div>
              <a href={`${holoVideo}${holoDatas.id}`} target="_blank">
                <div className="">
                    <img className="w-full h-auto rouded-t-xl" src={youtube_jpeg + holoDatas.id + youtube_jpeg_size.large} alt="Image Description"/>
                    <div className="p-3 md:p-4">
                        <div className="text-gray-400 max-sm:text-[14px]">
                            {dayjs(holoDatas.start_scheduled).format("MM-DD HH:mm")}
                        </div>
                        <h3 className="flex font-bold text-md text-white max-sm:text-[12px]">
                            {holoDatas.title}
                        </h3>
                  </div>
                </div>
              </a>
            </div>
          </>
        ) : null
      })}
    </div>
  )
}

export default ScheduleCard