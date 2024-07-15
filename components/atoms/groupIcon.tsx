import { useContext, useEffect, useState } from "react"
import { isCorrectLiveHoloUrl,isCorrectScheduleHoloUrl } from "../../utils/util"
import HoloButton from "./Hololive"
import { GroupContext } from "./groupContext"
import { Api } from "./liveCard"
//import HOLODEX_API_KEY from "@/env"

const GroupIcon = () => {
  const holoVideo = "https://www.youtube.com/watch?v="
  const holoUrl = "https://holodex.net/api/v2/live/"
  const [holoData, setHoloData] = useState<Api[]>([])

  //const dotenv = require('dotenv').config();
  //const HOLODEX_API_KEY = process.env.HOLODEX_API_KEY

  useEffect(() => {
    ;(async () => {
      const res = await fetch(holoUrl, {
        headers: {
          "X-APIKEY": process.env.NEXT_PUBLIC_HOLODEX_API_KEY || ""
          
        },
      })
      const users = await res.json()
      setHoloData(users)
    })()
  }, [])

  const getFilteredData = (org: string) => {
    return holoData.filter((data) => data.channel.org === org);
  };
  // const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const {selectedGroup} = useContext(GroupContext)


  // const Groupfilter = () => {
  //   if(selectedGroup === null || selectedGroup === "All Group"){
  //     return holoData
  //   }
  //   return getFilteredData(selectedGroup)
  // }
  const Groupfilter = () => {
    let fiterData = holoData
    if (selectedGroup !== null && selectedGroup !== "All Group"){
      fiterData = getFilteredData(selectedGroup)
    }
    return fiterData
  }


  // const getLiveIcons = () => {
  //   return Groupfilter().filter(Data => isCorrectLiveHoloUrl(Data))
  // }
  // const getScheduleIcons = () => {
  //   return Groupfilter().filter(Data => isCorrectScheduleHoloUrl(Data))
  // }
  // const LiveIcons = getLiveIcons()
  // const ScheduleIcons = getScheduleIcons()


  return (
    <div className="max-md:absolute flex justify-end mr-3 max-md:items-end max-md:flex-col right-[2px] top-[60px] z-[2]">
      
      {Groupfilter().map((holoDatas: Api) => {
        const isLive = isCorrectLiveHoloUrl(holoDatas)
        const isSchedule = isCorrectScheduleHoloUrl(holoDatas)

        return (
          <a
            key={holoDatas.id}
            className="flex items-center gap-x-3.5 max-md:mt-[-32px] py-2 mx-[-7px] rounded-md text-sm text-gray-800 dark:text-gray-400"
            target="_blank"
            href={`${holoVideo}${holoDatas.id}`}
          >
            <div className={`inline-block md:h-[2.875rem] h-[3.475rem] md:w-[2.875rem] w-[3.475rem] rounded-full ring-1 ${isSchedule ? 'ring-blue-600' : isLive ? 'ring-red-600' : ''}`}>
              <img
                className="inline-block w-full h-full rounded-full"
                src={holoDatas.channel.photo}
                alt="Image Description"
              />
            </div>
            {/* <img
              className="inline-block md:h-[2.875rem] h-[3.475rem] md:w-[2.875rem] w-[3.475rem] rounded-full ring-1 ring-red-600"
              src={holoDatas.channel.photo}
              alt="Image Description"
            /> */}
          </a>
        )
      })}

      {/* {selectedGroup === null && holoData.map((holoDatas: Api) => {
        return isCorrectLiveHoloUrl(holoDatas) ? (
          <a
            key={holoDatas.id}
            className="flex items-center gap-x-3.5 max-md:mt-[-32px] py-2 mx-[-7px] rounded-md text-sm text-gray-800 dark:text-gray-400"
            target="_blank"
            href={`${holoVideo}${holoDatas.id}`}
          >
            <img
              className="inline-block md:h-[2.875rem] h-[3.475rem] md:w-[2.875rem] w-[3.475rem] rounded-full ring-1 ring-red-600"
              src={holoDatas.channel.photo}
              alt="Image Description"
            />
          </a>
        ) : null
      })}

      {selectedGroup === "All Group" && holoData.map((holoDatas: Api) => {
        return isCorrectLiveHoloUrl(holoDatas) ? (
          <a
            key={holoDatas.id}
            className="flex items-center gap-x-3.5 max-md:mt-[-32px] py-2 mx-[-7px] rounded-md text-sm text-gray-800 dark:text-gray-400"
            target="_blank"
            href={`${holoVideo}${holoDatas.id}`}
          >
            <img
              className="inline-block md:h-[2.875rem] h-[3.475rem] md:w-[2.875rem] w-[3.475rem] rounded-full ring-1 ring-red-600"
              src={holoDatas.channel.photo}
              alt="Image Description"
            />
          </a>
        ) : null
      })}
      
      {selectedGroup=== "Hololive" && getFilteredData("Hololive").map((holoDatas: Api) => (
        <a
          key={holoDatas.id}
          className="flex items-center gap-x-3.5 max-md:mt-[-32px] py-2 mx-[-7px] rounded-md text-sm text-gray-800 dark:text-gray-400"
          target="_blank"
          href={`${holoVideo}${holoDatas.id}`}
        >
          <img
            className="inline-block md:h-[2.875rem] h-[3.475rem] md:w-[2.875rem] w-[3.475rem] rounded-full ring-1 ring-red-600"
            src={holoDatas.channel.photo}
            alt="Image Description"
          />
        </a>
      ))} 
     
      {selectedGroup==="Nijisanji" && getFilteredData("Nijisanji").map((holoDatas: Api) => (
        <a
          key={holoDatas.id}
          className="flex items-center gap-x-3.5 max-md:mt-[-32px] py-2 mx-[-7px] rounded-md text-sm text-gray-800 dark:text-gray-400"
          target="_blank"
          href={`${holoVideo}${holoDatas.id}`}
        >
          <img
            className="inline-block md:h-[2.875rem] h-[3.475rem] md:w-[2.875rem] w-[3.475rem] rounded-full ring-1 ring-red-600"
            src={holoDatas.channel.photo}
            alt="Image Description"
          />
        </a>
      ))} 

       {selectedGroup==="Aogiri Highschool" && getFilteredData("Aogiri Highschool").map((holoDatas: Api) => (
        <a
          key={holoDatas.id}
          className="flex items-center gap-x-3.5 max-md:mt-[-32px] py-2 mx-[-7px] rounded-md text-sm text-gray-800 dark:text-gray-400"
          target="_blank"
          href={`${holoVideo}${holoDatas.id}`}
        >
          <img
            className="inline-block md:h-[2.875rem] h-[3.475rem] md:w-[2.875rem] w-[3.475rem] rounded-full ring-1 ring-red-600"
            src={holoDatas.channel.photo}
            alt="Image Description"
          />
        </a>
      ))}


       {selectedGroup==="VSpo" && getFilteredData("VSpo").map((holoDatas: Api) => (
        <a
          key={holoDatas.id}
          className="flex items-center gap-x-3.5 max-md:mt-[-32px] py-2 mx-[-7px] rounded-md text-sm text-gray-800 dark:text-gray-400"
          target="_blank"
          href={`${holoVideo}${holoDatas.id}`}
        >
          <img
            className="inline-block md:h-[2.875rem] h-[3.475rem] md:w-[2.875rem] w-[3.475rem] rounded-full ring-1 ring-red-600"
            src={holoDatas.channel.photo}
            alt="Image Description"
          />
        </a>
      ))}  */}

    </div>
  )
}

export default GroupIcon